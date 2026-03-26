import request from '../utils/request';

/**
 * 获取知识图谱数据（节点+关系）
 */
export const getGraphData = () => {
  return request.get('/knowledge/graph');
};

/**
 * 根据ID获取节点详情
 * @param {String} id - 节点ID
 */
export const getNodeById = (id) => {
  return request.get(`/knowledge/node/${id}`);
};
