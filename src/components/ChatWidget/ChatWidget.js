import { useState } from "react";
import "./ChatWidget.css";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (input.trim() === "") return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const res = await fetch(process.env.REACT_APP_CHATBOT_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: input })
      });

      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content || "ขออภัย ฉันไม่เข้าใจคำถามค่ะ";

      setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
    } catch (err) {
      console.error("❌ Chat API error:", err);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "เกิดข้อผิดพลาดในการเชื่อมต่อกับระบบ AI" }
      ]);
    }
  };

  return (
    <>
      <div className="chat-widget-container">
        {isOpen && (
          <div className="chat-box">
            <div className="chat-header">👕 Vintage Shop Bot</div>
            <div className="chat-messages">
              {messages.map((msg, i) => (
                <div key={i} className={`chat-message ${msg.sender}`}>
                  {msg.text}
                </div>
              ))}
            </div>
            <div className="chat-input">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="พิมพ์ข้อความ..."
              />
              <button onClick={handleSend}>ส่ง</button>
            </div>
          </div>
        )}
        <button className="chat-toggle-button" onClick={() => setIsOpen(!isOpen)}>
          💬
        </button>
      </div>
    </>
  );
}
