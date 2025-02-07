// 注入阅读模式样式
function injectReaderStyles() {
    console.log('注入阅读模式样式');
    loadSettings().then(settings => {
        applyStyles(settings);
    });
}

// 加载设置
async function loadSettings() {
    try {
        const settings = await chrome.storage.sync.get({
            theme: 'light',
            fontSize: '16px',
            lineHeight: '1.6'
        });
        console.log('加载设置:', settings);
        return settings;
    } catch (error) {
        console.error('加载设置失败:', error);
        return getDefaultSettings();
    }
}

// 应用样式
function applyStyles(settings) {
    console.log('应用样式:', settings);
    let style = document.getElementById('reader-mode-styles');
    
    if (!style) {
        style = document.createElement('style');
        style.id = 'reader-mode-styles';
        document.head.appendChild(style);
    }
    
    // 确保移除旧样式
    style.textContent = '';
    // 添加新样式
    style.textContent = generateStyles(settings);
    
    // 强制重新计算样式
    document.body.style.zoom = '99.99999%';
    setTimeout(() => {
        document.body.style.zoom = '100%';
    }, 10);
}

// 更新样式
function updateStyles(settings) {
    console.log('更新样式:', settings);
    applyStyles(settings);
}

// 获取默认设置
function getDefaultSettings() {
    return {
        theme: 'light',
        fontSize: '16px',
        lineHeight: '1.6'
    };
}

// 生成样式
function generateStyles(settings) {
    // 获取主题颜色
    const themeColors = {
        parchment: { primary: '#8B7355', bg: '#FAF4E8', text: '#333333' },  // 羊皮纸白
        mist: { primary: '#808080', bg: '#F0F0F0', text: '#333333' },       // 晨雾灰
        mint: { primary: '#98C8B0', bg: '#E0F0E8', text: '#333333' },       // 薄荷淡青
        dawn: { primary: '#89CFF0', bg: '#E8F2F8', text: '#333333' },       // 黎明浅蓝
        almond: { primary: '#D2B48C', bg: '#FFF8EB', text: '#333333' },     // 杏仁乳白
        aurora: { primary: '#B19CD9', bg: '#F5F0FA', text: '#333333' },     // 极光淡紫
        sandstone: { primary: '#C4A484', bg: '#F4ECDC', text: '#333333' },  // 砂岩浅褐
        glacier: { primary: '#A0D8EF', bg: '#EBF5F5', text: '#333333' }     // 冰川淡青
    };

    const theme = themeColors[settings.theme] || themeColors.green;
    const fontSize = parseInt(settings.fontSize);
    console.log('生成样式，设置:', settings, '主题:', theme);
    
    return `
        .reader-mode-container {
            font-size: ${fontSize}px !important;
            line-height: 1.6 !important;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background: ${theme.bg};
            color: ${theme.text};
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        
        .reader-mode-container * {
            font-size: inherit !important;
            line-height: inherit !important;
        }
        
        .reader-mode-container h1,
        .reader-mode-container h2,
        .reader-mode-container h3 {
            color: ${theme.text};
            margin-bottom: 1em;
            line-height: 1.4;
        }
        
        .reader-mode-container h1 {
            font-size: calc(${fontSize}px * 2) !important;
        }
        
        .reader-mode-container h2 {
            font-size: calc(${fontSize}px * 1.5) !important;
        }
        
        .reader-mode-container h3 {
            font-size: calc(${fontSize}px * 1.2) !important;
        }
        
        .reader-mode-container p {
            margin: 1em 0;
            line-height: 1.6;
        }
        
        .reader-mode-container a {
            color: ${theme.primary};
            text-decoration: none;
        }
        
        .reader-mode-container a:hover {
            text-decoration: underline;
        }
        
        .reader-mode-container blockquote {
            border-left: 4px solid ${theme.primary};
            background: ${theme.bg === '#1a1a1a' ? '#2a2a2a' : '#f9f9f9'};
            color: ${theme.text};
            padding: 1em;
            margin: 1em 0;
        }
        
        .reader-mode-container code {
            background: ${theme.bg === '#1a1a1a' ? '#2a2a2a' : '#f5f5f5'};
            color: ${theme.text};
            padding: 0.2em 0.4em;
            border-radius: 3px;
            font-family: Consolas, Monaco, 'Courier New', monospace;
        }
        
        .reader-mode-container pre {
            background: ${theme.bg === '#1a1a1a' ? '#2a2a2a' : '#f5f5f5'};
            padding: 1em;
            border-radius: 4px;
            overflow-x: auto;
        }
        
        .reader-mode-container img {
            max-width: 100%;
            height: auto;
            margin: 1em 0;
            border-radius: 4px;
        }
        
        .reader-mode-container ul,
        .reader-mode-container ol {
            margin: 1em 0;
            padding-left: 2em;
            color: ${theme.text};
        }
        
        .reader-mode-container li {
            margin: 0.5em 0;
        }
        
        .reader-mode-container .reader-mode-title {
            font-size: calc(${fontSize}px * 2.2) !important;
            font-weight: bold;
            color: ${theme.text};
            margin: 0 0 1em 0;
            padding: 0;
            line-height: 1.3;
            text-align: left;
            border: none;
        }
        
        .reader-mode-video-container {
            position: relative;
            width: 100%;
            margin: 1.5em 0;
            padding-top: 56.25%;
            background: ${theme.bg === '#1a1a1a' ? '#000000' : '#f5f5f5'};
            border-radius: 4px;
            overflow: hidden;
        }
        
        .reader-mode-video-container video,
        .reader-mode-video-container iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border: none;
        }
        
        .reader-mode-video-container video {
            object-fit: contain;
            background: ${theme.bg === '#1a1a1a' ? '#000000' : '#f5f5f5'};
        }
        
        .reader-mode-video-container video::-webkit-media-controls {
            background-color: ${theme.bg === '#1a1a1a' ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.7)'};
        }
        
        .reader-mode-video-container video::-webkit-media-controls-panel {
            color: ${theme.text};
        }
        
        @media (max-width: 768px) {
            .reader-mode-container {
                padding: 15px;
            }
            
            .reader-mode-video-container {
                margin: 1em 0;
            }
        }
    `;
} 