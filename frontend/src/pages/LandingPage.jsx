import React from 'react';

const LandingPage = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 min-h-[80vh]">
      <div className="max-w-3xl w-full text-center space-y-8">
        <div className="inline-block px-4 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-4">
          Phase 1: Anmeldung Workflow
        </div>
        
        <h1 className="text-5xl font-extrabold text-slate-900 tracking-tight">
          Welcome to <span className="text-blue-600">AbroadEase</span>
        </h1>
        
        <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Your digital assistant for navigating German bureaucracy. We currently support the <strong>Anmeldung</strong> (city registration) process, helping you find official requirements and booking links quickly and safely.
        </p>
        
        <div className="pt-8">
          <button 
            onClick={onStart}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
          >
            Start Anmeldung Guide
          </button>
        </div>
        
        <div className="mt-16 p-6 bg-white rounded-xl border border-slate-200 text-left">
          <h3 className="font-bold text-slate-800 mb-2">Important Disclaimer</h3>
          <p className="text-sm text-slate-500">
            AbroadEase is an informational assistant, not legal advice. We strive to provide accurate, validated information and link directly to official government portals. Always verify requirements on the official city websites before your appointment.
            <br/><br/>
            <em>Note: Future phases will include support for Visas, Blocked Accounts, and Residence Permits.</em>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
