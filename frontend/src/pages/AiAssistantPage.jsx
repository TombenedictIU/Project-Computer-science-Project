import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function AiAssistantPage() {
  const { t } = useTranslation();
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (!text && !file) {
      setError('Please provide text or a file');
      return;
    }
    setError('');
    setLoading(true);
    
    try {
      let body;
      let headers = {};
      
      if (file) {
        body = new FormData();
        body.append('file', file);
        // Do not set Content-Type for FormData, browser sets it with boundary
      } else {
        body = JSON.stringify({ text });
        headers['Content-Type'] = 'application/json';
      }

      const res = await fetch('http://localhost:5000/api/ai/letter-analyze', {
        method: 'POST',
        headers,
        body
      });
      
      if (!res.ok) throw new Error('Analysis failed');
      
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">{t('ai.title')}</h1>
        <p className="text-slate-600">Upload a bureaucratic letter to get a simple explanation and action items.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">{t('ai.upload_label')}</label>
            <input 
              type="file" 
              accept=".pdf,image/*" 
              onChange={(e) => setFile(e.target.files[0])}
              className="block w-full text-sm text-slate-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
          </div>
          
          <div className="flex items-center text-slate-400">
            <hr className="flex-1" />
            <span className="px-2 text-xs uppercase">OR</span>
            <hr className="flex-1" />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">{t('ai.text_label')}</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full border border-slate-300 rounded-lg p-3 h-32 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Paste German text here..."
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {loading ? t('common.loading') : t('ai.analyze_btn')}
          </button>
        </div>

        {result && (
          <div className="space-y-6 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{t('ai.summary')}</h3>
              <p className="text-slate-700 bg-slate-50 p-4 rounded-lg border border-slate-100">
                {result.summary}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{t('ai.actions')}</h3>
              <ul className="space-y-3">
                {result.actions?.map((action, idx) => (
                  <li key={idx} className="flex gap-3 bg-blue-50 p-3 rounded-lg text-blue-900">
                    <input type="checkbox" className="mt-1" />
                    <div>
                      <p className="font-medium">{action.description}</p>
                      {action.deadline && <p className="text-sm text-blue-700">Deadline: {action.deadline}</p>}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {result.draft_reply_de && (
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{t('ai.draft_reply')}</h3>
                <textarea 
                  readOnly 
                  value={result.draft_reply_de} 
                  className="w-full text-sm font-mono text-slate-700 bg-slate-50 p-4 rounded-lg border border-slate-200 h-40" 
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
