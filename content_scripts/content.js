let isReaderMode = false;
let originalContent = null;

// 监听来自background的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('收到消息:', request);
    
    switch (request.action) {
        case "toggleReaderMode":
            toggleReaderMode();
            break;
        case "updateStyles":
            if (request.settings) {
                console.log('更新样式，设置:', request.settings);
                if (isReaderMode) {  // 只在阅读模式下更新样式
                    updateStyles(request.settings);
                }
            }
            break;
    }
});

// 切换阅读模式
async function toggleReaderMode() {
    console.log('切换阅读模式, 当前状态:', isReaderMode); // 添加日志
    if (!isReaderMode) {
        try {
            // 保存原始内容
            originalContent = document.body.cloneNode(true);
            
            // 提取文章内容
            const article = await extractArticle();
            if (!article) {
                throw new Error('无法提取文章内容');
            }
            
            // 注入阅读模式样式
            await injectReaderStyles();
            
            // 替换页面内容
            replaceContent(article);
            
            isReaderMode = true;
        } catch (error) {
            console.error('切换阅读模式失败:', error);
            // 显示错误提示
            showError('无法切换到阅读模式，请稍后重试');
        }
    } else {
        // 恢复原始内容
        restoreOriginalContent();
        isReaderMode = false;
    }
}

// 替换页面内容
function replaceContent(article) {
    console.log('替换页面内容'); // 添加日志
    const container = document.createElement('div');
    container.className = 'reader-mode-container';
    container.appendChild(article);
    
    // 保存原始内容
    document.body.style.display = 'none';
    document.body.parentNode.insertBefore(container, document.body);
}

// 恢复原始内容
function restoreOriginalContent() {
    console.log('恢复原始内容'); // 添加日志
    const container = document.querySelector('.reader-mode-container');
    if (container) {
        container.remove();
    }
    document.body.style.display = '';
}

// 添加错误提示函数
function showError(message) {
    const toast = document.createElement('div');
    toast.className = 'reader-mode-error';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
} 