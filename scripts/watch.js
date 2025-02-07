const chokidar = require('chokidar');
const { exec } = require('child_process');

// 监听配置
const config = {
    watchDirs: ['src', 'manifest.json'],
    ignored: /(^|[\/\\])\../  // 忽略隐藏文件
};

// 执行构建
function runBuild() {
    console.log('检测到文件变化，开始重新构建...');
    exec('node scripts/build.js', (error, stdout, stderr) => {
        if (error) {
            console.error('构建失败:', error);
            return;
        }
        console.log(stdout);
        if (stderr) {
            console.error(stderr);
        }
    });
}

// 启动文件监听
function watch() {
    console.log('开始监听文件变化...');
    
    const watcher = chokidar.watch(config.watchDirs, {
        ignored: config.ignored,
        persistent: true
    });

    watcher
        .on('change', path => {
            console.log(`文件变化: ${path}`);
            runBuild();
        })
        .on('error', error => {
            console.error('监听错误:', error);
        });
}

watch(); 