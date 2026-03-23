# 项目名称
PDF 文件管理器

# 项目简介
一个基于 React 构建的 PDF 文件管理器，支持：
PDF展示
PDF 文件上传、预览、下载
节点交互与模态框预览
响应式布局与加载状态管理

# 技术栈
前端框架：React 18.3.1
构建工具：Vite
UI 组件库：Ant Design
图表 / 图谱：echarts
样式：Less
工具库：Lodash（防抖等）
API 通信：自定义 Axios 封装（fileApi.js、knowledgeApi.js）

# 项目结构
├── src/
│   ├── api/                 # API 接口封装
│   │   ├── fileApi.js       # 文件上传/下载接口
│   │   └── knowledgeApi.js  # 知识图谱数据接口
│   ├── assets/              # 静态资源
│   ├── components/          # 公共组件
│   │   ├── DocumentList/    # 文档列表组件
│   │   ├── FileUpload/      # 文件上传组件
│   │   ├── KnowledgeCard/   # 知识卡片组件
│   │   ├── KnowledgeGraph/  # 知识图谱可视化组件
│   │   ├── Navbar/          # 导航栏组件
│   │   └── PDFPreview/      # PDF 预览组件
│   ├── pages/               # 页面组件
│   │   ├── KnowledgePage/   # 知识图谱主页面
│   │   └── Login/           # 登录页面
│   ├── utils/               # 工具函数
│   ├── App.jsx              # 根组件
│   └── main.jsx             # 入口文件
├── public/                  # 公共资源
├── vite.config.js           # Vite 配置（或 webpack.config.js）
└── package.json             # 项目依赖与脚本


# 核心功能说明
1. 数据加载
页面加载时自动调用 getGraphData() 接口获取图谱数据
使用 originalDataRef 缓存原始数据，支持后续筛选 / 搜索
加载状态由 loading 状态管理，提供友好的加载提示

2. 文件管理
支持 PDF 文件上传节点
文件名格式：{fileId}_{原文件名}，与数据库 ID 一一对应
提供下载接口 /api/file/download/{fileId}

3. 文件预览
暂时调用后端接口，新打开页面展示
后续计划使用 react-pdf 实现预览效果

4. 整体背景
使用拓扑图实现
增加一个文件拓扑图会增加一个节点


## 🚀 快速开始
### 环境要求
- Node.js 16+
- npm / yarn / pnpm

### 安装依赖
```bash
npm install


## 宝塔登录地址
http://47.109.206.182:8888/login

username: 6ad05955
password: 67e975327e0b