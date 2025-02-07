const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// 构建配置
const config = {
    srcDir: 'src',
    buildDir: 'build',
    manifestPath: 'manifest.json'
};

// 清理构建目录
function cleanBuildDir() {
    if (fs.existsSync(config.buildDir)) {
        fs.rmSync(config.buildDir, { recursive: true });
    }
    fs.mkdirSync(config.buildDir);
}

// 复制文件
function copyFiles() {
    // 复制manifest文件
    fs.copyFileSync(
        config.manifestPath,
        path.join(config.buildDir, 'manifest.json')
    );

    // 复制其他资源
    copyDirectory('icons');
    copyDirectory('popup');
    copyDirectory('options');
    copyDirectory('styles');
}

// 复制目录
function copyDirectory(dir) {
    const srcPath = path.join(config.srcDir, dir);
    const destPath = path.join(config.buildDir, dir);

    if (!fs.existsSync(destPath)) {
        fs.mkdirSync(destPath, { recursive: true });
    }

    const files = fs.readdirSync(srcPath);
    files.forEach(file => {
        const srcFile = path.join(srcPath, file);
        const destFile = path.join(destPath, file);

        if (fs.statSync(srcFile).isDirectory()) {
            copyDirectory(path.join(dir, file));
        } else {
            fs.copyFileSync(srcFile, destFile);
        }
    });
}

// 打包扩展
function packageExtension() {
    exec('cd build && zip -r ../extension.zip *', (error) => {
        if (error) {
            console.error('打包失败:', error);
            return;
        }
        console.log('打包成功: extension.zip');
    });
}

// 执行构建
function build() {
    console.log('开始构建...');
    cleanBuildDir();
    copyFiles();
    packageExtension();
}

build(); 