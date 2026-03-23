import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

/**
 * 知识图谱拓扑图组件
 * @param {Object} data - { nodes: [], links: [] }
 */
const KnowledgeGraph = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    // 初始化ECharts实例
    const chartDom = chartRef.current;
    if (!chartDom) return;

    const myChart = echarts.init(chartDom);
    const option = {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'item',
        textStyle: { color: '#fff' },
        formatter: (params) => {
          if (params.dataType === 'node') {
            return `<div>${params.name}</div>`;
          } else {
            return `<div>${params.data.relation || '关联'}</div>`;
          }
        }
      },
      series: [
        {
          type: 'graph',
          layout: 'force', // 力导向布局
          roam: true,      // 允许拖拽/缩放
          label: {
            show: false    // 隐藏节点文字（卡片单独展示）
          },
          emphasis: {
            focus: 'adjacency', // hover时高亮相邻节点/连线
            lineStyle: {
              width: 3,
              color: '#36cbcb'
            }
          },
          force: {
            repulsion: 300,    // 节点排斥力
            edgeLength: 100,   // 连线长度
            gravity: 0.1       // 向中心引力
          },
          data: data.nodes.map(node => ({
            id: node.id,
            name: node.title,
            itemStyle: {
              color: node.color || '#1890ff',
              opacity: 0.2
            }
          })),
          links: data.links.map(link => ({
            source: link.sourceId,
            target: link.targetId,
            lineStyle: {
              color: '#1890ff',
              curveness: 0.2,
              opacity: 0.6,
              width: 1
            },
            relation: link.relation
          }))
        }
      ]
    };

    // 设置配置项
    myChart.setOption(option);

    // 窗口大小变化时重绘
    const resizeHandler = () => myChart.resize();
    window.addEventListener('resize', resizeHandler);

    // 清理函数
    return () => {
      window.removeEventListener('resize', resizeHandler);
      myChart.dispose();
    };
  }, [data]);

  return (
    <div
      ref={chartRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0
      }}
    />
  );
};

export default KnowledgeGraph;