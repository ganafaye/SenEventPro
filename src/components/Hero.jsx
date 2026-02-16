const Hero = () => {
  return (
    <header className="relative h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background avec le dégradé de la maquette */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `linear-gradient(rgba(18, 32, 23, 0.7), rgba(18, 32, 23, 0.4)), url('https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=2070')` 
        }}
      ></div>

      <div className="relative z-10 max-w-4xl px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Experience Senegal's Most <br/>
          <span className="text-[#38e07b] underline decoration-[#FFD700]">Vibrant</span> Events
        </h1>
        <p className="text-lg text-white/90 mb-10 max-w-2xl mx-auto">
          The pulse of West African culture at your fingertips. Discover concerts, networking, workshops, and traditional ceremonies across the country.
        </p>

        {/* Barre de Recherche */}
        <div className="bg-white p-2 rounded-xl shadow-2xl flex flex-col md:flex-row items-center gap-2 max-w-5xl mx-auto">
          <div className="flex-1 flex items-center px-4 py-3 border-r border-slate-100 w-full md:w-auto">
            <span className="material-icons text-[#38e07b] mr-3">search</span>
            <input className="w-full bg-transparent border-none focus:ring-0 text-slate-700 placeholder-slate-400" placeholder="What are you looking for?" type="text"/>
          </div>
          <div className="flex-1 flex items-center px-4 py-3 border-r border-slate-100 w-full md:w-auto">
            <span className="material-icons text-[#E31B23] mr-3">location_on</span>
            <select className="w-full bg-transparent border-none focus:ring-0 text-slate-700">
              <option>Dakar</option>
              <option>Saint-Louis</option>
              <option>Thies</option>
              <option>Ziguinchor</option>
            </select>
          </div>
          <div className="flex-1 flex items-center px-4 py-3 w-full md:w-auto">
            <span className="material-icons text-[#FFD700] mr-3">calendar_today</span>
            <input className="w-full bg-transparent border-none focus:ring-0 text-slate-700" onFocus={(e) => (e.target.type = 'date')} placeholder="When?" type="text"/>
          </div>
          <button className="w-full md:w-auto bg-[#38e07b] hover:bg-[#38e07b]/90 text-white px-10 py-4 rounded-lg font-bold transition-all flex items-center justify-center gap-2">
            Search
          </button>
        </div>
      </div>
    </header>
  );
};