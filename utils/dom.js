// DOM操作相关工具函数
export const domUtils = {
    // 创建元素
    createElement(tag, attributes = {}, children = []) {
        const element = document.createElement(tag);
        
        // 设置属性
        Object.entries(attributes).forEach(([key, value]) => {
            element.setAttribute(key, value);
        });
        
        // 添加子元素
        children.forEach(child => {
            if (typeof child === 'string') {
                element.appendChild(document.createTextNode(child));
            } else {
                element.appendChild(child);
            }
        });
        
        return element;
    },
    
    // 移除元素
    removeElement(element) {
        if (element && element.parentNode) {
            element.parentNode.removeChild(element);
        }
    },
    
    // 添加样式类
    addClass(element, className) {
        element.classList.add(className);
    },
    
    // 移除样式类
    removeClass(element, className) {
        element.classList.remove(className);
    }
}; 