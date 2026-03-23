import React, { useState } from 'react';
import { uploadPDF } from '../../api/fileApi';
import { message } from 'antd';

const FileUpload = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [color, setColor] = useState('#1890ff');
  const [loading, setLoading] = useState(false);


  // 文件选择
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      if (!title) {
        setTitle(selectedFile.name.replace('.pdf', ''));
      }
    } else {
      alert('请选择PDF格式文件！');
    }
  };

  // 提交上传
  const handleSubmit = async () => {
    if (!file || !title) {
      message.destroy()
      message.warning('请选择PDF文件并填写标题！')
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('tags', tags);
    formData.append('color', color);

    try {
      const res = await uploadPDF(formData);
      message.destroy()
      message.success('PDF上传成功！')
      onUploadSuccess(res.data); // 通知父组件刷新列表
      // 重置表单
      setFile(null);
      setTitle('');
      setDescription('');
      setTags('');
      document.getElementById('pdf-file').value = '';
    } catch (error) {
      message.destroy()
      message.success('上传失败：' + (error.msg || '网络异常'))
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        zIndex: 2,
        background: 'rgba(14, 22, 51, 0.9)',
        padding: '20px',
        borderRadius: '12px',
        backdropFilter: 'blur(8px)',
        color: '#fff'
      }}
    >
      <h4 style={{ margin: '0 0 16px 0', color: '#1890ff' }}>上传PDF文档</h4>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div>
          <label style={{ fontSize: '14px', marginBottom: '4px', display: 'block' }}>选择PDF文件：</label>
          <input
            type="file"
            id="pdf-file"
            accept=".pdf"
            onChange={handleFileChange}
            style={{
              padding: '8px',
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(24, 144, 255, 0.3)',
              borderRadius: '6px',
              color: '#fff'
            }}
          />
        </div>
        <div>
          <label style={{ fontSize: '14px', marginBottom: '4px', display: 'block' }}>文档标题：</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="请输入文档标题"
            style={{
              width: '300px',
              padding: '8px 12px',
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(24, 144, 255, 0.3)',
              borderRadius: '6px',
              color: '#fff',
              outline: 'none'
            }}
          />
        </div>
        <div>
          <label style={{ fontSize: '14px', marginBottom: '4px', display: 'block' }}>文档简介：</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="请输入文档简介"
            rows={2}
            style={{
              width: '300px',
              padding: '8px 12px',
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(24, 144, 255, 0.3)',
              borderRadius: '6px',
              color: '#fff',
              outline: 'none',
              resize: 'none'
            }}
          />
        </div>
        <div>
          <label style={{ fontSize: '14px', marginBottom: '4px', display: 'block' }}>标签（逗号分隔）：</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="例如：#前端,#PDF,#架构"
            style={{
              width: '300px',
              padding: '8px 12px',
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(24, 144, 255, 0.3)',
              borderRadius: '6px',
              color: '#fff',
              outline: 'none'
            }}
          />
        </div>
        <div>
          <label style={{ fontSize: '14px', marginBottom: '4px', display: 'block' }}>卡片颜色：</label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            style={{ width: '40px', height: '40px', border: 'none', borderRadius: '6px' }}
          />
        </div>
        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            padding: '8px 16px',
            background: '#1890ff',
            border: 'none',
            borderRadius: '6px',
            color: '#fff',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '14px',
            fontWeight: 500
          }}
        >
          {loading ? '上传中...' : '上传PDF'}
        </button>
      </div>
    </div>
  );
};

export default FileUpload;