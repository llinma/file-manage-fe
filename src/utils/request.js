import axios from 'axios';

// 创建axios实例
const request = axios.create({
  baseURL: '/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
});

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.error('请求错误：', error);
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    const res = response.data;
    // 统一处理响应
    if (res.code !== 200) {
      alert(res.msg || '请求失败');
      return Promise.reject(res);
    }
    return res;
  },
  (error) => {
    alert('网络异常，请检查后端是否启动！');
    console.error('响应错误：', error);
    return Promise.reject(error);
  }
);

export default request;