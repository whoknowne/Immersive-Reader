// 内容解析工具函数
export const parserUtils = {
    // 清理HTML内容
    cleanupHtml(html) {
        // 移除脚本标签
        html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
        
        // 移除样式标签
        html = html.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
        
        // 移除注释
        html = html.replace(/<!--[\s\S]*?-->/g, '');
        
        return html;
    },
    
    // 提取文本内容
    extractText(element) {
        return element.textContent.trim();
    },
    
    // 判断是否为有效内容
    isValidContent(text) {
        // 移除空白字符
        text = text.trim();
        
        // 检查长度
        if (text.length < 10) return false;
        
        // 检查是否包含足够的文字内容
        const words = text.split(/\s+/).length;
        return words >= 5;
    }
}; 