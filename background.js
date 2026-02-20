chrome.runtime.onMessage.addListener((message, sender) => {
    if (message.type === "analyze") {
        const f = message.features;

        let score = 0;

        if (f.urlLength > 75) score += 0.1;
        if (f.hasIP) score += 0.2;
        if (f.hasAtSymbol) score += 0.1;
        if (f.suspiciousKeywords) score += 0.2;
        if (f.isHTTP) score += 0.1;
        if (f.passwordField) score += 0.3;

        if (score > 0.6) {
            chrome.storage.local.get(["logs"], (data) => {
                let logs = data.logs || [];
                logs.push({
                    url: sender.url,
                    risk: score,
                    time: new Date().toLocaleString()
                });
                chrome.storage.local.set({ logs: logs });
            });

            chrome.scripting.executeScript({
                target: { tabId: sender.tab.id },
                func: showWarning
            });
        }
    }
});

function showWarning() {
    const warning = document.createElement("div");
    warning.innerText = "⚠️ Phishing Risk Detected! Avoid entering credentials.";
    warning.style.position = "fixed";
    warning.style.top = "0";
    warning.style.left = "0";
    warning.style.width = "100%";
    warning.style.background = "red";
    warning.style.color = "white";
    warning.style.padding = "15px";
    warning.style.zIndex = "9999";
    warning.style.textAlign = "center";
    warning.style.fontSize = "18px";
    document.body.prepend(warning);
}