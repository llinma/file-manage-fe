import React from 'react';
// import { openPDFPreview, downloadPDF } from '../../api/fileApi';
import './index.less'

/**
 * PDF卡片组件
 * @param {Object} node - 包含PDF信息的节点数据
 * @param {Function} onPreview - 预览回调
 */
const KnowledgeCard = ({ node, onPreview }) => {
  // 解析标签
  const tags = node.tags ? node.tags.split(',').filter(tag => tag) : ['#PDF', '#文档'];

  // 下载PDF
  const handleDownload = () => {
    window.open(node.pdfUrl, '_blank');
  };

  // 预览PDF
  const handlePreview = () => {
    onPreview(node);
  };

  return (
    <div
      style={{
        background: 'rgba(14, 22, 51, 0.9)',
        border: `1px solid ${node.color || 'rgba(59, 130, 246, 0.6)'}`,
        borderRadius: '12px',
        padding: '20px',
        color: '#fff',
        // boxShadow: `0 0 15px ${node.color || 'rgba(59, 130, 246, 0.6)'}`,
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        backdropFilter: 'blur(8px)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.02)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
      }}
    >
      <h4
        className='card-title'
        style={{ color: node.color || '#1890ff', }}
        title={node.title}
      >
        {node.title}
      </h4>

      <p
        style={{
          fontSize: '12px',
          color: '#ccc',
          marginBottom: '8px'
        }}
      >
        文件名：{node.fileName || '未知文件'}
      </p>
      <p
        style={{
          fontSize: '14px',
          opacity: 0.8,
          marginBottom: '16px',
          lineHeight: 1.5
        }}
      >
        {node.description || '暂无简介'}
      </p>

      <div
        style={{
          display: 'flex',
          gap: '8px',
          flexWrap: 'wrap',
          marginBottom: '16px'
        }}
      >
        {tags.map((tag, index) => (
          <span
            key={index}
            style={{
              fontSize: '12px',
              padding: '4px 8px',
              background: `${node.color || 'rgba(24, 144, 255, 0.2)'}`,
              borderRadius: '4px',
              color: '#fff',
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          style={{
            flex: 1,
            fontSize: '14px',
            padding: '6px 0',
            background: node.color || '#1890ff',
            border: 'none',
            borderRadius: '6px',
            color: '#fff',
            cursor: 'pointer',
            transition: 'background 0.2s'
          }}
          onClick={handlePreview}
          onMouseEnter={(e) => e.target.style.background = '#40a9ff'}
          onMouseLeave={(e) => e.target.style.background = node.color || '#1890ff'}
        >
          预览PDF
        </button>
        <button
          style={{
            flex: 1,
            fontSize: '14px',
            padding: '6px 0',
            background: '#36cbcb',
            border: 'none',
            borderRadius: '6px',
            color: '#fff',
            cursor: 'pointer',
            transition: 'background 0.2s'
          }}
          onClick={handleDownload}
          onMouseEnter={(e) => e.target.style.background = '#52d8d8'}
          onMouseLeave={(e) => e.target.style.background = '#36cbcb'}
        >
          下载PDF
        </button>
      </div>
    </div>
  );
};

export default KnowledgeCard;