import React, { useEffect, useState } from 'react';
import { useApiQuery } from '../../hooks/useApiQuery';
import { Search, IndianRupee, AlertTriangle, Layers } from 'lucide-react';
import { api } from '../../services/api';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const GeographicViewPage: React.FC<any> = ({ filters }) => {
  const [search, setSearch] = useState('');
  const [geoData, setGeoData] = useState<any>(null);
  const queryKey = 'states-' + JSON.stringify(filters);
  const { data: stateRes, isLoading: loading } = useApiQuery(queryKey, () => api.getStateAnalytics(filters));
  const states = stateRes?.data || [];

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    fetch('/india_states.geojson')
      .then(res => res.json())
      .then(data => setGeoData(data))
      .catch(err => console.error("Error loading GeoJSON", err));
  }, []);

  const handleStateClick = (stateName: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('state', stateName);
    navigate(`/projects?${newParams.toString()}`);
  };

  const filteredStates = (states || []).filter(s => (s.state || '').toLowerCase().includes(search.toLowerCase()));

  const formatCr = (val: number) => {
    if (val == null) return 'N/A';
    if (val === 0) return '₹0 Cr';
    if (val >= 1000) return `₹${(val / 1000).toFixed(1)}k Cr`;
    return `₹${val.toLocaleString()} Cr`;
  };

  const getStyle = (feature: any) => {
    const stateName = feature.properties.NAME_1 || feature.properties.st_nm; // common properties for India GeoJSON
    const stateData = states.find(s => s.state && stateName && s.state.toLowerCase() === stateName.toLowerCase());
    
    let fillColor = '#e2e8f0'; // default gray
    if (stateData) {
      const count = stateData.projectCount;
      fillColor = count > 50 ? '#0369a1' :
                  count > 20 ? '#0284c7' :
                  count > 10 ? '#38bdf8' :
                  count > 0  ? '#bae6fd' : '#e2e8f0';
    }

    return {
      fillColor,
      weight: 1,
      opacity: 1,
      color: 'white',
      fillOpacity: 0.7
    };
  };

  const onEachFeature = (feature: any, layer: L.Layer) => {
    const stateName = feature.properties.NAME_1 || feature.properties.st_nm;
    const stateData = states.find(s => s.state && stateName && s.state.toLowerCase() === stateName.toLowerCase());
    
    if (stateData) {
      const popupContent = `
        <div style="font-family: sans-serif; min-width: 150px; cursor: pointer;">
          <h3 style="font-weight: bold; margin: 0 0 5px 0;">${stateData.state}</h3>
          <div style="font-size: 12px; margin-bottom: 2px;"><b>Projects:</b> ${stateData.projectCount}</div>
          <div style="font-size: 12px; margin-bottom: 2px;"><b>Cost:</b> ${formatCr(stateData.revisedCost)}</div>
          <div style="font-size: 12px; margin-bottom: 0px; color: #ef4444;"><b>High Risk:</b> ${stateData.highRiskCount}</div>
          <div style="font-size: 11px; color: #0284c7; margin-top: 5px; text-decoration: underline;">Click to view projects</div>
        </div>
      `;
      layer.bindPopup(popupContent);
      
      layer.on({
        click: () => {
          handleStateClick(stateData.state);
        }
      });
    }
  };

  return (
    <div className="space-y-6 pb-8 h-[calc(100vh-140px)] flex flex-col">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Geographic Intelligence</h2>
          <p className="text-sm text-slate-500">Explore project concentration, financial exposure, progress, and risk across states and UTs.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0">
        <div className="lg:col-span-4 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm flex flex-col overflow-hidden">
          <div className="p-4 border-b border-slate-100 dark:border-slate-800 space-y-4">
             <div className="relative">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
               <input 
                 type="text" 
                 placeholder="Search states..." 
                 value={search}
                 onChange={(e) => setSearch(e.target.value)}
                 className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-sky-500 outline-none"
               />
             </div>
          </div>
          <div className="overflow-y-auto flex-1 p-2">
            {loading ? (
              <div className="p-4 text-center text-slate-500">Loading states...</div>
            ) : filteredStates.length === 0 ? (
              <div className="p-4 text-center text-slate-500">No states found</div>
            ) : (
              filteredStates.map((s, idx) => (
                <div key={idx} onClick={() => handleStateClick(s.state)} className="p-3 mb-2 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700/50 hover:border-sky-500/50 transition-colors cursor-pointer">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white">{s.state}</h3>
                    <span className="text-xs font-mono-num font-bold bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded">{s.projectCount} Proj</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[10px]">
                     <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                        <IndianRupee className="w-3 h-3 text-emerald-500" />
                        <span>{formatCr(s.revisedCost)}</span>
                     </div>
                     <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                        <AlertTriangle className="w-3 h-3 text-red-500" />
                        <span>{s.highRiskCount} High Risk</span>
                     </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        
        <div className="lg:col-span-8 bg-slate-100 dark:bg-[#0C101A] border border-slate-200 dark:border-slate-800 rounded-xl relative overflow-hidden flex flex-col z-0">
           {geoData ? (
             <>
               <MapContainer center={[22.5937, 78.9629]} zoom={4.5} style={{ height: '100%', width: '100%', zIndex: 1 }}>
                 <TileLayer
                   url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
                   attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                 />
                 <GeoJSON data={geoData} style={getStyle} onEachFeature={onEachFeature} />
               </MapContainer>
               <div className="absolute bottom-4 right-4 z-[400] bg-white/90 dark:bg-[#111827]/90 backdrop-blur-sm p-3 rounded-lg border border-slate-200 dark:border-slate-800 shadow-md">
                 <div className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">Project Concentration</div>
                 <div className="flex flex-col gap-1.5 text-xs text-slate-600 dark:text-slate-400">
                   <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-sm bg-[#0369a1]"></div> &gt; 50 Projects</div>
                   <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-sm bg-[#0284c7]"></div> 21 - 50 Projects</div>
                   <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-sm bg-[#38bdf8]"></div> 11 - 20 Projects</div>
                   <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-sm bg-[#bae6fd]"></div> 1 - 10 Projects</div>
                   <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-sm bg-[#e2e8f0]"></div> 0 Projects</div>
                 </div>
               </div>
             </>
           ) : (
             <div className="flex flex-1 items-center justify-center">
               <div className="text-slate-500">Loading map data...</div>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};
