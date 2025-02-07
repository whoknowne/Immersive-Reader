// 提取文章内容
async function extractArticle() {
    try {
        console.log('开始提取文章内容');
        
        // 提取标题
        const title = extractTitle();
        
        // 获取主要内容
        const mainContent = findMainContent();
        
        if (!mainContent) {
            throw new Error('未找到主要内容');
        }
        
        // 创建文章容器
        const article = document.createElement('article');
        
        // 添加标题
        if (title) {
            const titleElement = document.createElement('h1');
            titleElement.className = 'reader-mode-title';
            titleElement.textContent = title;
            article.appendChild(titleElement);
        }
        
        // 清理并添加主要内容
        const cleanedContent = cleanupContent(mainContent.cloneNode(true));
        article.appendChild(cleanedContent);
        
        console.log('文章内容提取成功');
        return article;
    } catch (error) {
        console.error('提取文章内容失败:', error);
        return document.createElement('div');
    }
}

// 提取标题
function extractTitle() {
    // 按优先级尝试不同的标题选择器
    const titleSelectors = [
        'h1.article-title',
        'h1.post-title',
        'h1.entry-title',
        'article h1',
        'h1',
        'meta[property="og:title"]',
        'title'
    ];
    
    for (const selector of titleSelectors) {
        const element = document.querySelector(selector);
        if (element) {
            if (selector === 'meta[property="og:title"]') {
                return element.getAttribute('content');
            } else if (selector === 'title') {
                // 移除网站名称等额外内容
                let title = element.textContent;
                const separators = [' - ', ' | ', ' :: ', ' » ', ' – '];
                for (const separator of separators) {
                    if (title.includes(separator)) {
                        title = title.split(separator)[0];
                    }
                }
                return title.trim();
            } else {
                return element.textContent.trim();
            }
        }
    }
    
    return null;
}

// 查找主要内容
function findMainContent() {
    // 常见的文章容器选择器
    const possibleSelectors = [
        'article',
        'main',
        '[role="main"]',
        '.post-content',
        '.article-content',
        '.entry-content',
        '.content',
        '#content',
        '.main-content'
    ];
    
    // 尝试通过选择器查找
    for (const selector of possibleSelectors) {
        const element = document.querySelector(selector);
        if (element && isValidContent(element)) {
            return element;
        }
    }
    
    // 如果没有找到，使用启发式算法
    return findContentHeuristically();
}

// 启发式查找内容
function findContentHeuristically() {
    const paragraphs = document.getElementsByTagName('p');
    const articles = document.getElementsByTagName('article');
    
    // 如果找到文章标签，优先使用
    if (articles.length === 1) {
        return articles[0];
    }
    
    // 查找段落最多的容器
    let bestContainer = null;
    let maxParagraphs = 0;
    
    // 遍历所有段落
    for (const p of paragraphs) {
        const parent = p.parentElement;
        if (!parent) continue;
        
        // 计算当前容器中的段落数
        const containerParagraphs = parent.getElementsByTagName('p').length;
        
        // 更新最佳容器
        if (containerParagraphs > maxParagraphs) {
            maxParagraphs = containerParagraphs;
            bestContainer = parent;
        }
    }
    
    return bestContainer;
}

// 清理内容
function cleanupContent(element) {
    if (!element) return null;
    
    // 需要移除的元素选择器
    const removeSelectors = [
        'script',
        'style',
        'iframe:not([src*="youtube"]):not([src*="vimeo"]):not([src*="bilibili"])', // 保留视频iframe
        'form',
        'nav',
        'header',
        'footer',
        '.ad',
        '.ads',
        '.advertisement',
        '.social-share',
        '.comments',
        '.related-posts'
    ];
    
    // 移除不需要的元素
    removeSelectors.forEach(selector => {
        const elements = element.querySelectorAll(selector);
        elements.forEach(el => el.remove());
    });
    
    // 处理视频元素
    processVideoElements(element);
    
    // 清理空白节点
    cleanEmptyNodes(element);
    
    return element;
}

// 处理视频元素
function processVideoElements(element) {
    // 处理 video 标签
    const videos = element.getElementsByTagName('video');
    Array.from(videos).forEach(video => {
        // 保持视频控件可见
        video.controls = true;
        // 设置合适的大小
        video.style.maxWidth = '100%';
        video.style.height = 'auto';
        // 确保视频容器样式正确
        const container = document.createElement('div');
        container.className = 'reader-mode-video-container';
        video.parentNode.insertBefore(container, video);
        container.appendChild(video);
    });
    
    // 处理 iframe 视频
    const videoIframes = element.querySelectorAll('iframe[src*="youtube"], iframe[src*="vimeo"], iframe[src*="bilibili"]');
    videoIframes.forEach(iframe => {
        // 确保 HTTPS
        if (iframe.src.startsWith('http:')) {
            iframe.src = iframe.src.replace('http:', 'https:');
        }
        // 添加必要的参数
        if (iframe.src.includes('youtube.com')) {
            if (!iframe.src.includes('enablejsapi=1')) {
                iframe.src += (iframe.src.includes('?') ? '&' : '?') + 'enablejsapi=1';
            }
        }
        // 设置容器
        const container = document.createElement('div');
        container.className = 'reader-mode-video-container';
        iframe.parentNode.insertBefore(container, iframe);
        container.appendChild(iframe);
    });
}

// 清理空白节点
function cleanEmptyNodes(element) {
    const walker = document.createTreeWalker(
        element,
        NodeFilter.SHOW_ELEMENT,
        null,
        false
    );
    
    const nodesToRemove = [];
    let node;
    
    while (node = walker.nextNode()) {
        if (isEmptyNode(node)) {
            nodesToRemove.push(node);
        }
    }
    
    nodesToRemove.forEach(node => node.remove());
}

// 判断节点是否为空 (修改以保留视频)
function isEmptyNode(node) {
    const isVideo = node.tagName && (
        node.tagName.toLowerCase() === 'video' ||
        (node.tagName.toLowerCase() === 'iframe' && (
            node.src.includes('youtube.com') ||
            node.src.includes('vimeo.com') ||
            node.src.includes('bilibili.com')
        ))
    );
    
    return (
        !isVideo &&
        node.children.length === 0 &&
        node.textContent.trim().length === 0 &&
        !['img', 'br', 'hr'].includes(node.tagName.toLowerCase())
    );
}

// 判断内容是否有效
function isValidContent(element) {
    const text = element.textContent.trim();
    const paragraphs = element.getElementsByTagName('p').length;
    
    return (
        text.length > 100 && // 文本长度超过100个字符
        paragraphs >= 2 &&   // 至少包含2个段落
        !isAdvertisement(element) // 不是广告内容
    );
}

// 判断是否为广告内容
function isAdvertisement(element) {
    const adKeywords = ['广告', 'advertisement', 'sponsor', 'promoted'];
    const text = element.textContent.toLowerCase();
    
    return adKeywords.some(keyword => text.includes(keyword));
} 