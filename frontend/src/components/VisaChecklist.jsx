import React, { useState } from 'react';

const VisaChecklist = ({ data }) => {
  const [checkedItems, setCheckedItems] = useState(new Set());

  if (!data) return null;

  const toggleItem = (id) => {
    const next = new Set(checkedItems);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setCheckedItems(next);
  };

  const allItems = [...(data.required_items || []), ...(data.optional_items || [])];
  if (allItems.length === 0) return null;

  const progress = Math.round((checkedItems.size / allItems.length) * 100);

  const renderItem = (item, isRequired) => (
    <div 
      key={item.id} 
      className={`flex items-start gap-3 p-3 rounded-lg border transition-all cursor-pointer ${
        checkedItems.has(item.id) 
        ? 'bg-emerald-50 border-emerald-200' 
        : 'bg-white border-slate-200 hover:border-blue-300'
      }`}
      onClick={() => toggleItem(item.id)}
    >
      <div className="mt-0.5">
        <input 
          type="checkbox" 
          checked={checkedItems.has(item.id)}
          onChange={() => {}} // handled by parent div click
          className="w-5 h-5 rounded border-slate-300 text-emerald-500 focus:ring-emerald-500 cursor-pointer"
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <h4 className={`font-semibold ${checkedItems.has(item.id) ? 'text-emerald-800 line-through' : 'text-slate-800'}`}>
            {item.title}
          </h4>
          {isRequired ? (
            <span className="text-[10px] uppercase tracking-wider font-bold bg-red-100 text-red-700 px-1.5 py-0.5 rounded">
              Required
            </span>
          ) : (
            <span className="text-[10px] uppercase tracking-wider font-bold bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
              Optional
            </span>
          )}
        </div>
        <p className={`text-sm ${checkedItems.has(item.id) ? 'text-emerald-600' : 'text-slate-500'}`}>
          {item.description}
        </p>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <div className="flex justify-between items-end mb-4">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
          Document Checklist
        </h2>
        <div className="text-sm font-medium text-slate-500">
          {checkedItems.size} / {allItems.length} done
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="w-full bg-slate-100 rounded-full h-2.5 mb-6 overflow-hidden">
        <div className="bg-emerald-500 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
      </div>

      <div className="space-y-3">
        {data.required_items?.map(item => renderItem(item, true))}
        {data.optional_items?.map(item => renderItem(item, false))}
      </div>
    </div>
  );
};

export default VisaChecklist;
