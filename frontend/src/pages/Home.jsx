import React, { useState, useRef, useEffect } from "react";
import {
  BsCheckAll,
  BsCircleFill,
  BsFillChatLeftTextFill,
  BsThreeDotsVertical,
  BsEmojiSmile,
  BsMicFill,
} from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { IoMdAttach } from "react-icons/io";

// --- Mock Data ---


// --- Chat mock messages ---
const mockMessages = [
  { id: 1, sender: "other", text: "Hey! Are you free this weekend?", time: "10:50 AM" },
  { id: 2, sender: "me", text: "Hi! Yeah, I think so. What do you have in mind?", time: "10:51 AM" },
  { id: 3, sender: "other", text: "Thinking of going for a hike. Interested?", time: "10:51 AM" },
  { id: 4, sender: "me", text: "That sounds amazing! Count me in. Where are we going?", time: "10:52 AM" },
];

const Home = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Rony",
      avatar: "https://i.pravatar.cc/150?img=1",
      lastMessage: "Hey, how's it going?",
      time: "10:40 AM",
    },
    {
      id: 2,
      name: "Amit",
      avatar: "https://i.pravatar.cc/150?img=2",
      lastMessage: "See you tomorrow!",
      time: "9:15 AM",
    },
    {
      id: 3,
      name: "Pooja",
      avatar: "https://i.pravatar.cc/150?img=3",
      lastMessage: "Okay, sounds good.",
      time: "Yesterday",
    },
  ]);


  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const newMsg = {
      id: Date.now(),
      sender: "me",
      text: newMessage,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setNewMessage("");
    setUsers((prevUsers) =>
  prevUsers.map((user) =>
    user.id === selectedUser.id
      ? {
          ...user,
          lastMessage: newMessage,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        }
      : user
  )
);
  };

  useEffect(() => {
    if (!newMessage) {
      setIsTyping(false);
      return;
    }

    setIsTyping(true);

    const timeout = setTimeout(() => {
      setIsTyping(false);
    }, 2000); // 2 seconds after last keystroke

    return () => clearTimeout(timeout);
  }, [newMessage]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Load mock messages when selecting a user
  useEffect(() => {
    if (selectedUser) {
      setMessages(mockMessages);
    }
  }, [selectedUser]);

  return (
    <div className="h-screen w-full flex font-sans bg-[#111B21] text-[#E9EDEF]">
      {/* ---------------- Left Sidebar ---------------- */}
      <div className="w-[30%] min-w-[350px] flex flex-col border-r border-r-white/20">
        {/* Header */}
        <div className="h-[60px] bg-[#202C33] flex justify-between items-center p-3">
          <img src="https://i.pravatar.cc/150?img=10" alt="My Avatar" className="w-10 h-10 rounded-full" />
          <div className="flex items-center gap-5 text-xl text-[#AEBAC1]">
            <BsCircleFill />
            <BsFillChatLeftTextFill />
            <BsThreeDotsVertical />
          </div>
        </div>

        {/* Search */}
        <div className="bg-[#111B21] p-2">
          <div className="relative">
            <CiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8696A0]" />
            <input
              type="text"
              placeholder="Search or start new chat"
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#202C33] text-sm placeholder:text-[#8696A0] outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {users
            .filter((user) => user.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((user) => (
              <div
                key={user.id}
                onClick={() => setSelectedUser(user)}
                className={`flex items-center p-3 cursor-pointer transition-all border-b border-b-white/10 ${
                  selectedUser?.id === user.id ? "bg-[#2A3942]" : "hover:bg-[#2A3942]"
                }`}
              >
                <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full mr-4" />
                <div className="flex-1">
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-[#8696A0]">{user.lastMessage}</p>
                </div>
                <p className="text-xs text-[#8696A0]">
                    {isTyping ? "typing..." : "online"}
                </p>
              </div>
            ))}
        </div>
      </div>

      {/* ---------------- Right Chat Window ---------------- */}
      <div
        className="flex-1 flex flex-col"
        style={{
          backgroundImage: `url('https://i.gadgets360cdn.com/large/whatsapp_multi_device_support_update_image_1636207150180.jpg')`,
          backgroundSize: "100%",
          backgroundRepeat: "cover",
        }}
      >
        {selectedUser ? (
          <>
            {/* Chat Header */}
            <div className="h-[60px] bg-[#202C33] flex justify-between items-center px-4">
              <div className="flex items-center gap-4">
                <img src={selectedUser.avatar} alt={selectedUser.name} className="w-10 h-10 rounded-full" />
                <div>
                  <h2 className="text-md font-medium">{selectedUser.name}</h2>
                  <p className="text-xs text-[#8696A0]">online</p>
                </div>
              </div>
              <div className="flex items-center gap-5 text-xl text-[#AEBAC1]">
                <CiSearch />
                <BsThreeDotsVertical />
              </div>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2 scroll-smooth">
              {messages.length === 0 && (
                <p className="text-center text-[#8696A0] text-sm mt-4">No messages yet. Start the conversation 👋</p>
              )}
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[65%] p-2 rounded-2xl text-sm relative ${
                      msg.sender === "me"
                        ? "rounded-br-sm bg-[#005C4B]"
                        : "rounded-bl-sm bg-[#202C33]"
                    }`}
                  >
                    <p className="pr-12">{msg.text}</p>
                    <div className="absolute bottom-1 right-2 flex items-center gap-1">
                      <p className="text-xs text-white/60">{msg.time}</p>
                      {msg.sender === "me" && <BsCheckAll className="text-sm text-blue-400" />}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="bg-[#202C33] flex items-center gap-4 p-3">
              <BsEmojiSmile className="text-2xl text-[#8696A0] cursor-pointer hover:text-white transition" />
              <IoMdAttach className="text-2xl text-[#8696A0] cursor-pointer -rotate-45" />
              <input
                type="text"
                placeholder="Type a message"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1 p-2 rounded-lg bg-[#2A3942] text-sm text-white placeholder:text-[#8696A0] outline-none"
              />
              <BsMicFill className="text-2xl text-[#8696A0] cursor-pointer" />
            </div>
          </>
        ) : (
          // No user selected
          <div className="flex-1 flex flex-col items-center justify-center text-center border-b-4 border-b-emerald-500">
            {/* <img
              src="https://static.whatsapp.net/rsrc.php/v3/yX/r/dJq9q_j2dlt.png"
              alt="WhatsApp"
              className="w-64 h-64"
            /> */}
            {/* <h1 className="text-3xl text-gray-300 mt-4">WhatsApp Web</h1>
            <p className="text-sm text-[#8696A0] mt-2">
              Send and receive messages without keeping your phone online.
              <br />
              Use WhatsApp on up to 4 linked devices and 1 phone at the same time.
            </p> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
