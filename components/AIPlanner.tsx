
import React, { useState } from 'react';
import { generateTripPlan } from '../services/geminiService';
import { TripPlan } from '../types';

const AIPlanner: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TripPlan | null>(null);
  const [formData, setFormData] = useState({
    days: 5,
    budget: 'medium' as 'budget' | 'medium' | 'luxury',
    interests: [] as string[],
    transport: 'airplane',
    accommodation: 'hotel 4*',
    people: 'couple'
  });

  const interestsOptions = ['Culture', 'Nature', 'Food', 'Adventure', 'Relaxation'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const plan = await generateTripPlan(formData);
    setResult(plan);
    setLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-serif font-bold text-slate-900 mb-2">AI Trip Planner</h2>
        <p className="text-slate-600">Tell us your preferences and let Gemini curate your perfect Vietnam journey.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-1 bg-white p-6 rounded-3xl shadow-xl border border-slate-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Duration (Days)</label>
              <input 
                type="range" min="1" max="14" 
                value={formData.days}
                onChange={(e) => setFormData({...formData, days: parseInt(e.target.value)})}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-600"
              />
              <div className="text-center font-bold text-red-600">{formData.days} Days</div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Budget Level</label>
              <div className="flex bg-slate-100 p-1 rounded-xl">
                {['budget', 'medium', 'luxury'].map(b => (
                  <button
                    key={b} type="button"
                    onClick={() => setFormData({...formData, budget: b as any})}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all capitalize ${
                      formData.budget === b ? 'bg-white shadow-sm text-red-600' : 'text-slate-500'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Interests</label>
              <div className="flex flex-wrap gap-2">
                {interestsOptions.map(i => (
                  <button
                    key={i} type="button"
                    onClick={() => {
                      const newInterests = formData.interests.includes(i) 
                        ? formData.interests.filter(item => item !== i)
                        : [...formData.interests, i];
                      setFormData({...formData, interests: newInterests});
                    }}
                    className={`px-3 py-1 rounded-full text-xs transition-all border ${
                      formData.interests.includes(i) ? 'bg-red-50 border-red-200 text-red-600 font-bold' : 'bg-white border-slate-200 text-slate-500'
                    }`}
                  >
                    {i}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Transport</label>
              <select 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-red-500 outline-none"
                value={formData.transport}
                onChange={(e) => setFormData({...formData, transport: e.target.value})}
              >
                <option value="airplane">Airplane & Taxis</option>
                <option value="train">North-South Train</option>
                <option value="motorcycle">Motorcycle / Adventure</option>
                <option value="bus">Tourist Bus</option>
              </select>
            </div>

            <button 
              type="submit" disabled={loading}
              className="w-full bg-red-600 text-white py-4 rounded-2xl font-bold hover:bg-red-700 transition-all shadow-lg disabled:opacity-50"
            >
              {loading ? 'Generating Your Dream Trip...' : 'Generate Itinerary'}
            </button>
          </form>
        </div>

        {/* Output */}
        <div className="lg:col-span-2 min-h-[500px]">
          {!result && !loading ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 rounded-3xl">
              <svg className="w-16 h-16 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              <p>Your itinerary will appear here</p>
            </div>
          ) : loading ? (
            <div className="h-full flex flex-col items-center justify-center space-y-4">
              <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-red-600 font-medium animate-pulse">Our AI is exploring Vietnam for you...</p>
            </div>
          ) : (
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 animate-in slide-in-from-right duration-500">
              <div className="bg-slate-900 p-8 text-white">
                <div className="flex justify-between items-end">
                  <div>
                    <h3 className="text-2xl font-serif font-bold">Trip to Beautiful Vietnam</h3>
                    <p className="text-slate-400 text-sm mt-1">{formData.days} Days • {formData.budget} Budget</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">Estimated Cost</p>
                    <p className="text-2xl font-bold text-yellow-400">~{(result?.totalBudget || 0).toLocaleString()} VND</p>
                  </div>
                </div>
              </div>
              
              <div className="p-8">
                <div className="space-y-8">
                  {result?.itinerary.map((day) => (
                    <div key={day.day} className="relative pl-8 border-l-2 border-red-100">
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-red-600 border-4 border-white"></div>
                      <h4 className="font-bold text-lg mb-4 text-slate-900">Day {day.day}</h4>
                      <div className="grid gap-4">
                        {day.activities.map((act, i) => (
                          <div key={i} className="flex space-x-4 bg-slate-50 p-4 rounded-2xl group hover:bg-red-50 transition-colors">
                            <span className="text-xs font-bold text-red-400 whitespace-nowrap">{act.time}</span>
                            <div>
                              <p className="font-bold text-slate-800">{act.location}</p>
                              <p className="text-sm text-slate-600">{act.description}</p>
                              <p className="text-xs text-red-500 mt-2 font-medium">Cost: {act.cost.toLocaleString()} VND</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-12 bg-yellow-50 p-6 rounded-2xl border border-yellow-100">
                  <h5 className="font-bold text-yellow-800 mb-3 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
                    Pro Tips for Your Trip
                  </h5>
                  <ul className="space-y-2">
                    {result?.tips.map((tip, i) => (
                      <li key={i} className="text-sm text-yellow-900 flex items-start">
                        <span className="mr-2">•</span> {tip}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 flex space-x-4">
                   <button className="flex-1 bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center">
                     <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                     Download PDF
                   </button>
                   <button className="flex-1 bg-slate-100 text-slate-600 py-3 rounded-xl font-bold hover:bg-slate-200 transition-all flex items-center justify-center">
                     <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                     Share Trip
                   </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIPlanner;
