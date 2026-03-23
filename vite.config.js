import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,        // 前端端口
    open: true,        // 启动后自动打开浏览器
    cors: true,        // 允许跨域
    proxy: {
      // 接口代理（解决跨域）
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api')
      }
    }
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
});