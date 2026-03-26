import React from 'react';
import { openDocument } from '../../api/fileApi';
import './index.less'

/**
 * 左侧文档列表组件
 * @param {Array} nodes - 节点列表
 * @param {Function} onPreview - 预览回调
 */
const DocumentList = ({ nodes, onPreview, onSearch }) => {
  return (
    <div className='sidebar' >

      <div className='title'>
        <div className="search-icon-wrapper">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
        <input className='tech-style-input' onChange={onSearch} placeholder='搜索标题、简介或标签' ></input>
      </div>

      {nodes.map((node) => (
        <div
          key={node.id}
          className='list'
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(24, 144, 255, 0.1)';
            e.currentTarget.style.borderColor = `rgba(${hexToRgb(node.color || '#1890ff').r}, ${hexToRgb(node.color || '#1890ff').g}, ${hexToRgb(node.color || '#1890ff').b}, 0.3)`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.borderColor = 'transparent';
          }}
        >
          <div
            style={{
              fontSize: '16px',
              color: node.color || '#1890ff',
              fontWeight: 500,
              marginBottom: '6px'
            }}
          >
            {node.title}
          </div>
          <div
            style={{
              fontSize: '12px',
              color: '#ccc',
              marginBottom: '8px',
              lineHeight: 1.4
            }}
          >
            {node.description?.substring(0, 50)}...
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              style={{
                fontSize: '12px',
                padding: '2px 8px',
                background: node.color || '#1890ff',
                border: 'none',
                borderRadius: '4px',
                color: '#fff',
                cursor: 'pointer'
              }}
              onClick={() => onPreview(node)}
            >
              预览
            </button>
            <button
              style={{
                fontSize: '12px',
                padding: '2px 8px',
                background: '#36cbcb',
                border: 'none',
                borderRadius: '4px',
                color: '#fff',
                cursor: 'pointer'
              }}
              onClick={() => openDocument(node.id)}
            >
              打开
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

// 辅助函数：十六进制转RGB
const hexToRgb = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
};

export default DocumentList;