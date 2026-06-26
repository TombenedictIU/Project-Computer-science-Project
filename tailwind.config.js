import React from 'react';

const ValidationNote = ({ dateString, sourceUrl }) => {
  if (!dateString) return null;

  const date = new Date(dateString).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="mt-4 p-3 bg-blue-50 rounded-md border border-blue-100 flex items-start text-sm text-blue-800">
      <svg className="w-5 h-5 mr-2 flex-shrink-0 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
      <div>
        <strong>Information last validated on:</strong> {date}
        {sourceUrl && (
          <div className="mt-1">
            <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline inline-flex items-center">
              View official source
              <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ValidationNote;
