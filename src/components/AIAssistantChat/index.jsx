import { useState, useRef, useEffect } from 'react';
import './index.less';

export default function AiChat() {
    const [messages, setMessages] = useState([
        { id: 1, role: 'ai', content: '你好，我是你的智能助手～' },
    ]);
    const [inputText, setInputText] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);
    // 自动滚动到底部
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

 const handleSend = async () => {
    if (!inputText.trim() || loading) return;
    setLoading(true);
    let result = '';

    // 加入用户消息
    setMessages(prev => [...prev, { role: 'user', content: inputText }]);
    const msg = inputText;
    setInputText('');

    try {
        const res = await fetch('/api/ai/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messages: msg })
        });

        const reader = res.body.getReader();
        const decoder = new TextDecoder();

        // 先加 AI 空消息
        setMessages(prev => [...prev, { id: Date.now(), role: 'ai', content: '' }]);

        // 流式读取（绝对不会卡住的写法）
        async function read() {
            const { done, value } = await reader.read();
            if (done) {
                console.log("流结束");
                return;
            }

            result += decoder.decode(value);
            console.log("收到：", result);

            setMessages(prev =>
                prev.map((item, i) =>
                    i === prev.length - 1 ? { ...item, content: result } : item
                )
            );

            await read();
        }

        await read();

    } catch (e) {
        console.error("错误：", e);
        setMessages(prev => [...prev, { role: 'ai', content: "请求失败" }]);
    } finally {
        setLoading(false);
    }
};
    return (
        <div className="ai-chat-container">
            {/* 左侧 */}
            {/* <div className="ai-sidebar">
                <div className="logo">AI 助手</div>
                <ul className="menu">
                    <li className="active">对话</li>
                    <li>知识库</li>
                    <li>设置</li>
                </ul>
            </div> */}

            {/* 右侧内容 */}
            <div className="ai-main">
                <div className="ai-header">
                    <h2>AI 对话助手</h2>
                    <button className="new-btn">新建对话</button>
                </div>

                <div className="ai-message-list">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`message-item ${msg.role}`}>
                            <div className="message-bubble">{msg.content}</div>
                        </div>
                    ))}

                    {loading && (
                        <div className="message-item ai">
                            <div className="message-bubble loading">思考中...</div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                <div className="ai-input-bar">
                    <textarea
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="输入消息..."
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSend();
                            }
                        }}
                    />
                    <button onClick={handleSend} disabled={loading}>
                        发送
                    </button>
                </div>
            </div>
        </div>
    );
}