import { useState, useRef, useEffect } from 'react';
import { useStore } from '@/store/useStore';
import { motion } from 'framer-motion';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AIChat() {
  const { chatHistory, addChatMessage } = useStore();
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatHistory, isTyping]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      role: 'user' as const,
      content: input,
      timestamp: Date.now(),
    };

    addChatMessage(userMessage);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botMessage = {
        role: 'assistant' as const,
        content: getSimulatedResponse(input),
        timestamp: Date.now(),
      };
      addChatMessage(botMessage);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="h-screen bg-background flex flex-col pt-20">
      <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 custom-scrollbar" ref={scrollRef}>
        <div className="max-w-4xl mx-auto space-y-6">
          {chatHistory.length === 0 && (
            <div className="text-center py-20">
              <Sparkles className="size-16 text-neon-cyan mx-auto mb-6 opacity-50" />
              <h2 className="text-3xl font-bebas-neue text-white mb-2">Your AI Coach is Ready</h2>
              <p className="text-neutral-500">Ask about strategies, settings, or rank goals.</p>
            </div>
          )}
          
          {chatHistory.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "flex gap-4 max-w-[80%]",
                msg.role === 'user' ? "ml-auto flex-row-reverse" : ""
              )}
            >
              <div className={cn(
                "size-10 rounded-full flex items-center justify-center shrink-0",
                msg.role === 'user' ? "bg-neon-violet" : "bg-neon-cyan"
              )}>
                {msg.role === 'user' ? <User size={20} className="text-black" /> : <Bot size={20} className="text-black" />}
              </div>
              <div className={cn(
                "p-4 rounded-2xl text-sm leading-relaxed",
                msg.role === 'user' ? "bg-neon-violet/10 text-white border border-neon-violet/20" : "bg-white/5 text-neutral-300 border border-white/10"
              )}>
                {msg.content}
              </div>
            </motion.div>
          ))}

          {isTyping && (
            <div className="flex gap-4 max-w-[80%]">
              <div className="size-10 rounded-full bg-neon-cyan flex items-center justify-center shrink-0">
                <Bot size={20} className="text-black" />
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex gap-1">
                <span className="w-1.5 h-1.5 bg-neon-cyan rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-neon-cyan rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 bg-neon-cyan rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 md:p-8 bg-neutral-900/50 backdrop-blur-xl border-t border-white/10">
        <form onSubmit={handleSend} className="max-w-4xl mx-auto relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question..."
            className="w-full bg-black border border-white/10 rounded-full py-4 px-6 pr-16 text-white focus:outline-none focus:border-neon-cyan transition-colors"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 size-12 bg-neon-cyan rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all text-black"
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}

function getSimulatedResponse(input: string): string {
  const i = input.toLowerCase();
  if (i.includes('valorant')) return "For Valorant, I recommend focusing on your 'Deadzone' shooting. Try counter-strafing in the practice range for 15 minutes before your first match.";
  if (i.includes('aim')) return "Improving aim is 30% hardware and 70% routine. Make sure your mouse acceleration is OFF in Windows settings, and check out our Rank Planner for a daily aim routine.";
  if (i.includes('hello') || i.includes('hi')) return "Hello! I'm your ProGamerX AI Coach. What game are we focusing on today?";
  return "That's a great question. Based on current meta trends, I'd suggest reviewing your recent positioning. Would you like a specific drill for that?";
}
