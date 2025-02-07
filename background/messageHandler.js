// 处理来自content script的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch (request.action) {
        case "getSettings":
            getSettings().then(sendResponse);
            return true;
        case "saveSettings":
            saveSettings(request.settings).then(sendResponse);
            return true;
    }
});

// 获取设置
async function getSettings() {
    return new Promise((resolve) => {
        chrome.storage.sync.get({
            theme: 'light',
            fontSize: '16px',
            lineHeight: '1.6'
        }, resolve);
    });
}

// 保存设置
async function saveSettings(settings) {
    return new Promise((resolve) => {
        chrome.storage.sync.set(settings, resolve);
    });
} 