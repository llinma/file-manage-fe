import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

/**
 * PDF预览组件
 * @param {Object} node - 包含PDF信息的节点
 * @param {Function} onClose - 关闭回调
 */
const PDFPreview = ({ node, onClose }) => {
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
                <div
                    style={{
                        width: '80%',
                        maxWidth: '1000px',
                        background: '#fff',
                        borderRadius: '8px',
                        padding: '20px',
                        boxShadow: '0 0 30px rgba(0, 0, 0, 0.3)',
                        overflow: 'auto',
                        flex: 1
                    }}
                >
                    <iframe
                        style={{ width: '100%', height: '98%' }}
                        src={`/api/file/preview/${node.id}`}
                        title={node.fileName}
                        className="preview-pdf"
                    />
                </div>
            </div>
        </>
    );
};

export default PDFPreview;