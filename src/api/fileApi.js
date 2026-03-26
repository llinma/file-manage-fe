import request from '../utils/request';

/**
 * 上传PDF文件
 * @param {FormData} formData - 包含文件和表单数据
 */
export const uploadPDF = (formData) => {
  return request.post('/file/upload-pdf', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

/**
 * 预览PDF文件
 * @param {String} fileId - 文件ID
 */
export const openDocument = (fileId) => {
  window.open(`/api/file/preview/${fileId}`, '_blank');
};

/**
 * 下载PDF文件
 * @param {String} fileId - 文件ID
 */
export const downloadPDF = (fileId) => {
  window.open(`/api/file/download/${fileId}`, '_blank');
};