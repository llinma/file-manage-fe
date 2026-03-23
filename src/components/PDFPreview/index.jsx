import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = 
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.worker.min.js';
// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   'pdfjs-dist/build/pdf.worker.min.js',
//   import.meta.url
// ).toString();


/**
 * PDF预览组件
 * @param {Object} node - 包含PDF信息的节点
 * @param {Function} onClose - 关闭回调
 */
const PDFPreview = ({ node, onClose }) => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [loading, setLoading] = useState(true);

    const [blobUrl, setBlobUrl] = useState(null)

    console.log(node)

    // 加载PDF完成回调
    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setLoading(false);
    }

    useEffect(() => {
        const loadPdf = async () => {
            if (!node.pdfUrl) return;
            setLoading(true);
            try {
                // 1. 发起请求，必须携带凭证（解决登录态）
                const res = await fetch(node.pdfUrl, {
                    method: 'GET',
                    credentials: 'include', // 关键：携带 Cookie/Token
                    headers: {
                        Accept: 'application/pdf', // 明确告诉后端要 PDF
                    },
                });

                if (!res.ok) throw new Error(`请求失败: ${res.status}`);

                // 2. 转成 Blob，打印大小验证是否拿到数据
                const blob = await res.blob();
                console.log(blob)
                console.log('PDF Blob 大小:', blob.size); // 应该等于 1467006

                // 3. 生成 Blob URL
                const url = URL.createObjectURL(blob);
                console.log(url)
                setBlobUrl(url);
            } catch (err) {
                console.error('加载 PDF 失败:', err);
            } finally {
                setLoading(false);
            }
        };

        loadPdf();
        return () => {
            if (blobUrl) URL.revokeObjectURL(blobUrl);
        };
    }, [node.pdfUrl]);

    // 翻页
    const handlePrevPage = () => {
        if (pageNumber > 1) {
            setPageNumber(pageNumber - 1);
        }
    };

    const handleNextPage = () => {
        if (pageNumber < numPages) {
            setPageNumber(pageNumber + 1);
        }
    };

    return (
        <>
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0,0,0,0.8)',
                    zIndex: 999,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '20px'
                }}
            >
                {/* 头部 */}
                <div
                    style={{
                        width: '80%',
                        maxWidth: '1000px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '20px',
                        color: '#fff'
                    }}
                >
                    <h2 style={{ margin: 0, color: node.color || '#1890ff' }}>
                        {node.title} - PDF预览
                    </h2>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                        {/* 翻页控制 */}
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                            <button
                                onClick={handlePrevPage}
                                disabled={pageNumber === 1}
                                style={{
                                    padding: '4px 8px',
                                    background: pageNumber === 1 ? '#666' : '#1890ff',
                                    border: 'none',
                                    borderRadius: '4px',
                                    color: '#fff',
                                    cursor: pageNumber === 1 ? 'not-allowed' : 'pointer'
                                }}
                            >
                                上一页
                            </button>
                            <span>
                                {pageNumber} / {numPages || '?'}
                            </span>
                            <button
                                onClick={handleNextPage}
                                disabled={pageNumber === numPages}
                                style={{
                                    padding: '4px 8px',
                                    background: pageNumber === numPages ? '#666' : '#1890ff',
                                    border: 'none',
                                    borderRadius: '4px',
                                    color: '#fff',
                                    cursor: pageNumber === numPages ? 'not-allowed' : 'pointer'
                                }}
                            >
                                下一页
                            </button>
                        </div>

                        {/* 下载按钮 */}
                        <a
                            href={node.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                padding: '6px 12px',
                                background: '#36cbcb',
                                border: 'none',
                                borderRadius: '6px',
                                color: '#fff',
                                cursor: 'pointer',
                                textDecoration: 'none',
                                fontSize: '14px'
                            }}
                        >
                            下载PDF
                        </a>

                        {/* 关闭按钮 */}
                        <button
                            onClick={onClose}
                            style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '50%',
                                background: '#ff4d4f',
                                border: 'none',
                                color: '#fff',
                                fontSize: '18px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            ×
                        </button>
                    </div>
                </div>
            </div>
            {/* PDF内容 */}
            <div
                style={{
                    width: '80%',
                    maxWidth: '1000px',
                    background: '#fff',
                    borderRadius: '8px',
                    padding: '20px',
                    boxShadow: '0 0 30px rgba(0, 0, 0, 0.3)', // 修正这里
                    overflow: 'auto',
                    flex: 1
                }}
            >
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '50px' }}>
                        <p style={{ fontSize: '18px', color: '#666' }}>加载PDF中...</p>
                    </div>
                ) : (
                    <Document
                        file={blobUrl}
                        onLoadSuccess={onDocumentLoadSuccess}
                        loading="加载中..."
                    >
                        <Page pageNumber={pageNumber} width="100%" />
                    </Document>
                )}
            </div>
        </>
    );
};

export default PDFPreview;