
import React from 'react';

interface CodeEditorProps {
  code: string;
  onChange: (val: string) => void;
  isExecuting: boolean;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, onChange, isExecuting }) => {
  const lineCount = code.split('\n').length;

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] rounded-xl overflow-hidden border-2 border-slate-700 shadow-lg">
      <div className="flex items-center gap-2 px-4 py-2 bg-[#2d2d2d] border-b border-slate-700">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <span className="text-xs font-mono text-slate-400 ml-2">byte_controller.py</span>
      </div>
      
      <div className="flex flex-1 overflow-auto">
        <div className="w-12 bg-[#1e1e1e] text-slate-600 text-right pr-3 pt-4 select-none font-mono text-sm leading-6">
          {Array.from({ length: Math.max(lineCount, 10) }).map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>
        
        <textarea
          value={code}
          onChange={(e) => onChange(e.target.value)}
          disabled={isExecuting}
          className="flex-1 bg-transparent text-slate-200 p-4 outline-none resize-none code-font text-sm leading-6 selection:bg-blue-500/30 font-mono"
          spellCheck={false}
          placeholder="# Type your commands here..."
        />
      </div>
    </div>
  );
};

export default CodeEditor;
