import React, { useState, useRef, useEffect } from "react";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { 
      sender: "bot", 
      text: "Hello! I'm GrowattBot. How can I help you today? 😊",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [userInput, setUserInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const botReply = (msg) => {
    const lower = msg.toLowerCase();

    if (lower.includes("hello") || lower.includes("hi"))
      return "Hello! How can I help you today? 😊";

    if (lower.includes("your name"))
      return "I'm GrowattBot, your friendly assistant from Growatt Infosystem 🤖";

    if (lower.includes("help"))
      return "Of course! Feel free to ask me about our services, portfolio, or how to get in touch.";

    if (lower.includes("services") || lower.includes("what do you offer")) {
      return `✨ We offer a full suite of creative design services:<br>
      🎨 Logo Design<br>
      🧬 Brand Identity<br>
      📦 Packaging Design<br>
      💼 Business Card Design<br>
      📝 Letterheads<br>
      🏷️ Label Design<br>
      🖼️ Flex Design<br>
      📚 Catalog Design<br>
      📖 Brochure Design<br>
      🎯 Banner Design`;
    }

    if (lower.includes("portfolio"))
      return "You can view our recent projects in the Portfolio section. Let me know if you want a direct link! <a href='/portfolio' style='color: #00d4ff;'>Portfolio</a>";

    if (lower.includes("contact") || lower.includes("reach"))
      return "You can reach us through the Contact page, or email us at growattinfosystem@gmail.com 📩";

    if (lower.includes("location"))
      return "We are based in India 🇮🇳, serving clients worldwide with passion and precision.";

    if (lower.includes("address") || lower.includes("where are you located"))
      return "We are located at 831, RK Empire, 150 Feet Ring Road, Rajkot, India, 360004.";

    if (lower.includes("pricing") || lower.includes("cost"))
      return "Our pricing depends on project scope. We'd love to offer a custom quote after a quick consultation.";

    if (lower.includes("working hours") || lower.includes("time"))
      return "Our team is available Monday to Saturday, 9 AM to 5 PM IST. Feel free to drop a message anytime. <a href='/contact' style='color: #00d4ff;'>Contact US</a>";

    if (lower.includes("career") || lower.includes("job"))
      return "Looking to join us? Visit the Career page to see current openings. We'd love to work with passionate minds!";

    return "Hmm, I didn't quite catch that. Could you please rephrase or ask something else?";
  };

  const sendMessage = () => {
    if (!userInput.trim()) return;

    // Add user message
    const userMessage = { 
      sender: "user", 
      text: userInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, userMessage]);
    setUserInput("");
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const reply = { 
        sender: "bot", 
        text: botReply(userInput),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, reply]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1500); // Random delay between 1-2.5 seconds
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating chat icon */}
      <div style={styles.floatingButton} onClick={() => setIsOpen(!isOpen)}>
        <img
          src="/assets/chatbot.png"
          alt="Chat"
          style={{
            width: "60px",
            height: "60px",
            objectFit: "cover",
            borderRadius: "50%",
          }}
        />
        {!isOpen && messages.length > 1 && (
          <div style={styles.notificationBadge}>
            {messages.filter(m => m.sender === "bot").length}
          </div>
        )}
      </div>

      {/* Chatbox window */}
      {isOpen && (
        <div style={styles.container}>
          <div style={styles.header}>
            <div style={styles.botInfo}>
              <span style={styles.botName}>GrowattBot</span>
              <span style={styles.status}>Online</span>
            </div>
            <button onClick={() => setIsOpen(false)} style={styles.closeButton}>
              ×
            </button>
          </div>

          <div style={styles.chatBox}>
            {messages.map((msg, index) => (
              <div 
                key={index}
                style={{
                  ...styles.messageContainer,
                  justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    ...styles.message,
                    backgroundColor: msg.sender === "user" ? "#4a90e2" : "#2a2a2a",
                    color: msg.sender === "user" ? "#fff" : "#f0f0f0",
                  }}
                >
                  <div dangerouslySetInnerHTML={{ __html: msg.text }} />
                  <div style={styles.timestamp}>{msg.timestamp}</div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div style={styles.typingIndicator}>
                <div style={styles.typingDot}></div>
                <div style={styles.typingDot}></div>
                <div style={styles.typingDot}></div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div style={styles.inputArea}>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={handleKeyDown}
              style={styles.input}
              placeholder="Type a message..."
            />
            <button 
              onClick={sendMessage} 
              style={styles.button}
              disabled={!userInput.trim()}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const styles = {
  floatingButton: {
    position: "fixed",
    bottom: "20px",
    left: "20px",
    zIndex: 1000,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1d1d1d",
    borderRadius: "50%",
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
    padding: "5px",
    transition: "transform 0.2s",
    transform: "scale(1)",
  },
  notificationBadge: {
    position: "absolute",
    top: "-5px",
    right: "-5px",
    backgroundColor: "#ff4757",
    color: "white",
    borderRadius: "50%",
    width: "20px",
    height: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    fontWeight: "bold",
  },
  container: {
    position: "fixed",
    bottom: "90px",
    left: "20px",
    width: "350px",
    maxWidth: "calc(100vw - 40px)",
    height: "500px",
    maxHeight: "calc(100vh - 110px)",
    border: "1px solid #2e2e2e",
    borderRadius: "12px",
    padding: "10px",
    background: "linear-gradient(135deg, #121212, #1f1f1f)",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    fontFamily: "Segoe UI, sans-serif",
    zIndex: 1001,
    boxShadow: "0 6px 20px rgba(0,0,0,0.4)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: "10px",
    borderBottom: "1px solid #333",
  },
  botInfo: {
    display: "flex",
    flexDirection: "column",
  },
  botName: {
    fontWeight: "bold",
    color: "#00d4ff",
    fontSize: "16px",
  },
  status: {
    fontSize: "12px",
    color: "#00c853",
  },
  closeButton: {
    background: "transparent",
    border: "none",
    fontSize: "20px",
    cursor: "pointer",
    color: "#ccc",
    padding: "5px 10px",
  },
  chatBox: {
    flex: 1,
    overflowY: "auto",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    background: "#181818",
    borderRadius: "8px",
    marginBottom: "10px",
  },
  messageContainer: {
    display: "flex",
    width: "100%",
  },
  message: {
    padding: "10px 14px",
    borderRadius: "15px",
    maxWidth: "80%",
    lineHeight: "1.4",
    fontSize: "15px",
    wordWrap: "break-word",
    boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
  },
  timestamp: {
    fontSize: "10px",
    opacity: 0.7,
    textAlign: "right",
    marginTop: "4px",
  },
  typingIndicator: {
    display: "flex",
    padding: "8px 12px",
    borderRadius: "15px",
    backgroundColor: "#2a2a2a",
    alignSelf: "flex-start",
    gap: "5px",
  },
  typingDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    backgroundColor: "#ccc",
    animation: "typingAnimation 1.4s infinite ease-in-out",
  },
  inputArea: {
    display: "flex",
    gap: "10px",
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #444",
    backgroundColor: "#101010",
    color: "#fff",
    outline: "none",
  },
  button: {
    padding: "10px 16px",
    borderRadius: "8px",
    border: "none",
    background: "linear-gradient(135deg, #007bff, #00d4ff)",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "opacity 0.2s",
  },
  "@keyframes typingAnimation": {
    "0%, 60%, 100%": {
      transform: "translateY(0)",
    },
    "30%": {
      transform: "translateY(-5px)",
    },
  },
};

export default Chatbot;