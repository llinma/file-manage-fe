import { Button, Space } from 'antd';
import './index.less'

const Navbar = ({ onUploadClick, onAssistantClick }) => {
    return (
        <nav className='nav-bar'  >
            <div style={{ color: '#1890ff', fontSize: '20px', fontWeight: 'bold' }}>
                PDF 文件管理器
            </div>
            <div>
                <Space>
                    <Button type="primary" onClick={onUploadClick}>
                        上传PDF文档
                    </Button>
                    {/* <Button type="primary" onClick={onAssistantClick}>
                        <RedditOutlined />
                    </Button> */}
                </Space>

            </div>
        </nav>
    );
};

export default Navbar;