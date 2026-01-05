
import React, { useState } from 'react';
import { FOOD_LIST } from '../constants';
import { Region } from '../types';

const FoodExplorer: React.FC = () => {
  const [filter, setFilter] = useState<Region | 'All'>('All');

  const filteredFood = filter === 'All' 
    ? FOOD_LIST 
    : FOOD_LIST.filter(f => f.region === filter);

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <h2 className="text-4xl font-serif font-bold text-slate-900 mb-2">Vietnamese Culinary Journey</h2>
          <p className="text-slate-600">Discover flavors from the North, Central, and South.</p>
        </div>
        <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-slate-200">
          {['All', ...Object.values(Region)].map(r => (
            <button
              key={r}
              onClick={() => setFilter(r as any)}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
                filter === r ? 'bg-red-600 text-white' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredFood.map(food => (
          <div key={food.id} className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group">
            <div className="relative h-64">
              <img src={food.image} alt={food.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-4 left-4 flex gap-2">
                {food.tags.map(tag => (
                  <span key={tag} className="bg-red-600 text-white text-[10px] uppercase font-black px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-slate-800">
                {food.priceRange}
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-slate-900">{food.name}</h3>
                <span className="text-xs font-semibold text-slate-400">{food.region}</span>
              </div>
              <p className="text-sm text-slate-600 mb-6">{food.description}</p>
              
              <div className="border-t border-slate-100 pt-4">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Recommended Places</p>
                {food.recommendedPlaces.map((place, i) => (
                  <div key={i} className="flex justify-between items-center mb-2">
                    <div>
                      <p className="text-sm font-bold text-slate-800">{place.name}</p>
                      <p className="text-xs text-slate-500">{place.address}</p>
                    </div>
                    <a href={place.link || '#'} className="p-2 bg-slate-100 rounded-full hover:bg-red-100 hover:text-red-600 transition-colors">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
                    </a>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-6 py-3 border-2 border-red-600 text-red-600 rounded-xl font-bold hover:bg-red-600 hover:text-white transition-all">
                Find on ShopeeFood
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodExplorer;
