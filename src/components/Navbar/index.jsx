import React from 'react';

import { Button, Flex } from 'antd';

import './index.less'

const Navbar = ({ onUploadClick }) => {
    return (
        <nav className='nav-bar'  >
            {/* 左侧标题 */}
            <div style={{ color: '#1890ff', fontSize: '20px', fontWeight: 'bold' }}>
                PDF 文件管理器
            </div>

            {/* 右侧上传按钮 */}
            <Button type="primary" onClick={onUploadClick}>
                上传PDF文档
            </Button>
        </nav>
    );
};

export default Navbar;