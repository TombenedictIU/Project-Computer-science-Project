import React, { useState } from 'react';
import { fetchSteps, fetchDocuments, fetchCityInfo } from '../api/apiClient';
import StepList from '../components/StepList';
import DocumentList from '../components/DocumentList';
import CityInfo from '../components/CityInfo';

const WorkflowPage = () => {
  const [city, setCity] = useState('berlin');
  const [userType, setUserType] = useState('student');
  
  const [stepsData, setStepsData] = useState(null);
  const [docsData, setDocsData] = useState(null);
  const [cityData, setCityData] = useState(null);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch all required data in parallel
      const [steps, docs, cityInfo] = await Promise.all([
        fetchSteps(),
        fetchDocuments(userType),
        fetchCityInfo(city)
      ]);
      
      setStepsData(steps);
      setDocsData(docs);
      setCityData(cityInfo);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.error || 
        "Failed to load data. Please ensure the backend server is running and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <header className="mb-8 flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold text-slate-900">Anmeldung Assistant</h1>
            <p className="text-slate-600 mt-1">Get your personalized city registration guide.</p>
          </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Panel: Controls */}
          <div className="w-full lg:w-1/3">
            <div className="card sticky top-8">
              <h2 className="text-xl font-bold mb-6 border-b pb-4">Your Details</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Select City</label>
                  <select 
                    value={city} 
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full border-slate-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                  >
                    <option value="berlin">Berlin</option>
                    <option value="munich">Munich</option>
                    <option value="unknown">Unknown City (Test Error)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">I am a...</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      className={`py-2 px-4 rounded-md border text-center transition-colors ${userType === 'student' ? 'bg-blue-50 border-blue-500 text-blue-700 font-medium' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                      onClick={() => setUserType('student')}
                    >
                      Student
                    </button>
                    <button
                      className={`py-2 px-4 rounded-md border text-center transition-colors ${userType === 'worker' ? 'bg-blue-50 border-blue-500 text-blue-700 font-medium' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                      onClick={() => setUserType('worker')}
                    >
                      Worker
                    </button>
                  </div>
                </div>

                <button 
                  onClick={handleFetchData}
                  disabled={loading}
                  className="w-full btn-primary py-3 text-lg mt-4"
                >
                  {loading ? 'Loading...' : 'View My Guide'}
                </button>
                
                {error && (
                  <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-md border border-red-200 text-sm">
                    {error}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Panel: Results */}
          <div className="w-full lg:w-2/3 space-y-8">
            {!stepsData && !loading && !error && (
              <div className="h-full min-h-[400px] flex items-center justify-center border-2 border-dashed border-slate-300 rounded-xl bg-slate-50/50">
                <div className="text-center p-8">
                  <svg className="mx-auto h-12 w-12 text-slate-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <h3 className="text-lg font-medium text-slate-900">No guide generated yet</h3>
                  <p className="mt-1 text-slate-500">Fill in your details and click "View My Guide" to get started.</p>
                </div>
              </div>
            )}
            
            {loading && (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            )}

            {stepsData && !loading && (
              <div className="animate-fade-in">
                <StepList data={stepsData} />
                <DocumentList data={docsData} />
                <CityInfo data={cityData} />
              </div>
            )}
          </div>
        </div>
    </div>
  );
};

export default WorkflowPage;
