# Immersive Reader

[English](README.md) | 中文

一个简洁优雅的 Chrome 阅读模式扩展，提供舒适的网页阅读体验。

## 功能特点

- 🎨 8种精心设计的主题配色
  - 羊皮纸白 (#FAF4E8)
  - 晨雾灰 (#F0F0F0)
  - 薄荷淡青 (#E0F0E8)
  - 黎明浅蓝 (#E8F2F8)
  - 杏仁乳白 (#FFF8EB)
  - 极光淡紫 (#F5F0FA)
  - 砂岩浅褐 (#F4ECDC)
  - 冰川淡青 (#EBF5F5)

- 📖 沉浸式阅读体验
  - 自动提取文章主要内容
  - 移除广告和干扰元素
  - 优化排版和间距

- 🔤 灵活的字体控制
  - 支持12px-24px字体大小调节
  - 记住用户偏好设置

## 安装方法

1. 下载本项目代码
2. 打开Chrome浏览器，进入扩展程序页面 (chrome://extensions/)
3. 开启"开发者模式"
4. 点击"加载已解压的扩展程序"，选择项目文件夹

## 使用方法

1. 点击工具栏中的扩展图标打开控制面板
2. 点击"切换阅读模式"进入阅读模式
3. 选择喜欢的主题颜色
4. 调整合适的字体大小

## 技术栈

- HTML/CSS/JavaScript
- Chrome扩展API
- 内容提取算法

## 开发说明

项目结构：
```
chrome-extension/
│
├── manifest.json         # 扩展配置文件
│
├── icons/               # 扩展图标
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
│
├── background/          # 后台脚本
│   └── background.js
│
├── content_scripts/     # 内容脚本
│   ├── articleExtractor.js
│   ├── styleInjector.js
│   └── content.js
│
├── popup/              # 弹出界面
│   ├── popup.html
│   ├── popup.js
│   └── popup.css
```

## 贡献指南

欢迎提交 Issue 和 Pull Request 来帮助改进项目。

## 许可证

[MIT许可证](LICENSE) 