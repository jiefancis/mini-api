module.exports = {
  apps: [
    {
      name: 'yuexuan-app', // 应用名称
      script: './main.js', // 打包后的入口文件
      instances: 1, // 实例数量
      autorestart: true, // 自动重启
      watch: false, // 是否监听文件变化
      max_memory_restart: '1G', // 内存限制，超过则重启
      output: './logs/out.log',
      error: './logs/error.log',
      log: './logs/combined.outerr.log',
      env: {
        NODE_ENV: 'development', // 环境变量
      },
      env_production: {
        NODE_ENV: 'production',
        HOST: '0.0.0.0',
        PORT: 3001,
      },
    },
  ],
};
