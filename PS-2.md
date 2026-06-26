import React from 'react';

const VisaTimeline = ({ data }) => {
  if (!data || !data.steps) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Action Plan Timeline
      </h2>
      
      <div className="relative border-l border-slate-200 ml-3 space-y-8 pb-4">
        {data.steps.map((step, index) => (
          <div key={step.id} className="relative pl-8 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
            {/* Timeline Dot */}
            <div className="absolute w-6 h-6 bg-white rounded-full border-2 border-indigo-500 -left-3 top-1 flex items-center justify-center">
              <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
            </div>
            
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-slate-900 text-lg">
                  <span className="text-indigo-500 mr-2 text-sm font-bold bg-indigo-50 px-2 py-0.5 rounded">Step {step.order}</span>
                  {step.title}
                </h3>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-3">
                {step.description}
              </p>
              {step.source_url && (
                <a 
                  href={step.source_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-xs font-medium text-blue-600 hover:text-blue-800 transition-colors bg-blue-50 px-2.5 py-1 rounded-md"
                >
                  Official Info
                  <svg className="w-3 h-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VisaTimeline;
