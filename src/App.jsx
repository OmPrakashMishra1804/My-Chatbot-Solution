import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, Leaf, Sparkles, History, Trash2, Copy, Menu, 
  X, Info, AlertCircle, Check, ChevronRight, MessageSquare,
  LayoutDashboard 
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useLocalStorage } from './hooks/useLocalStorage';
import { getChatResponse } from './services/aiService';
import Dashboard from './components/Dashboard';

// Utility for tailwind classes
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function App() {
  const [messages, setMessages] = useLocalStorage('chat-history', []);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(() => !localStorage.getItem('onboarded'));
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('chat'); // 'chat' or 'dashboard'
  
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (activeTab === 'chat') scrollToBottom();
  }, [messages, isLoading, activeTab]);

  const handleSendMessage = async (text) => {
    const content = text || input;
    if (!content.trim() || isLoading) return;

    const newMessage = { id: Date.now(), role: 'user', content, timestamp: new Date().toLocaleTimeString() };
    const updatedMessages = [...messages, newMessage];
    
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      const responseContent = await getChatResponse(updatedMessages);
      const aiMessage = { 
        id: Date.now() + 1, 
        role: 'bot', 
        content: responseContent, 
        timestamp: new Date().toLocaleTimeString() 
      };
      setMessages([...updatedMessages, aiMessage]);
    } catch (error) {
      console.error("AI Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    // Using a more reliable way to confirm in some environments
    const confirmed = window.confirm("Clear all your ancient wisdom history?");
    if (confirmed) {
      setMessages([]);
      localStorage.removeItem('chat-history');
      // Optional: Refresh or redirect to chat
      setActiveTab('chat');
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const completeOnboarding = () => {
    localStorage.setItem('onboarded', 'true');
    setShowOnboarding(false);
  };

  const promptChips = [
    { label: "Identify Tulsi leaf 🌿", value: "How do I identify a Tulsi leaf and what are its uses?" },
    { label: "Balance my Doshas ⚖️", value: "I feel very anxious and cold. Which Dosha is imbalanced?" },
    { label: "Sleep remedy 🌙", value: "What is a natural Ayurvedic remedy for better sleep?" },
    { label: "Agni & Digestion 🔥", value: "How can I improve my digestive fire or 'Agni'?" }
  ];

  return (
    <div className="flex h-screen bg-parchment font-sans text-emerald-950 overflow-hidden">
      
      {/* Sidebar - History/Categories */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-72 bg-sage-900 text-sage-50 transition-transform duration-300 transform lg:relative lg:translate-x-0",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full p-6">
          <div className="flex items-center gap-3 mb-10">
            <div className="p-2 bg-emerald-500 rounded-xl shadow-lg shadow-emerald-500/20">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">Ayurvedic Sage</h1>
          </div>

          <div className="space-y-2 mb-10">
            <button 
              onClick={() => {setActiveTab('chat'); setIsSidebarOpen(false);}}
              className={cn(
                "w-full flex items-center gap-3 p-3 rounded-2xl text-sm font-medium transition-all",
                activeTab === 'chat' ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "text-sage-300 hover:bg-sage-800"
              )}
            >
              <MessageSquare className="w-4 h-4" /> Journey Chat
            </button>
            <button 
              onClick={() => {setActiveTab('dashboard'); setIsSidebarOpen(false);}}
              className={cn(
                "w-full flex items-center gap-3 p-3 rounded-2xl text-sm font-medium transition-all",
                activeTab === 'dashboard' ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "text-sage-300 hover:bg-sage-800"
              )}
            >
              <LayoutDashboard className="w-4 h-4" /> Wellness Sanctuary
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto space-y-4">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-sage-400 mb-2">
              <span>Recent Journeys</span>
              <History className="w-3 h-3" />
            </div>
            
            {messages.length === 0 ? (
              <p className="text-sm text-sage-500 italic">No history yet...</p>
            ) : (
                <div className="space-y-2">
                    {messages.filter(m => m.role === 'user').slice(-5).map((m) => (
                        <button 
                            key={m.id}
                            className="w-full text-left p-2 rounded-lg text-sm truncate hover:bg-sage-800 transition-colors"
                            onClick={() => {setActiveTab('chat'); setIsSidebarOpen(false);}}
                        >
                            {m.content}
                        </button>
                    ))}
                </div>
            )}
          </nav>

          <div className="pt-6 border-t border-sage-800 space-y-2">
            <button 
                onClick={clearChat}
                className="flex items-center gap-3 w-full p-2 text-sm text-sage-300 hover:text-white transition-colors"
            >
              <Trash2 className="w-4 h-4" /> Clear History
            </button>
            <button className="flex items-center gap-3 w-full p-2 text-sm text-sage-300 hover:text-white transition-colors">
              <Info className="w-4 h-4" /> About the Sage
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative bg-parchment min-w-0">
        
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-6 border-b border-sage-100 bg-white/50 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-sage-50 rounded-lg lg:hidden"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-gold-500" />
              <span className="font-semibold text-sage-800 sm:block hidden">
                {activeTab === 'chat' ? 'Ancient Intelligence' : 'Dashboard Analytics'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
             <div className="text-right hidden sm:block">
               <p className="text-xs font-medium text-sage-600">Sage Level</p>
               <p className="text-xs text-sage-400">Master Advisor</p>
             </div>
             <div className="w-10 h-10 rounded-full bg-sage-100 flex items-center justify-center border-2 border-sage-200 overflow-hidden">
                <img src={`https://ui-avatars.com/api/?name=${activeTab === 'chat' ? 'Ayurvedic+Sage' : 'Wellness'}&background=064e3b&color=fff`} alt="Sage" />
             </div>
          </div>
        </header>

        {activeTab === 'chat' ? (
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-8 scroll-smooth">
              {messages.length === 0 ? (
                <div className="max-w-3xl mx-auto h-full flex flex-col items-center justify-center text-center space-y-8 mt-20">
                   <motion.div 
                     initial={{ scale: 0.8, opacity: 0 }}
                     animate={{ scale: 1, opacity: 1 }}
                     className="w-24 h-24 bg-sage-50 rounded-full flex items-center justify-center shadow-inner"
                   >
                     <Leaf className="w-12 h-12 text-sage-600" />
                   </motion.div>
                   <div className="space-y-4">
                     <h2 className="text-3xl font-bold font-serif text-sage-900">Welcome to the Sage's Arbor</h2>
                     <p className="text-sage-600 max-w-md mx-auto">
                       Ask about herbal remedies, identify medicinal plants, or seek balance for your mind and body.
                     </p>
                     <button 
                        onClick={() => setActiveTab('dashboard')}
                        className="flex items-center gap-2 px-6 py-3 bg-white border border-emerald-200 text-emerald-700 rounded-2xl hover:bg-emerald-50 transition-all font-semibold shadow-sm mx-auto mt-4"
                     >
                        <LayoutDashboard className="w-4 h-4" /> Go to Wellness Sanctuary
                     </button>
                   </div>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl w-full">
                      {promptChips.map((chip, i) => (
                        <motion.button
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          onClick={() => handleSendMessage(chip.value)}
                          className="p-4 text-left rounded-2xl bg-white border border-sage-100 shadow-sm hover:border-emerald-300 hover:shadow-md transition-all group"
                        >
                          <span className="block text-sm font-medium text-sage-800 group-hover:text-emerald-700">{chip.label}</span>
                          <span className="text-xs text-sage-400 line-clamp-1">{chip.value}</span>
                        </motion.button>
                      ))}
                   </div>
                </div>
              ) : (
                <div className="max-w-3xl mx-auto space-y-6">
                  {messages.map((msg, idx) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={cn(
                        "flex w-full",
                        msg.role === 'user' ? "justify-end" : "justify-start"
                      )}
                    >
                      <div className={cn(
                        "group relative max-w-[85%] rounded-3xl p-4 shadow-sm",
                        msg.role === 'user' 
                          ? "bg-sage-900 text-white rounded-tr-none text-right" 
                          : "bg-white border border-sage-100 text-emerald-950 rounded-tl-none"
                      )}>
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                        <div className={cn(
                            "mt-2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity",
                            msg.role === 'user' ? "flex-row-reverse text-left" : "flex-row"
                        )}>
                            <span className="text-[10px] text-sage-400">{msg.timestamp}</span>
                            <div className="flex gap-2">
                                 <button 
                                    onClick={() => copyToClipboard(msg.content)}
                                    className="p-1 hover:bg-sage-100 rounded text-sage-400 transition-colors"
                                 >
                                    <Copy className="w-3 h-3" />
                                 </button>
                            </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-white border border-sage-100 rounded-3xl rounded-tl-none p-4 w-64 shadow-sm">
                        <div className="flex gap-2 mb-2">
                          <div className="w-2 h-2 bg-sage-200 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <div className="w-2 h-2 bg-sage-300 rounded-full animate-bounce" style={{ animationDelay: '200ms' }} />
                          <div className="w-2 h-2 bg-sage-400 rounded-full animate-bounce" style={{ animationDelay: '400ms' }} />
                        </div>
                        <div className="space-y-2">
                          <div className="h-3 w-full bg-sage-50 rounded-full shimmer" />
                          <div className="h-3 w-3/4 bg-sage-50 rounded-full shimmer" />
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 sm:p-8 pt-0 bg-gradient-to-t from-parchment via-parchment to-transparent">
              <div className="max-w-3xl mx-auto">
                <div className="relative group">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder={isLoading ? "The Sage is contemplating..." : "Seek ancient wisdom here..."}
                    disabled={isLoading}
                    className="w-full p-4 pr-16 rounded-2xl border border-sage-200 bg-white/70 backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 shadow-premium transition-all disabled:opacity-50"
                  />
                  <button
                    onClick={() => handleSendMessage()}
                    disabled={!input.trim() || isLoading}
                    className="absolute right-3 top-3 p-2 bg-sage-900 text-white rounded-xl hover:bg-sage-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-emerald-900/10"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-[10px] text-center text-sage-400 mt-3 px-4">
                  Ayurvedic guidance is for knowledge only. Consult a Vaidya (doctor) for serious medical concerns.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <Dashboard messages={messages} />
        )}

        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
            {isSidebarOpen && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsSidebarOpen(false)}
                    className="fixed inset-0 bg-emerald-950/20 backdrop-blur-sm z-40 lg:hidden"
                />
            )}
        </AnimatePresence>
      </main>

      {/* Onboarding Modal */}
      <AnimatePresence>
        {showOnboarding && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-sage-950/40 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="max-w-lg w-full bg-white rounded-[32px] p-8 sm:p-12 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 text-gold-500/10">
                <Sparkles className="w-32 h-32 rotate-12" />
              </div>
              
              <div className="relative z-10 space-y-8">
                <div className="flex justify-center">
                  <div className="w-20 h-20 bg-emerald-50 rounded-3xl flex items-center justify-center border-b-4 border-emerald-100">
                    <Leaf className="w-10 h-10 text-emerald-600" />
                  </div>
                </div>
                
                <div className="text-center space-y-4">
                  <h2 className="text-3xl font-bold font-serif text-sage-900">Step Into Balance</h2>
                  <p className="text-sage-600 leading-relaxed">
                    Welcome to your personal sanctuary of ancient wisdom. I am here to guide you through the healing herbs and holistic rituals of Ayurveda.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex gap-4 p-4 rounded-2xl bg-sage-50/50">
                    <Check className="w-5 h-5 text-emerald-600 mt-1 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-sage-900">Identify Plants</p>
                      <p className="text-xs text-sage-500">Discover properties of Tulsi, Ashwagandha, and more.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 p-4 rounded-2xl bg-sage-50/50">
                    <Sparkles className="w-5 h-5 text-emerald-600 mt-1 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-sage-900">Holistic Counsel</p>
                      <p className="text-xs text-sage-500">Guidance based on Doshas and Prakriti.</p>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={completeOnboarding}
                  className="w-full py-4 bg-sage-900 text-white rounded-2xl font-bold hover:bg-sage-800 transition-all flex items-center justify-center gap-2 group shadow-xl shadow-emerald-900/20"
                >
                  Begin Journey <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
