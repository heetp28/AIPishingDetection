chrome.storage.local.get(["logs"], (data) => {
    const container = document.getElementById("logs");
    const logs = data.logs || [];

    logs.forEach(log => {
        const div = document.createElement("div");
        div.innerHTML = `
            <strong>URL:</strong> ${log.url}<br>
            Risk Score: ${log.risk}<br>
            Time: ${log.time}<hr>
        `;
        container.appendChild(div);
    });
});