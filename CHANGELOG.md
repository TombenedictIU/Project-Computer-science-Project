import React from 'react';

const VisaProfileSelector = ({ onGenerate }) => {
  const [country, setCountry] = React.useState('india');
  const [studyType, setStudyType] = React.useState('master');
  const [fundingMode, setFundingMode] = React.useState('blocked_account');

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        Your Profile
      </h2>
      
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Applying From</label>
          <select 
            value={country} 
            onChange={(e) => setCountry(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 transition-colors"
          >
            <option value="india">India</option>
            <option value="germany">Germany (Extension)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Study Level</label>
          <select 
            value={studyType} 
            onChange={(e) => setStudyType(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 transition-colors"
          >
            <option value="bachelor">Bachelor</option>
            <option value="master">Master</option>
            <option value="language_course">Language Course</option>
            <option value="studienkolleg">Studienkolleg</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Funding Mode</label>
          <select 
            value={fundingMode} 
            onChange={(e) => setFundingMode(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 transition-colors"
          >
            <option value="blocked_account">Blocked Account</option>
            <option value="scholarship">Scholarship</option>
            <option value="sponsor">Sponsor (Verpflichtungserklärung)</option>
            <option value="mixed">Mixed</option>
          </select>
        </div>

        <button 
          onClick={() => onGenerate({ country, studyType, fundingMode })}
          className="w-full mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg text-sm px-5 py-3 text-center transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          Generate Visa Plan
        </button>
      </div>
    </div>
  );
};

export default VisaProfileSelector;
