import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, ShieldCheck, Heart, Copy, Check, MessageCircleHeart } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ChatBubble } from './ChatBubble';

export const AskTab: React.FC = () => {
  const { chatHistory, sendChatMessage, isChatLoading } = useApp();
  const [inputText, setInputText] = useState('');
  const [activeCategory, setActiveCategory] = useState<'popular' | 'cramps' | 'basics' | 'school' | 'talk'>('popular');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const categories = [
    { id: 'popular', label: '🌸 Common Questions' },
    { id: 'cramps', label: '🍵 Cramp Relief' },
    { id: 'basics', label: '🩸 Period Basics' },
    { id: 'school', label: '🎒 School Emergencies' },
    { id: 'talk', label: '💬 Talking to Adults' },
  ] as const;

  const questionChipsByCategory = {
    popular: [
      { label: 'Why is period blood brown?', query: 'Why is my period blood brown or dark?' },
      { label: 'What is PCOS in simple terms?', query: 'What is PCOS in simple words?' },
      { label: 'What helps bad cramps fast?', query: 'What natural home remedies help cramps fast?' },
      { label: 'Skipped 2 months, am I okay?', query: 'Is it normal to skip 2 or 3 months?' }
    ],
    cramps: [
      { label: 'Hot water bag tips', query: 'What natural home remedies help cramps fast?' },
      { label: 'Can I take medicine for cramps?', query: 'Can I take painkiller medicine for cramps?' },
      { label: 'Why does lower back ache?', query: 'Why does my lower back and inner thighs ache so much during my period?' },
      { label: 'Does cold water make cramps worse?', query: 'Can drinking cold water or eating curd / ice cream worsen period cramps?' }
    ],
    basics: [
      { label: 'First period what to expect', query: 'What does a first period look like? Will it be a sudden flood of blood?' },
      { label: 'Are blood clots dangerous?', query: 'I noticed small jelly-like clumps in my pad. Are blood clots dangerous?' },
      { label: 'How often to change pads?', query: 'How often should I change my sanitary pad?' },
      { label: 'White discharge in underwear', query: 'What is this white or clear stuff in my underwear? Is it an infection?' }
    ],
    school: [
      { label: 'Emergency: no pad at school!', query: 'My period started unexpectedly at school and I don’t have a pad! What do I do?' },
      { label: 'Blood stain on uniform', query: 'There is a blood stain on my school uniform or pants. How do I hide and clean it?' },
      { label: 'What to pack in school pouch', query: 'What should I pack in an emergency period kit for my school bag?' }
    ],
    talk: [
      { label: 'How do I tell my mom?', query: 'How do I talk to my mom or an elder sister about my period or cramps without feeling awkward?' },
      { label: 'What happens at a doctor checkup?', query: 'What happens at a doctor appointment for PCOS? Will it be painful or scary?' },
      { label: 'Can irregular periods stop babies?', query: 'If I have irregular periods or a PCOS pattern, does it mean I can never have children in the future?' }
    ]
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, isChatLoading]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || isChatLoading) return;
    const text = inputText;
    setInputText('');
    await sendChatMessage(text);
  };

  const handleChipClick = async (query: string) => {
    if (isChatLoading) return;
    await sendChatMessage(query);
  };

  // Find index of the most recent sister message to enable the real-time typewriter effect on it
  let lastSisterIdx = -1;
  for (let i = chatHistory.length - 1; i >= 0; i--) {
    if (chatHistory[i].sender === 'sister') {
      lastSisterIdx = i;
      break;
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-125px)] max-w-md mx-auto px-3.5 pt-2 font-sans select-none">
      {/* Friendly Reassurance Strip */}
      <div className="bg-[#FAF7F5] border border-cream-200 rounded-2xl px-3.5 py-2 flex items-center justify-between text-xs text-ink shrink-0 mb-2 shadow-xs">
        <div className="flex items-center space-x-2 font-semibold">
          <span className="text-base">🌸</span>
          <span className="text-[12px]">Ask your older sister anything without feeling shy</span>
        </div>
        <span className="text-[10px] text-violet-primary font-bold bg-violet-50 px-2 py-0.5 rounded-full">
          Private
        </span>
      </div>

      {/* User-Friendly Category Selector */}
      <div className="shrink-0 mb-1 overflow-x-auto no-scrollbar py-1">
        <div className="flex space-x-1.5">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`text-[11px] font-bold whitespace-nowrap px-3 py-1.5 rounded-full transition-all active:scale-95 ${
                activeCategory === cat.id
                  ? 'bg-violet-primary text-white shadow-soft'
                  : 'bg-white/80 text-ink/70 hover:bg-white border border-cream-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* 1-Tap Quick Question Chips for Active Category */}
      <div className="shrink-0 mb-2 overflow-x-auto no-scrollbar py-1">
        <div className="flex space-x-2">
          {questionChipsByCategory[activeCategory].map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleChipClick(chip.query)}
              disabled={isChatLoading}
              className="text-xs whitespace-nowrap bg-white hover:bg-cream-50 active:scale-95 text-ink font-bold px-3.5 py-2 rounded-full border border-cream-200 shadow-soft transition-all disabled:opacity-50 flex items-center space-x-1.5"
            >
              <span>💬</span>
              <span>{chip.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Message List */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-1">
        {chatHistory.map((msg, idx) => (
          <ChatBubble
            key={msg.id}
            message={msg}
            isLatestSisterMessage={idx === lastSisterIdx && lastSisterIdx > 0}
          />
        ))}

        {isChatLoading && (
          <div className="flex justify-start my-2 animate-in fade-in duration-200">
            <div className="bg-white/95 border border-cream-200 rounded-3xl rounded-bl-none p-3.5 shadow-soft flex items-center space-x-3 text-xs text-ink font-semibold">
              <span className="flex space-x-1">
                <span className="w-2 h-2 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 rounded-full bg-coral-primary animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 rounded-full bg-violet-primary animate-bounce" style={{ animationDelay: '300ms' }} />
              </span>
              <span>Sister is typing an answer for you...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Clean Mobile Input Bar */}
      <form onSubmit={handleSend} className="shrink-0 mt-2 mb-1">
        <div className="relative flex items-center bg-white border border-cream-300 rounded-full shadow-float focus-within:border-violet-primary focus-within:ring-2 focus-within:ring-violet-primary/20 transition-all p-1">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask anything... e.g. 'Why do cramps hurt?'"
            disabled={isChatLoading}
            className="w-full py-2.5 pl-4 pr-12 text-xs sm:text-sm bg-transparent outline-none text-ink placeholder-ink/40 font-medium"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isChatLoading}
            className="w-9 h-9 rounded-full bg-violet-primary hover:bg-violet-600 active:scale-95 disabled:bg-cream-200 disabled:text-ink/30 text-white flex items-center justify-center transition-all shadow-sm shrink-0"
            aria-label="Send message"
          >
            <Send size={15} />
          </button>
        </div>
        <div className="text-[10px] text-center text-ink/50 mt-1 font-medium">
          🔒 Completely private • No accounts, no data leaves this phone
        </div>
      </form>
    </div>
  );
};
