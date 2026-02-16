import React from 'react';

const EventCard = ({ event }) => {
  // Gestion de l'image venant de Django
  const imageUrl = event.image?.startsWith('http') 
    ? event.image 
    : `http://localhost:8000${event.image}`;

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 h-full flex flex-col">
      <img 
        className="rounded-t-lg h-48 w-full object-cover" 
        src={event.image ? imageUrl : 'https://via.placeholder.com/400x200'} 
        alt={event.title} 
      />
      <div className="p-5 flex flex-col flex-grow">
        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded mb-2 inline-block w-fit">
          {event.category_details?.name || 'Événement'}
        </span>
        
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 line-clamp-1">
          {event.title}
        </h5>
        
        <p className="mb-3 font-normal text-gray-700 line-clamp-2">
          {event.description}
        </p>
        
        <div className="flex justify-between items-center mt-auto">
          <span className="text-xl font-bold text-indigo-600">
            {event.price} FCFA
          </span>
          <button className="px-3 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors">
            Détails
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;