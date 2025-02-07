// 默认设置
const DEFAULT_SETTINGS = {
    theme: 'light',
    fontSize: '16px',
    fontFamily: 'system',
    lineHeight: '1.6',
    maxWidth: '800px'
};

// 初始化页面
document.addEventListener('DOMContentLoaded', () => {
    // 加载保存的设置
    loadSettings();
    
    // 绑定事件
    bindEvents();
});

// 加载设置
async function loadSettings() {
    const settings = await chrome.storage.sync.get(DEFAULT_SETTINGS);
    
    // 更新UI
    document.getElementById('theme').value = settings.theme;
    document.getElementById('fontSize').value = parseInt(settings.fontSize);
    document.getElementById('fontFamily').value = settings.fontFamily;
    document.getElementById('lineHeight').value = parseFloat(settings.lineHeight);
    document.getElementById('maxWidth').value = parseInt(settings.maxWidth);
    
    // 更新显示值
    updateDisplayValues(settings);
}

// 更新显示值
function updateDisplayValues(settings) {
    document.getElementById('fontSizeValue').textContent = settings.fontSize;
    document.getElementById('lineHeightValue').textContent = settings.lineHeight;
    document.getElementById('maxWidthValue').textContent = settings.maxWidth;
}

// 绑定事件
function bindEvents() {
    // 保存按钮
    document.getElementById('save').addEventListener('click', saveSettings);
    
    // 重置按钮
    document.getElementById('reset').addEventListener('click', resetSettings);
    
    // 实时更新显示值
    document.getElementById('fontSize').addEventListener('input', updateRangeValue);
    document.getElementById('lineHeight').addEventListener('input', updateRangeValue);
    document.getElementById('maxWidth').addEventListener('input', updateRangeValue);
}

// 保存设置
async function saveSettings() {
    const settings = {
        theme: document.getElementById('theme').value,
        fontSize: document.getElementById('fontSize').value + 'px',
        fontFamily: document.getElementById('fontFamily').value,
        lineHeight: document.getElementById('lineHeight').value,
        maxWidth: document.getElementById('maxWidth').value + 'px'
    };
    
    await chrome.storage.sync.set(settings);
    showMessage('设置已保存');
}

// 重置设置
async function resetSettings() {
    await chrome.storage.sync.set(DEFAULT_SETTINGS);
    loadSettings();
    showMessage('设置已重置');
}

// 更新范围值显示
function updateRangeValue(event) {
    const value = event.target.value;
    const unit = event.target.id === 'lineHeight' ? '' : 'px';
    document.getElementById(`${event.target.id}Value`).textContent = value + unit;
}

// 显示消息
function showMessage(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 2000);
} 