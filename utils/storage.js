// 存储相关工具函数
export const storageUtils = {
    // 保存数据
    async saveData(key, value) {
        return new Promise((resolve) => {
            chrome.storage.sync.set({[key]: value}, resolve);
        });
    },
    
    // 获取数据
    async getData(key, defaultValue = null) {
        return new Promise((resolve) => {
            chrome.storage.sync.get({[key]: defaultValue}, (result) => {
                resolve(result[key]);
            });
        });
    },
    
    // 删除数据
    async removeData(key) {
        return new Promise((resolve) => {
            chrome.storage.sync.remove(key, resolve);
        });
    }
}; 