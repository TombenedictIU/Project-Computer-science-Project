import React, { useState, useEffect } from 'react';

export default function AdminPage() {
  const [dataStatus, setDataStatus] = useState([]);
  const [linkStatus, setLinkStatus] = useState([]);
  const [metrics, setMetrics] = useState(null);
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/admin/data-status').then(r => r.json()).then(d => setDataStatus(d.datasets || []));
    fetch('http://localhost:5000/api/admin/link-status').then(r => r.json()).then(d => setLinkStatus(d));
    fetch('http://localhost:5000/api/admin/metrics').then(r => r.json()).then(d => setMetrics(d));
    fetch('http://localhost:5000/api/admin/analytics').then(r => r.json()).then(d => setAnalytics(d));
  }, []);

  const runLinkCheck = async () => {
    try {
      await fetch('http://localhost:5000/api/admin/run-link-check', { method: 'POST' });
      alert('Link check started in background!');
    } catch(e) {
      alert('Error starting link check');
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Admin & Observability</h1>
        <p className="text-slate-600">Monitor data freshness, broken links, and usage metrics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold">Link Status</h3>
            <button onClick={runLinkCheck} className="bg-slate-800 text-white px-3 py-1 text-sm rounded">Run Check</button>
          </div>
          <div className="h-64 overflow-y-auto border border-slate-100 rounded">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 sticky top-0">
                <tr>
                  <th className="p-2">URL</th>
                  <th className="p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {linkStatus.length === 0 ? <tr><td colSpan="2" className="p-2 text-center text-slate-500">No link data yet. Run check.</td></tr> : null}
                {linkStatus.map((item, i) => (
                  <tr key={i} className="border-t border-slate-100">
                    <td className="p-2 truncate max-w-xs" title={item.url}>{item.url}</td>
                    <td className="p-2">
                      <span className={`px-2 py-1 rounded text-xs ${item.is_broken ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                        {item.status_code || 'Err'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-bold mb-4">System Metrics</h3>
          {metrics ? (
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-slate-50 p-4 rounded border border-slate-100">
                <div className="text-2xl font-bold text-blue-600">{metrics.requests_total}</div>
                <div className="text-xs text-slate-500">Total Requests</div>
              </div>
              <div className="bg-slate-50 p-4 rounded border border-slate-100">
                <div className="text-2xl font-bold text-red-600">{metrics.errors_total}</div>
                <div className="text-xs text-slate-500">Errors</div>
              </div>
              <div className="bg-slate-50 p-4 rounded border border-slate-100">
                <div className="text-2xl font-bold text-green-600">{metrics.active_users}</div>
                <div className="text-xs text-slate-500">Active Users</div>
              </div>
            </div>
          ) : <p>Loading metrics...</p>}
          
          <h3 className="font-bold mt-6 mb-4">Module Analytics (7 days)</h3>
          {analytics ? (
            <ul className="space-y-2">
              {Object.keys(analytics).map(key => (
                <li key={key} className="flex justify-between p-2 border-b border-slate-50">
                  <span className="capitalize">{key}</span>
                  <span className="font-mono bg-slate-100 px-2 rounded">{analytics[key].calls_last_7_days} calls</span>
                </li>
              ))}
            </ul>
          ) : <p>Loading analytics...</p>}
        </div>
      </div>
    </div>
  );
}
