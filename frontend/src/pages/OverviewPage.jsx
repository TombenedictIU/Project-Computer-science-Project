import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function OverviewPage() {
  const { t } = useTranslation();
  const [stages, setStages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/journey/overview')
      .then(res => res.json())
      .then(data => {
        setStages(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>{t('common.loading')}</div>;

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">{t('overview.title')}</h1>
        <p className="text-slate-600">{t('overview.subtitle')}</p>
      </div>

      <div className="relative border-l-2 border-blue-200 ml-4 md:ml-0 space-y-8">
        {stages.map((stage, idx) => (
          <div key={stage.id} className="relative pl-8 md:pl-10">
            {/* Timeline Dot */}
            <div className="absolute w-6 h-6 bg-blue-600 rounded-full border-4 border-white left-[-13px] top-1 shadow-sm"></div>
            
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-slate-900">
                  <span className="text-blue-600 mr-2">{idx + 1}.</span>
                  {stage.title}
                </h3>
                {stage.related_endpoints.length > 0 && (
                  <span className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded">Interactive</span>
                )}
              </div>
              <p className="text-slate-600 mb-4">{stage.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
