import { useState, useEffect, useContext } from "react";
import { RiRobot2Fill } from "react-icons/ri";
import { AuthContext } from "../context/AuthContext";

export default function PlayGridAssistant() {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hi 👋 I'm PlayGrid Assistant. What would you like to book today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [sessionId, setSessionId] = useState("");

  useEffect(() => {
    // Update greeting when user is available
    if (user?.fullname) {
      setMessages([
        { role: "assistant", text: `Hi 👋 ${user.fullname}! I'm PlayGrid Assistant. What would you like to book today?` }
      ]);
    }
  }, [user?.fullname]);

  useEffect(() => {
    // Generate unique session ID when component is rendered
    const uniqueSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    setSessionId(uniqueSessionId);
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/agent/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input, sessionId, email: user?.email }),
      });

      const data = await response.json();
      setMessages(prev => [
        ...prev,
        { role: "assistant", text: data.reply }
      ]);
    } catch (error) {
      console.error("Error:", error);
      setMessages(prev => [
        ...prev,
        { role: "assistant", text: "Sorry, something went wrong. Please try again." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-4 right-4 z-50 w-14 h-14 rounded-full bg-green-600 text-white shadow-xl hover:bg-green-700 flex items-center justify-center"
        >
          <RiRobot2Fill  size={20}/>
        </button>
      )}

      {/* Chat Panel */}
      {open && (
        <div className="fixed bottom-4 right-4 z-50">
          <div className="w-[360px] h-[520px] bg-white shadow-2xl rounded-xl flex flex-col border">

            {/* Header */}
            <div className="bg-green-600 text-white p-4 rounded-t-xl flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold">PlayGrid Assistant</h2>
                <p className="text-sm opacity-90">Book sports turfs effortlessly</p>
              </div>
              <button onClick={() => setOpen(false)} className="text-white text-xl">✕</button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-4 space-y-3 overflow-y-auto">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`max-w-[80%] p-3 rounded-lg text-sm ${
                    msg.role === "user"
                      ? "ml-auto bg-green-500 text-white"
                      : "mr-auto bg-gray-200 text-gray-800"
                  }`}
                >
                  {msg.text}
                </div>
              ))}

              {loading && (
                <div className="mr-auto bg-gray-200 text-gray-600 text-sm p-2 rounded-lg">
                  Thinking...
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-3 border-t flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Book a football turf in Mumbai..."
                className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                onClick={sendMessage}
                className="bg-green-600 hover:bg-green-700 text-white px-4 rounded-lg text-sm"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
