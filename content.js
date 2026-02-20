function extractFeatures() {
    const url = window.location.href;
    const domain = window.location.hostname;

    let features = {
        urlLength: url.length,
        hasIP: /\d+\.\d+\.\d+\.\d+/.test(domain),
        hasAtSymbol: url.includes("@"),
        suspiciousKeywords: /(login|verify|scholarship|free|update)/i.test(url),
        isHTTP: window.location.protocol === "http:",
        passwordField: document.querySelector("input[type='password']") !== null
    };

    chrome.runtime.sendMessage({ type: "analyze", features: features });
}

extractFeatures();