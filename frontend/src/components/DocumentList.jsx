import React from 'react';
import ValidationNote from './ValidationNote';

const DocumentList = ({ data }) => {
  if (!data || !data.documents) return null;

  return (
    <div className="card mb-6">
      <h2 className="text-2xl font-bold text-slate-800 mb-6 capitalize">
        Required Documents: {data.user_type}
      </h2>
      
      <ul className="space-y-4">
        {data.documents.map((doc, index) => (
          <li key={index} className="flex items-start p-4 bg-slate-50 rounded-lg border border-slate-200">
            <div className="mr-3 mt-0.5">
              {doc.mandatory ? (
                <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path></svg>
              ) : (
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
              )}
            </div>
            <div>
              <h3 className="text-md font-semibold text-slate-800">
                {doc.name} 
                {doc.mandatory && <span className="ml-2 text-xs font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded uppercase tracking-wide">Required</span>}
              </h3>
              <p className="text-sm text-slate-600 mt-1">{doc.description}</p>
            </div>
          </li>
        ))}
      </ul>
      
      <ValidationNote dateString={data.last_validated_at} sourceUrl={data.source_url} />
    </div>
  );
};

export default DocumentList;
