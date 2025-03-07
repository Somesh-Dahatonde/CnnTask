"use client";

import React, { useState } from "react";
import { Bot, Send } from "lucide-react";
import axios from "axios";

function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");

  // Function to handle sending user message
  const sendMessage = async () => {
    if (!input.trim()) return;

    // Append user message to chat
    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    try {
      // Call AI API (Replace with your backend API)
      const response = await axios.post("https://your-ai-api.com/chat", {
        message: input,
      });

      // Append bot response to chat
      setMessages([
        ...newMessages,
        { sender: "bot", text: response.data.reply },
      ]);
    } catch (error) {
      console.error("Failed to fetch AI response:", error);
      setMessages([
        ...newMessages,
        { sender: "bot", text: "Sorry, something went wrong!" },
      ]);
    }
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <button
        className="fixed bottom-10 right-10 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bot size={30} />
      </button>

      {/* Chatbox */}
      {isOpen && (
        <div className="fixed bottom-28 right-10  bg-white border shadow-lg rounded-lg flex flex-col w-90 z-50">
          <div className="p-4 bg-blue-500 text-white font-bold flex justify-between rounded-lg ">
            ChatBot
            <button onClick={() => setIsOpen(false)} className="text-white">
              ✖
            </button>
          </div>

          {/* Chat Messages */}
          <div className="p-4 h-64 overflow-y-auto space-y-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg ${
                  msg.sender === "user"
                    ? "bg-blue-100 self-end text-right"
                    : "bg-gray-100 text-left"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input Field */}
          <div className="p-2 flex items-center border-t">
            <input
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-2 py-1 border rounded"
            />
            <button
              onClick={sendMessage}
              className="ml-2 bg-blue-500 text-white p-2 rounded"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatBot;
