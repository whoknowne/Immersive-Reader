# Immersive Reader

[中文](README_CN.md) | English

A clean and elegant Chrome extension for reading mode that provides a comfortable web reading experience.

## Features

- 🎨 8 Carefully Designed Theme Colors
  - Parchment White (#FAF4E8)
  - Morning Mist (#F0F0F0)
  - Mint Green (#E0F0E8)
  - Dawn Blue (#E8F2F8)
  - Almond White (#FFF8EB)
  - Aurora Purple (#F5F0FA)
  - Sandstone (#F4ECDC)
  - Glacier Blue (#EBF5F5)

- 📖 Immersive Reading Experience
  - Automatic article content extraction
  - Remove ads and distracting elements
  - Optimize typography and spacing

- 🔤 Flexible Font Control
  - Support 12px-24px font size adjustment
  - Remember user preferences

## Installation

1. Download the project code
2. Open Chrome browser and navigate to extensions page (chrome://extensions/)
3. Enable "Developer mode"
4. Click "Load unpacked" and select the project folder

## Usage

1. Click the extension icon in the toolbar to open the control panel
2. Click "Toggle Reader Mode" to enter reading mode
3. Choose your preferred theme color
4. Adjust the font size to your comfort

## Tech Stack

- HTML/CSS/JavaScript
- Chrome Extension API
- Content extraction algorithm

## Development

Project structure:
```
chrome-extension/
│
├── manifest.json         # Extension configuration
│
├── icons/               # Extension icons
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
│
├── background/          # Background scripts
│   └── background.js
│
├── content_scripts/     # Content scripts
│   ├── articleExtractor.js
│   ├── styleInjector.js
│   └── content.js
│
├── popup/              # Popup interface
│   ├── popup.html
│   ├── popup.js
│   └── popup.css
```

## Contributing

Issues and Pull Requests are welcome to help improve the project.

## License

[MIT License](LICENSE)

