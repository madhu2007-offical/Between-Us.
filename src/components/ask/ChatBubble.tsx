import React, { useState, useEffect } from 'react';
import { Heart, Stethoscope, BookOpen, FastForward, Copy, Check } from 'lucide-react';
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
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (!isSister || !isLatestSisterMessage) {
      setDisplayedText(message.text);
      setIsTyping(false);
      return;
    }

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
    }, 40);

    return () => clearInterval(interval);
  }, [message.text, isSister, isLatestSisterMessage]);

  const handleSkipTyping = () => {
    setDisplayedText(message.text);
    setIsTyping(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(message.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
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
        {/* Message Bubble */}
        <div
          onClick={isTyping ? handleSkipTyping : undefined}
          className={`relative rounded-[26px] p-4 text-xs sm:text-sm leading-relaxed transition-all ${
            isUser
              ? 'bg-violet-primary text-white rounded-br-none shadow-soft font-medium'
              : 'bg-white text-ink border border-cream-200 rounded-bl-none shadow-soft font-normal'
          } ${isTyping ? 'cursor-pointer' : ''}`}
        >
          {/* Sister Header */}
          {!isUser && (
            <div className="flex items-center justify-between space-x-1.5 mb-2 pb-1.5 border-b border-cream-100 text-[11px] font-bold text-ink">
              <div className="flex items-center space-x-1.5">
                <span className="w-5 h-5 rounded-full bg-violet-100 text-violet-primary flex items-center justify-center text-[10px]">
                  🌸
                </span>
                <span>Between Us Sister</span>
              </div>

              {isTyping ? (
                <span className="text-[10px] text-coral-primary flex items-center space-x-1 font-semibold animate-pulse">
                  <span>typing</span>
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-coral-primary animate-bounce" />
                </span>
              ) : (
                <span className="text-[9px] bg-cream-50 text-ink/70 px-2 py-0.5 rounded-full font-bold border border-cream-200">
                  {message.source === 'gemini_grounded' ? 'AI Grounded' : 'Vetted Notes'}
                </span>
              )}
            </div>
          )}

          {/* Text Content */}
          <div className="whitespace-pre-line font-medium leading-relaxed">
            {displayedText}
            {isTyping && (
              <span className="inline-block w-1.5 h-4 ml-1 bg-coral-primary animate-pulse align-middle rounded-full" />
            )}
          </div>

          {/* Skip hint */}
          {isTyping && (
            <div className="mt-2 text-[10px] text-coral-600 flex items-center space-x-1 font-bold">
              <FastForward size={11} />
              <span>Tap bubble to read immediately</span>
            </div>
          )}

          {/* Key Takeaway Chip */}
          {!isTyping && message.keyTakeaway && (
            <div className="mt-3 p-2.5 bg-coral-50 border border-coral-200/80 rounded-2xl text-[11px] text-ink flex items-start space-x-2 animate-in fade-in duration-300">
              <Heart size={13} className="text-coral-primary shrink-0 mt-0.5 fill-coral-primary" />
              <span><strong>Quick Takeaway:</strong> {message.keyTakeaway}</span>
            </div>
          )}

          {/* Doctor Note */}
          {!isTyping && message.doctorAdvice && (
            <div className="mt-2 p-2.5 bg-amber-50 border border-amber-200 rounded-2xl text-[11px] text-amber-950 flex items-start space-x-2 animate-in fade-in duration-300">
              <Stethoscope size={13} className="text-safety-amber shrink-0 mt-0.5" />
              <span><strong>Doctor Note:</strong> {message.doctorAdvice}</span>
            </div>
          )}

          {/* Footer Controls: Timestamp, Copy, and Reaction */}
          {!isTyping && !isUser && (
            <div className="mt-2.5 pt-2 border-t border-cream-100 flex items-center justify-between text-[10px] text-ink/50">
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleCopy}
                  className="flex items-center space-x-1 text-ink/60 hover:text-ink transition-colors font-semibold"
                >
                  {copied ? <Check size={11} className="text-sage-700" /> : <Copy size={11} />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>

                <button
                  onClick={() => setLiked(!liked)}
                  className={`flex items-center space-x-1 transition-colors font-semibold ${
                    liked ? 'text-coral-primary' : 'text-ink/60 hover:text-coral-primary'
                  }`}
                >
                  <Heart size={11} className={liked ? 'fill-coral-primary' : ''} />
                  <span>{liked ? 'Helpful 🌸' : 'Helpful?'}</span>
                </button>
              </div>

              <span>
                {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          )}

          {isUser && (
            <div className="text-[10px] mt-1.5 text-right text-white/75 font-medium">
              {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          )}
        </div>

        {/* Citations Snippet */}
        {!isTyping && message.citations && message.citations.length > 0 && (
          <div className="flex items-center space-x-1 text-[10px] text-ink/50 pl-2">
            <BookOpen size={11} className="text-violet-primary" />
            <span>Verified from: {message.citations.map(c => c.question).slice(0, 1).join(', ')}</span>
          </div>
        )}
      </div>
    </div>
  );
};
