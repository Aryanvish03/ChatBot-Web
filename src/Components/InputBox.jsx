import { useState, useEffect } from "react";
import axios from "axios";


const InputBox = ()=> {
  const [question, setQuestion] = useState("");
  const [chatHistory, setChatHistory] = useState([
    {
      userMessage: "",
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  
  // Suggested questions (static or can be fetched dynamically)


  useEffect(() => {
    async function fetchHistory() {
      try {
        const response = await axios.get("http://localhost:8080/api/chat-history");
        const updatedHistory = response.data.map((chat) => ({
          userMessage: chat.userMessage || "",
          botResponse: chat.botResponse || "",
          timestamp: new Date(chat.timestamp || Date.now()),
        }));
        setChatHistory(updatedHistory);
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    }
    fetchHistory();
  }, []);

  async function generateAnswer() {
    if (!question.trim()) return;
    setIsTyping(true);

    const userChat = {
      userMessage: question,
      botResponse: "",
      timestamp: new Date(),
    };

    setChatHistory((prevHistory) => [...prevHistory, userChat]);

    try {
      const response = await axios.post("http://localhost:8080/api/ask", { question });

      const botChat = {
        userMessage: "...",
        botResponse: response.data.answer, 
        timestamp: new Date(),
      };

      setChatHistory((prevHistory) => {
        const updated = [...prevHistory];
        updated[updated.length - 1] = { ...userChat, botResponse: response.data.answer };
        return updated;
      });
    } catch (error) {
      console.error("Error fetching answer:", error);
    }

    setIsTyping(false);
    setQuestion("");
  }

  return (
    <div className="chat-container">
      <div className="chat-box">
        
        <div className="chat-container">

        <div className="chat-body mb-10">
          {chatHistory.map((chat, index) => (
            <div key={index}>
              {chat.userMessage && (
                <div className="message user flex w-full items-center justify-end">
                  <div className="message-content  bg-gray-200 rounded-lg p-2 text-black w-fit px-4">
                    {chat.userMessage}
                    {/* <span className="timestamp">{chat.timestamp.toLocaleTimeString()}</span> */}
                  </div>
                </div>
              )}
              {chat.botResponse && (
                <div className="message bot">
                  <div className="message-content">
                    {chat.botResponse}
                    {/* <span className="timestamp">{chat.timestamp.toLocaleTimeString()}</span> */}
                  </div>
                </div>
              )}
            </div>
          ))}
         
          
          {isTyping && <div className="typing-indicator"><h1 className="text-black font-semibold text-lg">Typing...</h1></div>}

        </div>
          </div>

        {/* Suggested Questions Section */}
        

        <div className="chat-footer h-fit rounded-lg w-[550px] shadow shadow-black flex flex-row items-center justify-between">
          <input type="text" className="w-full p-2 h-16"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask any question..."
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                generateAnswer();
            }
        }}
          />
        <button className=" p-2 rounded-br-md rounded-tr-md h-16 px-6 bg-black text-white font-semibold" onClick={generateAnswer}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default InputBox;
