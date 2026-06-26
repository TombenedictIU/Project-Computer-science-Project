import React from 'react';
import ValidationNote from './ValidationNote';

const CityInfo = ({ data }) => {
  if (!data || !data.offices) return null;

  return (
    <div className="card mb-6">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">
        Local Offices in {data.city}
      </h2>
      
      <div className="grid gap-4 md:grid-cols-2">
        {data.offices.map((office, index) => (
          <div key={index} className="p-4 bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-lg font-bold text-slate-800 mb-2">{office.name}</h3>
            <p className="text-sm text-slate-600 mb-4">{office.address}</p>
            
            <a 
              href={office.appointment_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-slate-800 text-white text-sm font-medium rounded hover:bg-slate-700 transition-colors"
            >
              Book Appointment
            </a>
            
            <div className="mt-4 pt-3 border-t border-slate-100">
              <ValidationNote dateString={office.last_validated_at} sourceUrl={office.source_url} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CityInfo;
