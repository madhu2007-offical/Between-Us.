import React, { useState, useEffect } from 'react';
import { Sparkles, Stethoscope, BookOpen, Heart, FastForward } from 'lucide-react';
import { ChatMessage } from '../../types';
import { SafetyCard } from './SafetyCard';

interface ChatBubbleProps {
  message: ChatMessage;
  isLatestSisterMessage?: boolean;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ message, isLatestSisterMessage = false }) => {
  const isUser = message.sender === 'user';
  const isSister = message.sender === 'sister';

  // Real-time typewriter effect for latest sister message
  const [displayedText, setDisplayedText] = useState(
    isSister && isLatestSisterMessage ? '' : message.text
  );
  const [isTyping, setIsTyping] = useState(
    isSister && isLatestSisterMessage
  );

  useEffect(() => {
    if (!isSister || !isLatestSisterMessage) {
      setDisplayedText(message.text);
      setIsTyping(false);
      return;
    }

    // Split into words for natural typing rhythm
    const words = message.text.split(' ');
    let currentWordIndex = 0;
    setDisplayedText('');
    setIsTyping(true);

    const interval = setInterval(() => {
      if (currentWordIndex < words.length) {
        setDisplayedText(prev => (prev ? prev + ' ' : '') + words[currentWordIndex]);
        currentWordIndex++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 45); // 45ms per word feels natural and brisk

    return () => clearInterval(interval);
  }, [message.text, isSister, isLatestSisterMessage]);

  const handleSkipTyping = () => {
    setDisplayedText(message.text);
    setIsTyping(false);
  };

  if (message.type === 'safety_card' && message.safetyData) {
    return (
      <div className="flex justify-start my-2">
        <SafetyCard safetyData={message.safetyData} />
      </div>
    );
  }

  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} my-2`}>
      <div className={`max-w-[88%] space-y-1.5 ${isUser ? 'items-end' : 'items-start'}`}>
        {/* Main Message Bubble */}
        <div
          onClick={isTyping ? handleSkipTyping : undefined}
          className={`relative rounded-3xl p-4 text-xs sm:text-sm leading-relaxed transition-all ${
            isUser
              ? 'bg-gradient-to-br from-plum-800 to-plum-900 text-cream-50 rounded-br-none shadow-soft'
              : 'bg-white/95 backdrop-blur-sm text-plum-950 border border-blush-200/80 rounded-bl-none shadow-soft hover:border-blush-300'
          } ${isTyping ? 'cursor-pointer' : ''}`}
        >
          {/* Sister Header */}
          {!isUser && (
            <div className="flex items-center justify-between space-x-1.5 mb-2 pb-1.5 border-b border-blush-100 text-[11px] font-bold text-plum-800">
              <div className="flex items-center space-x-1.5">
                <span className="w-5 h-5 rounded-full bg-blush-100 text-blush-500 flex items-center justify-center text-[10px]">
                  🌸
                </span>
                <span>Between Us Sister</span>
              </div>

              {isTyping ? (
                <span className="text-[10px] text-blush-500 flex items-center space-x-1 animate-pulse font-medium">
                  <span>typing</span>
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-blush-400 animate-bounce" />
                </span>
              ) : (
                <span className="text-[9px] bg-blush-50 text-plum-600 px-2 py-0.5 rounded-full font-semibold border border-blush-100">
                  {message.source === 'gemini_grounded' ? 'AI Sister' : 'Vetted Library'}
                </span>
              )}
            </div>
          )}

          {/* Text Content with Real-time typewriter */}
          <div className="whitespace-pre-line font-medium leading-relaxed">
            {displayedText}
            {isTyping && (
              <span className="inline-block w-1.5 h-4 ml-1 bg-blush-400 animate-pulse align-middle rounded-full" />
            )}
          </div>

          {/* Skip button hint if typing */}
          {isTyping && (
            <div className="mt-2 text-[10px] text-dustyrose-400 flex items-center space-x-1 font-semibold">
              <FastForward size={11} />
              <span>Tap bubble to show full answer</span>
            </div>
          )}

          {/* Key Takeaway Chip (appears when finished typing) */}
          {!isTyping && message.keyTakeaway && (
            <div className="mt-3 p-2.5 bg-blush-50/80 border border-blush-200/80 rounded-2xl text-[11px] text-plum-900 flex items-start space-x-2 animate-in fade-in duration-300">
              <Heart size={13} className="text-blush-500 shrink-0 mt-0.5 fill-blush-400" />
              <span><strong>Quick Takeaway:</strong> {message.keyTakeaway}</span>
            </div>
          )}

          {/* Doctor Note */}
          {!isTyping && message.doctorAdvice && (
            <div className="mt-2 p-2.5 bg-amber-50/90 border border-amber-200/80 rounded-2xl text-[11px] text-amber-900 flex items-start space-x-2 animate-in fade-in duration-300">
              <Stethoscope size={13} className="text-amber-700 shrink-0 mt-0.5" />
              <span><strong>Doctor Note:</strong> {message.doctorAdvice}</span>
            </div>
          )}

          {/* Timestamp */}
          <div className={`text-[10px] mt-2 text-right ${isUser ? 'text-dustyrose-200' : 'text-plum-400'}`}>
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>

        {/* Citations Snippets for transparency */}
        {!isTyping && message.citations && message.citations.length > 0 && (
          <div className="flex items-center space-x-1 text-[10px] text-plum-600 pl-2">
            <BookOpen size={11} className="text-dustyrose-400" />
            <span>Verified from: {message.citations.map(c => c.question).slice(0, 1).join(', ')}</span>
          </div>
        )}
      </div>
    </div>
  );
};
