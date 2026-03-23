import React, { useState, useEffect, useRef } from 'react';
import KnowledgeGraph from '../../components/KnowledgeGraph/index.jsx';
import KnowledgeCard from '../../components/KnowledgeCard/index.jsx';
import DocumentList from '../../components/DocumentList/index.jsx';
import FileUpload from '../../components/FileUpload/index.jsx';
// import PDFPreview from '../../components/PDFPreview/index.jsx';
import Navbar from '../../components/Navbar/index.jsx';
import { getGraphData } from '../../api/knowledgeApi.js';
import { openPDFPreview } from '../../api/fileApi.js'
import { Modal } from 'antd';
import debounce from 'lodash/debounce'
import './index.less';

const KnowledgePage = () => {
  // 状态管理
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [activeNode, setActiveNode] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const originalDataRef = useRef([])

  // 加载数据
  const loadGraphData = async () => {
    setLoading(true);
    try {
      const res = await getGraphData();
      originalDataRef.current = res.data.nodes
      setGraphData(res.data);
    } catch (error) {
      console.error('加载图谱数据失败：', error);
    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
    loadGraphData();
  }, []);



  // 预览PDF
  const handlePreview = async (node) => {
    await openPDFPreview(node.id)
  };

  // 关闭预览
  const handleClosePreview = () => {
    setActiveNode(null);
  };

  // 上传成功后刷新数据
  const handleUploadSuccess = (newNode) => {
    setIsModalOpen(false)
    setGraphData({
      ...graphData,
      nodes: [...graphData.nodes, newNode]
    });
  };


  //关键词搜索
  const onSearch = debounce((e) => {
    const keyword = e.target.value.trim()
    if (!keyword) {
      setGraphData({
        ...graphData,
        nodes: [...originalDataRef.current]
      })
      return
    };
    const lowerKeyword = keyword.toLowerCase();
    const searchNodes = graphData.nodes.filter(node => {
      const searchText = [
        node.title || '',
        node.tags || '',
        node.description || ''
      ].join(' ').toLowerCase();
      return searchText.includes(lowerKeyword);
    });
    setGraphData({
      ...graphData,
      nodes: [...searchNodes]
    });
  }, 500)

  return (
    <div className='index-page'>
      <Navbar onUploadClick={() => setIsModalOpen(true)} />
      <KnowledgeGraph data={graphData} />
      <div className='container'>
        <DocumentList
          nodes={graphData.nodes}
          onPreview={handlePreview}
          onSearch={onSearch}
        />
        <section className='preview'>
          <div className='grid'>
            {graphData.nodes.map((node) => (
              <KnowledgeCard
                key={node.id}
                node={node}
                onPreview={handlePreview}
              />
            ))}
          </div>
        </section>
      </div>
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[]}
      >
        <FileUpload onUploadSuccess={handleUploadSuccess} />
      </Modal>

      {/* 前端预览待开发 */}
      {/* {
        activeNode && <PDFPreview
          node={activeNode}
          onClose={() => setActiveNode(null)}
        />
      } */}
    </div>
  );
};

export default KnowledgePage;