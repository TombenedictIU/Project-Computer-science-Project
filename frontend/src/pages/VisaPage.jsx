import React, { useState } from 'react';
import { 
  fetchVisaSteps, 
  fetchVisaChecklist, 
  fetchVisaLocations, 
  fetchVisaFinance, 
  fetchVisaInsurance 
} from '../api/visaClient';
import VisaProfileSelector from '../components/VisaProfileSelector';
import VisaTimeline from '../components/VisaTimeline';
import VisaChecklist from '../components/VisaChecklist';

const VisaPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [stepsData, setStepsData] = useState(null);
  const [checklistData, setChecklistData] = useState(null);
  const [locationsData, setLocationsData] = useState(null);
  const [financeData, setFinanceData] = useState(null);
  const [insuranceData, setInsuranceData] = useState(null);

  const [riskData, setRiskData] = useState(null);

  const handleGenerate = async (profile) => {
    setLoading(true);
    setError(null);
    try {
      const [steps, checklist, locations, finance, insurance, risks] = await Promise.all([
        fetchVisaSteps(profile.country, profile.studyType),
        fetchVisaChecklist(profile.country, profile.studyType, profile.fundingMode),
        fetchVisaLocations(profile.country),
        fetchVisaFinance(),
        fetchVisaInsurance(),
        fetch('http://localhost:5000/api/risk/analyze-profile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(profile)
        }).then(r => r.json())
      ]);
      
      setStepsData(steps);
      setChecklistData(checklist);
      setLocationsData(locations);
      setFinanceData(finance);
      setInsuranceData(insurance);
      setRiskData(risks);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.error || 
        "Failed to load visa data. Please check the backend."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Student Visa Assistant</h1>
        <p className="text-slate-500 mt-2">Get a personalized plan for your German student visa or residence permit.</p>
      </header>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column: Form */}
        <div className="w-full lg:w-1/3 space-y-6">
          <VisaProfileSelector onGenerate={handleGenerate} />
          
          {error && (
            <div className="bg-red-50 text-red-700 p-4 rounded-xl border border-red-200 text-sm shadow-sm">
              {error}
            </div>
          )}
        </div>

        {/* Right Column: Results */}
        <div className="w-full lg:w-2/3 space-y-8">
          {!stepsData && !loading && !error && (
            <div className="h-full min-h-[400px] flex items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl bg-white">
              <div className="text-center p-8 max-w-sm">
                <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-slate-800">Generate Your Plan</h3>
                <p className="mt-2 text-sm text-slate-500">Select your application context and click "Generate" to see your tailored timeline and checklist.</p>
              </div>
            </div>
          )}

          {loading && (
            <div className="flex justify-center items-center h-64 bg-white rounded-2xl border border-slate-200">
              <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-100 border-t-blue-600"></div>
            </div>
          )}

          {stepsData && !loading && (
            <div className="animate-fade-in space-y-8">
              <VisaTimeline data={stepsData} />
              <VisaChecklist data={checklistData} />
              
              {/* Risk Radar Card */}
              {riskData && riskData.length > 0 && (
                <div className="bg-orange-50 rounded-2xl shadow-sm border border-orange-200 p-6">
                  <h2 className="text-xl font-bold text-orange-800 mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    Risk Radar
                  </h2>
                  <div className="space-y-3">
                    {riskData.map((risk, idx) => (
                      <div key={idx} className="bg-white p-3 rounded shadow-sm border-l-4" style={{ borderColor: risk.severity === 'high' ? 'red' : risk.severity === 'medium' ? 'orange' : 'yellow' }}>
                        <p className="font-semibold text-slate-800">{risk.description}</p>
                        <a href={risk.source_url} target="_blank" rel="noreferrer" className="text-xs text-blue-600 hover:underline">Learn More</a>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Locations Card */}
              {locationsData && locationsData.locations.length > 0 && (
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                  <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Official Offices
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {locationsData.locations.map((loc, i) => (
                      <div key={i} className="border border-slate-100 bg-slate-50 rounded-xl p-4">
                        <h4 className="font-bold text-slate-800">{loc.mission_name}</h4>
                        <p className="text-sm text-slate-500 mb-3">{loc.city}</p>
                        <div className="flex gap-2">
                          <a href={loc.appointment_url} target="_blank" rel="noopener noreferrer" className="text-xs bg-white border border-slate-200 hover:border-blue-400 hover:text-blue-600 px-3 py-1.5 rounded-md transition-colors shadow-sm font-medium">Appointment</a>
                          <a href={loc.visa_info_url} target="_blank" rel="noopener noreferrer" className="text-xs bg-white border border-slate-200 hover:border-blue-400 hover:text-blue-600 px-3 py-1.5 rounded-md transition-colors shadow-sm font-medium">Info</a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Finance & Insurance Cards side by side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {financeData && financeData.minimum_annual_amount && (
                  <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white shadow-sm">
                    <h3 className="font-bold text-lg mb-2">Financial Proof</h3>
                    <p className="text-green-50 mb-4 text-sm">Minimum required amount:</p>
                    <div className="text-3xl font-extrabold mb-4">{financeData.minimum_annual_amount}</div>
                    <a href={financeData.source_url} target="_blank" rel="noopener noreferrer" className="inline-block bg-white/20 hover:bg-white/30 transition-colors rounded-lg px-4 py-2 text-sm font-semibold backdrop-blur-sm">
                      Read Rules
                    </a>
                  </div>
                )}
                
                {insuranceData && insuranceData.stages && (
                  <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white shadow-sm">
                    <h3 className="font-bold text-lg mb-2">Health Insurance</h3>
                    <ul className="space-y-2 mb-4">
                      {insuranceData.stages.map((stage, i) => (
                        <li key={i} className="text-sm flex gap-2">
                          <span className="text-blue-200 mt-0.5">•</span>
                          <span className="text-blue-50">{stage.title}</span>
                        </li>
                      ))}
                    </ul>
                    <a href={insuranceData.source_url} target="_blank" rel="noopener noreferrer" className="inline-block bg-white/20 hover:bg-white/30 transition-colors rounded-lg px-4 py-2 text-sm font-semibold backdrop-blur-sm mt-auto">
                      View Guide
                    </a>
                  </div>
                )}
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VisaPage;
