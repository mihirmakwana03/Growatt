import React, { useState } from "react";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isOpen, setIsOpen] = useState(false); // toggle state

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
      return "You can view our recent projects in the Portfolio section. Let me know if you want a direct link!";

    if (lower.includes("contact") || lower.includes("reach"))
      return "You can reach us through the Contact page, or email us at info@growattinfosystem.com 📩";

    if (lower.includes("location") || lower.includes("where are you"))
      return "We are based in India 🇮🇳, serving clients worldwide with passion and precision.";

    if (lower.includes("pricing") || lower.includes("cost"))
      return "Our pricing depends on project scope. We'd love to offer a custom quote after a quick consultation.";

    if (lower.includes("working hours") || lower.includes("time"))
      return "Our team is available Monday to Saturday, 10 AM to 7 PM IST. Feel free to drop a message anytime.";

    if (lower.includes("career") || lower.includes("job"))
      return "Looking to join us? Visit the Career page to see current openings. We'd love to work with passionate minds!";

    return "Hmm, I didn't quite catch that. Could you please rephrase or ask something else?";
  };

  const sendMessage = () => {
    if (!userInput.trim()) return;

    const userMessage = { sender: "user", text: userInput };
    const reply = { sender: "bot", text: botReply(userInput) };

    setMessages([...messages, userMessage, reply]);
    setUserInput("");
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
      </div>

      {/* Chatbox window */}
      {isOpen && (
        <div style={styles.container}>
          <div style={styles.header}>
            <span>GrowattBot 💬</span>
            <button onClick={() => setIsOpen(false)} style={styles.closeButton}>
              ×
            </button>
          </div>

          <div style={styles.chatBox}>
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  ...styles.message,
                  alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                  backgroundColor:
                    msg.sender === "user" ? "#4a90e2" : "#2a2a2a",
                  color: msg.sender === "user" ? "#fff" : "#f0f0f0",
                }}
                dangerouslySetInnerHTML={{ __html: msg.text }} 
              />
            ))}
          </div>

          <div style={styles.inputArea}>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              style={styles.input}
              placeholder="Type a message..."
            />
            <button onClick={sendMessage} style={styles.button}>
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
  },
  container: {
    position: "fixed",
    bottom: "80px",
    left: "20px",
    width: "350px",
    height: "500px",
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
    fontWeight: "bold",
    color: "#00d4ff",
  },
  closeButton: {
    background: "transparent",
    border: "none",
    fontSize: "20px",
    cursor: "pointer",
    color: "#ccc",
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
  message: {
    padding: "10px 14px",
    borderRadius: "15px",
    maxWidth: "70%",
    lineHeight: "1.4",
    fontSize: "15px",
    wordWrap: "break-word",
    boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
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
  },
  button: {
    padding: "10px 16px",
    borderRadius: "8px",
    border: "none",
    background: "linear-gradient(135deg, #007bff, #00d4ff)",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default Chatbot;
