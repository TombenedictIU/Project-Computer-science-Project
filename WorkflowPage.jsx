import React from 'react';
import ValidationNote from './ValidationNote';

const StepList = ({ data }) => {
  if (!data || !data.steps) return null;

  return (
    <div className="card mb-6">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Anmeldung Process Steps</h2>
      
      <div className="space-y-6">
        {data.steps.map((step) => (
          <div key={step.step_number} className="flex">
            <div className="flex-shrink-0 mr-4">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                {step.step_number}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800">{step.title}</h3>
              <p className="text-slate-600 mt-1 leading-relaxed">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      <ValidationNote dateString={data.last_validated_at} sourceUrl={data.source_url} />
    </div>
  );
};

export default StepList;
