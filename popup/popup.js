document.addEventListener('DOMContentLoaded', () => {
    initializePopup();
});

// 初始化弹出窗口
function initializePopup() {
    // 获取DOM元素
    const toggleButton = document.getElementById('toggleReader');
    const fontSizeInput = document.getElementById('fontSize');
    const fontSizeValue = document.getElementById('fontSizeValue');
    const decreaseFont = document.getElementById('decreaseFont');
    const increaseFont = document.getElementById('increaseFont');
    const themeButtons = document.querySelectorAll('.theme-btn');

    // 加载保存的设置
    loadSettings();

    // 绑定事件监听
    toggleButton.addEventListener('click', toggleReaderMode);
    
    // 字体大小控制
    const previewBtns = document.querySelectorAll('.preview-btn');
    const previewText = document.querySelector('.preview-text');
    let currentSize = 16;

    // 更新预览文本
    function updatePreviewText() {
        previewText.textContent = `${currentSize}px - ${currentSize}x preview text`;
    }

    // 绑定按钮事件
    previewBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            switch (index) {
                case 0: // 用户配置
                    // TODO: 实现用户配置功能
                    break;
                case 1: // 减小字体
                    currentSize = Math.max(12, currentSize - 1);
                    updatePreviewText();
                    updateSettings({ fontSize: currentSize });
                    break;
                case 2: // 增大字体
                    currentSize = Math.min(24, currentSize + 1);
                    updatePreviewText();
                    updateSettings({ fontSize: currentSize });
                    break;
                case 3: // 重置
                    currentSize = 16;
                    updatePreviewText();
                    updateSettings({ fontSize: currentSize });
                    break;
            }
        });
    });

    // 初始化预览文本
    updatePreviewText();

    // 主题切换
    themeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            themeButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            updateSettings({
                theme: btn.dataset.theme
            });
        });
    });
}

// 加载设置
async function loadSettings() {
    try {
        const settings = await chrome.storage.sync.get({
            theme: 'green',
            fontSize: '16'
        });
        
        // 更新主题按钮状态
        const activeThemeBtn = document.querySelector(`.theme-btn[data-theme="${settings.theme}"]`);
        if (activeThemeBtn) {
            document.querySelectorAll('.theme-btn').forEach(btn => btn.classList.remove('active'));
            activeThemeBtn.classList.add('active');
        }
        
        // 更新预览文本
        const previewText = document.querySelector('.preview-text');
        if (previewText) {
            const size = parseInt(settings.fontSize);
            previewText.textContent = `${size}px - ${size}x preview text`;
        }
        
        console.log('设置已加载:', settings);
    } catch (error) {
        console.error('加载设置失败:', error);
    }
}

// 更新字体大小
function updateFontSize(size) {
    const fontSizeInput = document.getElementById('fontSize');
    const fontSizeValue = document.getElementById('fontSizeValue');
    
    if (fontSizeInput && fontSizeValue) {
        fontSizeInput.value = size;
        fontSizeValue.textContent = `${size}px`;
        
        updateSettings({
            fontSize: size
        });
    }
}

// 更新设置
async function updateSettings(newSettings) {
    try {
        // 获取当前设置
        const currentSettings = await chrome.storage.sync.get({
            theme: 'green',
            fontSize: '16'
        });
        
        // 合并设置
        const settings = { ...currentSettings, ...newSettings };
        
        // 保存设置
        await chrome.storage.sync.set(settings);
        console.log('设置已保存:', settings);

        // 通知当前标签页更新样式
        const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
        if (tab?.id) {
            try {
                await chrome.tabs.sendMessage(tab.id, {
                    action: "updateStyles",
                    settings: settings
                });
                console.log('样式更新消息已发送');
            } catch (error) {
                if (error.message.includes('Receiving end does not exist')) {
                    console.log('注入内容脚本...');
                    await injectContentScript(tab);
                    // 重试发送消息
                    await chrome.tabs.sendMessage(tab.id, {
                        action: "updateStyles",
                        settings: settings
                    });
                }
            }
        }
    } catch (error) {
        console.error('更新设置失败:', error);
        showError('更新设置失败，请刷新页面后重试');
    }
}

// 切换阅读模式
async function toggleReaderMode() {
    try {
        const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
        if (tab?.id) {
            try {
                await chrome.tabs.sendMessage(tab.id, {
                    action: "toggleReaderMode"
                });
            } catch (error) {
                // 如果内容脚本未加载，注入脚本
                if (error.message.includes('Receiving end does not exist')) {
                    await injectContentScript(tab);
                    // 重试发送消息
                    await chrome.tabs.sendMessage(tab.id, {
                        action: "toggleReaderMode"
                    });
                } else {
                    throw error;
                }
            }
        }
    } catch (error) {
        console.error('切换阅读模式失败:', error);
        showError('无法切换到阅读模式，请刷新页面后重试');
    }
}

// 注入内容脚本
async function injectContentScript(tab) {
    try {
        await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: [
                'content_scripts/articleExtractor.js',
                'content_scripts/styleInjector.js',
                'content_scripts/content.js'
            ]
        });
    } catch (error) {
        console.error('注入内容脚本失败:', error);
        throw error;
    }
}

// 显示错误信息
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    document.body.appendChild(errorDiv);

    setTimeout(() => {
        errorDiv.remove();
    }, 3000);
} 