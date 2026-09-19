import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, ShieldCheck, Heart, MessageCircleHeart } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ChatBubble } from './ChatBubble';

export const AskTab: React.FC = () => {
  const { chatHistory, sendChatMessage, isChatLoading } = useApp();
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const visualSuggestedChips = [
    { icon: '🩸', label: 'Brown blood normal?' },
    { icon: '🍵', label: 'Fast cramp relief' },
    { icon: '🌸', label: 'What is PCOS?' },
    { icon: '🏫', label: 'School pad emergency' },
    { icon: '📅', label: 'Skipped 2 months?' },
    { icon: '💊', label: 'Safe cramp medicine' }
  ];

  const chipToQueryMap: Record<string, string> = {
    'Brown blood normal?': 'Why is my period blood brown or dark?',
    'Fast cramp relief': 'What natural home remedies help cramps fast?',
    'What is PCOS?': 'What is PCOS in simple words?',
    'School pad emergency': 'Period started unexpectedly at school! What do I do?',
    'Skipped 2 months?': 'Is it normal to skip 2 or 3 months?',
    'Safe cramp medicine': 'Can I take painkiller medicine for cramps?'
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

  const handleChipClick = async (chipLabel: string) => {
    if (isChatLoading) return;
    const fullQuery = chipToQueryMap[chipLabel] || chipLabel;
    await sendChatMessage(fullQuery);
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
    <div className="flex flex-col h-[calc(100vh-125px)] max-w-md mx-auto px-3 pt-2">
      {/* Delicate Privacy Badge */}
      <div className="bg-blush-50/90 border border-blush-200/80 rounded-2xl px-3.5 py-1.5 flex items-center justify-between text-[11px] text-plum-800 shrink-0 mb-2 shadow-sm">
        <div className="flex items-center space-x-1.5 font-semibold">
          <span className="text-blush-500">🌸</span>
          <span>Sister Q&A • Completely Private & Safe</span>
        </div>
        <span className="text-[10px] text-dustyrose-500 font-bold">100% Offline/On-Phone</span>
      </div>

      {/* Visual Suggestion Chips (Card pills with cute icons) */}
      <div className="shrink-0 mb-2 overflow-x-auto no-scrollbar py-1">
        <div className="flex space-x-2">
          {visualSuggestedChips.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleChipClick(chip.label)}
              disabled={isChatLoading}
              className="text-xs whitespace-nowrap bg-white hover:bg-blush-50 active:scale-95 text-plum-900 font-bold px-3 py-1.5 rounded-full border border-blush-200 shadow-soft transition-all disabled:opacity-50 flex items-center space-x-1.5"
            >
              <span className="text-sm">{chip.icon}</span>
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
            <div className="bg-white/95 border border-blush-200 rounded-3xl rounded-bl-none p-3.5 shadow-soft flex items-center space-x-3 text-xs text-plum-800 font-semibold">
              <span className="flex space-x-1">
                <span className="w-2 h-2 rounded-full bg-blush-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 rounded-full bg-blush-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 rounded-full bg-blush-600 animate-bounce" style={{ animationDelay: '300ms' }} />
              </span>
              <span>Sister is typing...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* WhatsApp-style Input Bar */}
      <form onSubmit={handleSend} className="shrink-0 mt-2 mb-1">
        <div className="relative flex items-center bg-white border border-blush-200 rounded-full shadow-float focus-within:border-blush-400 focus-within:ring-2 focus-within:ring-blush-100 transition-all p-1">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask your big sister anything..."
            disabled={isChatLoading}
            className="w-full py-2.5 pl-4 pr-12 text-xs sm:text-sm bg-transparent outline-none text-plum-950 placeholder-plum-300 font-medium"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isChatLoading}
            className="w-9 h-9 rounded-full bg-plum-800 hover:bg-plum-900 active:scale-95 disabled:bg-cream-200 disabled:text-cream-400 text-cream-50 flex items-center justify-center transition-all shadow-sm shrink-0"
            aria-label="Send message"
          >
            <Send size={15} />
          </button>
        </div>
      </form>
    </div>
  );
};
