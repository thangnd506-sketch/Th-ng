
import React, { useState, useMemo } from 'react';
import { VIETNAM_PLACES } from '../constants';
import { searchVietnamPlaces, MapDiscoveryResult } from '../services/geminiService';
import { Place } from '../types';

const VietnamMap: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<MapDiscoveryResult | null>(null);
  const [mapUrl, setMapUrl] = useState('https://www.google.com/maps?q=Vietnam&output=embed&z=6');
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [showMarkers, setShowMarkers] = useState(true);

  // Tọa độ tương đối (percentage) để đặt marker trên khung bản đồ "National View"
  const touristMarkers = [
    { id: 'sapa', top: '12%', left: '38%' },
    { id: 'hanoi', top: '16%', left: '46%' },
    { id: 'halong', top: '15%', left: '56%' },
    { id: 'hue', top: '42%', left: '58%' },
    { id: 'danang', top: '45%', left: '64%' },
    { id: 'hoian', top: '48%', left: '66%' },
    { id: 'dalat', top: '72%', left: '68%' },
    { id: 'hcmc', top: '84%', left: '58%' },
    { id: 'phuquoc', top: '92%', left: '35%' },
  ];

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    setShowMarkers(false);
    const result = await searchVietnamPlaces(searchQuery);
    if (result && result.places.length > 0) {
      setSearchResult(result);
      const firstPlace = result.places[0];
      setMapUrl(`https://www.google.com/maps?q=${encodeURIComponent(firstPlace.title)}&output=embed`);
    } else {
      setMapUrl(`https://www.google.com/maps?q=${encodeURIComponent(searchQuery)}&output=embed`);
    }
    setLoading(false);
  };

  const handleMarkerClick = (placeId: string) => {
    const place = VIETNAM_PLACES.find(p => p.id === placeId);
    if (place) {
      setSelectedPlace(place);
      setShowMarkers(false);
      setMapUrl(`https://www.google.com/maps?q=${encodeURIComponent(place.name + " Vietnam")}&output=embed&t=k&z=15`);
    }
  };

  const resetToNationalView = () => {
    setMapUrl('https://www.google.com/maps?q=Vietnam&output=embed&z=6');
    setSelectedPlace(null);
    setSearchResult(null);
    setShowMarkers(true);
    setSearchQuery('');
  };

  return (
    <div className="relative w-full h-[85vh] bg-slate-100 rounded-[3rem] overflow-hidden shadow-2xl border border-white">
      
      {/* Search Header Overlay */}
      <div className="absolute top-6 left-6 right-6 z-20 space-y-3">
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            placeholder="Tìm địa danh du lịch..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/90 backdrop-blur-xl border border-white/50 px-6 py-4 rounded-3xl shadow-2xl text-sm focus:ring-2 focus:ring-red-500 outline-none transition-all pr-12"
          />
          <button 
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-red-600 text-white rounded-2xl hover:bg-red-700 transition-colors"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            )}
          </button>
        </form>

        {/* Home/Reset Button */}
        {!showMarkers && (
          <button
            onClick={resetToNationalView}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl animate-in fade-in slide-in-from-left duration-300"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
            Bản đồ tổng thể
          </button>
        )}
      </div>

      {/* Interactive Markers Layer (Only visible in National View) */}
      {showMarkers && (
        <div className="absolute inset-0 z-10 pointer-events-none">
          {touristMarkers.map((marker) => {
            const place = VIETNAM_PLACES.find(p => p.id === marker.id);
            return (
              <div
                key={marker.id}
                style={{ top: marker.top, left: marker.left }}
                className="absolute pointer-events-auto group"
              >
                {/* Marker Pin */}
                <button
                  onClick={() => handleMarkerClick(marker.id)}
                  className="relative flex items-center justify-center"
                >
                  <div className="absolute w-8 h-8 bg-red-600/20 rounded-full animate-ping"></div>
                  <div className="w-6 h-6 bg-white rounded-full shadow-lg border-2 border-red-600 flex items-center justify-center group-hover:scale-125 transition-transform duration-300">
                    <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                  </div>
                </button>

                {/* Info Tooltip on Hover */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none scale-95 group-hover:scale-100">
                  <div className="bg-white/95 backdrop-blur px-3 py-2 rounded-2xl shadow-2xl border border-slate-100 whitespace-nowrap flex items-center gap-3">
                    <img src={place?.image} className="w-8 h-8 rounded-lg object-cover" />
                    <div>
                      <p className="text-[10px] font-black text-slate-800 uppercase leading-none">{place?.name}</p>
                      <p className="text-[8px] text-slate-400 font-bold mt-0.5">⭐ {place?.rating}</p>
                    </div>
                  </div>
                  <div className="w-3 h-3 bg-white rotate-45 absolute -bottom-1.5 left-1/2 -translate-x-1/2 border-r border-b border-slate-100"></div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Main Google Map Frame */}
      <div className="w-full h-full relative">
        <iframe
          title="Vietnam Discovery Map"
          src={mapUrl}
          className="w-full h-full border-0"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>

      {/* Selected Place Card (Deep Dive) */}
      {selectedPlace && (
        <div className="absolute bottom-6 left-6 right-6 z-20 bg-white/95 backdrop-blur-2xl rounded-[2.5rem] p-6 shadow-2xl border border-white animate-in slide-in-from-bottom duration-500">
          <div className="flex justify-between items-start mb-4">
            <div className="flex gap-4">
              <img src={selectedPlace.image} className="w-16 h-16 rounded-3xl object-cover shadow-lg" />
              <div>
                <span className="bg-red-600 text-[8px] font-black text-white px-2 py-0.5 rounded-full uppercase tracking-tighter">Diểm đến nổi bật</span>
                <h4 className="text-xl font-bold text-slate-900 leading-tight mt-1">{selectedPlace.name}</h4>
                <p className="text-[10px] font-bold text-yellow-500">★ {selectedPlace.rating} • <span className="text-slate-400 uppercase">{selectedPlace.region}</span></p>
              </div>
            </div>
            <button 
              onClick={resetToNationalView}
              className="p-2 bg-slate-100 rounded-full hover:bg-slate-200"
            >
              <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          
          <p className="text-xs text-slate-600 mb-4 line-clamp-2 leading-relaxed">
            {selectedPlace.description}
          </p>

          <div className="grid grid-cols-2 gap-3">
            <button className="bg-slate-900 text-white py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-colors">
              Chỉ đường
            </button>
            <button className="bg-red-50 text-red-600 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-100 transition-colors">
              Gợi ý từ AI
            </button>
          </div>
        </div>
      )}

      {/* Search Result Drawer (AI Grounding) */}
      {searchResult && !selectedPlace && (
        <div className="absolute bottom-6 left-6 right-6 z-20 bg-white/95 backdrop-blur-2xl rounded-[2.5rem] p-6 shadow-2xl border border-white animate-in slide-in-from-bottom duration-500">
           {/* (Giữ nguyên logic hiển thị kết quả tìm kiếm như phiên bản trước) */}
           <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-[10px] font-black text-red-600 uppercase tracking-widest mb-1">AI Discovery</p>
              <h4 className="text-lg font-bold text-slate-900">{searchResult.places[0]?.title || 'Kết quả'}</h4>
            </div>
            <button onClick={() => setSearchResult(null)} className="text-slate-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <p className="text-xs text-slate-500 mb-4 italic">"{searchResult.text}"</p>
          <div className="flex flex-col gap-2">
            {searchResult.places.slice(0, 2).map((place, idx) => (
              <a key={idx} href={place.uri} target="_blank" className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-xs font-bold text-slate-700">{place.title}</span>
                <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VietnamMap;
