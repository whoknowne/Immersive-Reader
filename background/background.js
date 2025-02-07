// 监听扩展图标点击事件
chrome.action.onClicked.addListener(async (tab) => {
    console.log('扩展图标被点击'); // 添加日志
    try {
        await toggleReaderMode(tab);
    } catch (error) {
        console.error('切换阅读模式失败:', error);
    }
});

// 监听快捷键
chrome.commands.onCommand.addListener(async (command) => {
    try {
        if (command === "toggle-reader-mode") {
            const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
            if (tab) {
                await toggleReaderMode(tab);
            }
        }
    } catch (error) {
        console.error('快捷键命令执行失败:', error);
    }
});

// 切换阅读模式
async function toggleReaderMode(tab) {
    if (!tab || !tab.id) {
        throw new Error('无效的标签页');
    }

    try {
        await chrome.tabs.sendMessage(tab.id, {
            action: "toggleReaderMode"
        });
    } catch (error) {
        console.error('发送消息到内容脚本失败:', error);
        // 如果内容脚本未加载，尝试注入脚本
        await injectContentScript(tab);
    }
}

// 注入内容脚本
async function injectContentScript(tab) {
    try {
        await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: [
                'content_scripts/content.js',
                'content_scripts/articleExtractor.js',
                'content_scripts/styleInjector.js'
            ]
        });
    } catch (error) {
        console.error('注入内容脚本失败:', error);
        throw error;
    }
} 