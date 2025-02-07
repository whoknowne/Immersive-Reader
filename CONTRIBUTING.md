# 贡献指南

感谢你考虑为 Immersive Reader 做出贡献！

## 提交 Issue

- 使用清晰和描述性的标题
- 详细描述问题或建议
- 如果是 bug，请提供：
  - 复现步骤
  - 预期行为
  - 实际行为
  - 浏览器版本和操作系统信息

## 提交 Pull Request

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的修改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建一个 Pull Request

### 代码风格

- 使用 4 空格缩进
- 使用有意义的变量和函数名
- 添加必要的注释
- 保持代码简洁和可读性

## 开发设置

1. 克隆仓库
```bash
git clone https://github.com/yourusername/reader-mode-extension.git
cd reader-mode-extension
```

2. 在 Chrome 中加载扩展
- 打开 `chrome://extensions/`
- 启用"开发者模式"
- 点击"加载已解压的扩展程序"
- 选择项目目录

## 测试

在提交 PR 之前，请确保：
- 代码在最新版本的 Chrome 中正常工作
- 所有功能都经过测试
- 没有引入新的 bug 