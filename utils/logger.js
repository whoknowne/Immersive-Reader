// 日志工具函数
export const logger = {
    // 开发环境标志
    isDev: process.env.NODE_ENV === 'development',
    
    // 信息日志
    info(...args) {
        if (this.isDev) {
            console.log('[Reader Mode]', ...args);
        }
    },
    
    // 警告日志
    warn(...args) {
        if (this.isDev) {
            console.warn('[Reader Mode]', ...args);
        }
    },
    
    // 错误日志
    error(...args) {
        if (this.isDev) {
            console.error('[Reader Mode]', ...args);
        }
    }
}; 