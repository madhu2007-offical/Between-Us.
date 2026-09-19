import React, { useState } from 'react';
import { BookOpen, Calculator, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CamouflageView: React.FC = () => {
  const { setCamouflageActive } = useApp();
  const [calcInput, setCalcInput] = useState('125 * 4');
  const [calcResult, setCalcResult] = useState('500');

  const handleCalc = (val: string) => {
    if (val === 'C') {
      setCalcInput('');
      setCalcResult('0');
    } else if (val === '=') {
      try {
        // Safe evaluation of simple math
        const sanitized = calcInput.replace(/[^0-9+\-*/.]/g, '');
        // eslint-disable-next-line no-eval
        const res = Function(`'use strict'; return (${sanitized})`)();
        setCalcResult(String(res));
      } catch (e) {
        setCalcResult('Error');
      }
    } else {
      setCalcInput(prev => prev + val);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-white text-gray-900 flex flex-col font-mono p-4 overflow-y-auto">
      {/* Harmless Header */}
      <div className="flex items-center justify-between border-b pb-3 mb-4">
        <div className="flex items-center space-x-2">
          <BookOpen size={18} className="text-blue-600" />
          <span className="font-sans font-bold text-sm tracking-wide text-gray-800">
            Class 9 & 10 Science Revision Notes
          </span>
        </div>

        {/* Discreet Return Button */}
        <button
          onClick={() => setCamouflageActive(false)}
          className="flex items-center space-x-1 text-xs font-sans text-gray-500 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-md active:scale-95 transition-all"
        >
          <ArrowLeft size={14} />
          <span>Exit Notes</span>
        </button>
      </div>

      <div className="flex-1 space-y-4 font-sans text-sm text-gray-700">
        {/* Revision card */}
        <div className="p-3 bg-blue-50/60 border border-blue-100 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-1 flex items-center">
            <CheckCircle2 size={15} className="mr-1 text-blue-600" />
            Chapter 6: Life Processes & Cell Energy
          </h4>
          <p className="text-xs text-gray-600 leading-relaxed">
            Photosynthesis converts carbon dioxide and water into glucose using chlorophyll and sunlight. Mitochondria generate ATP for cellular activities.
          </p>
        </div>

        {/* Real functioning decoy calculator */}
        <div className="border rounded-xl p-3 bg-gray-50 shadow-sm max-w-xs mx-auto w-full">
          <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
            <span className="flex items-center"><Calculator size={13} className="mr-1" /> Scientific Calculator</span>
            <span>DEG</span>
          </div>

          <div className="bg-white border rounded p-2 text-right mb-3 min-h-[52px] flex flex-col justify-center">
            <div className="text-xs text-gray-400">{calcInput || '0'}</div>
            <div className="text-xl font-bold text-gray-800">{calcResult}</div>
          </div>

          <div className="grid grid-cols-4 gap-1.5 font-mono text-sm">
            {['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', 'C', '0', '=', '+'].map((btn) => (
              <button
                key={btn}
                onClick={() => handleCalc(btn)}
                className={`py-2 rounded font-semibold text-center active:bg-gray-300 transition-colors ${
                  btn === '=' ? 'bg-blue-600 text-white' : btn === 'C' ? 'bg-red-100 text-red-700' : 'bg-white border text-gray-800'
                }`}
              >
                {btn}
              </button>
            ))}
          </div>
        </div>

        {/* Harmless Homework Checklist */}
        <div className="border rounded-lg p-3 bg-white">
          <h5 className="font-semibold text-xs text-gray-700 uppercase tracking-wider mb-2">
            Assignments Due This Week
          </h5>
          <ul className="text-xs text-gray-600 space-y-1.5">
            <li className="flex items-center"><input type="checkbox" defaultChecked className="mr-2 rounded" /> Math Ex 4.2 Quadratic Equations</li>
            <li className="flex items-center"><input type="checkbox" defaultChecked className="mr-2 rounded" /> English Essay: "My Favorite Journey"</li>
            <li className="flex items-center"><input type="checkbox" className="mr-2 rounded" /> Chemistry periodic table flashcards</li>
          </ul>
        </div>
      </div>

      {/* Touch footer to return */}
      <div className="mt-4 pt-3 border-t text-center">
        <button
          onClick={() => setCamouflageActive(false)}
          className="text-xs text-gray-400 hover:text-gray-600 py-2 px-4"
        >
          Tap here to return to Between Us
        </button>
      </div>
    </div>
  );
};
