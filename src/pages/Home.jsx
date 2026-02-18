import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://192.168.49.2:31000/api/events/')
      .then(res => {
        setEvents(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Impossible de charger les événements');
        setLoading(false);
      });
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return 'Date à venir';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Concert': 'bg-red-100 text-red-800',
      'Conférence': 'bg-blue-100 text-blue-800',
      'Atelier': 'bg-green-100 text-green-800',
      'Festival': 'bg-purple-100 text-purple-800',
      'Sport': 'bg-orange-100 text-orange-800',
      'default': 'bg-gray-100 text-gray-800'
    };
    return colors[category] || colors.default;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Hero Section - Optionnel mais joli */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            Découvrez les meilleurs événements
          </h1>
          <p className="text-xl text-indigo-100 text-center max-w-3xl mx-auto">
            Concerts, conférences, ateliers et bien plus encore. Trouvez l'événement qui vous correspond.
          </p>
        </div>
      </div>

      {/* Contenu principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* En-tête de la section événements */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Événements à venir
          </h2>
          <Link 
            to="/create" 
            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-indigo-700 transition-all shadow-md"
          >
            <span className="material-icons text-sm">add</span>
            Créer un événement
          </Link>
        </div>

        {/* État de chargement */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          </div>
        )}

        {/* État d'erreur */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-center">
            {error}
          </div>
        )}

        {/* Grille d'événements */}
        {!loading && !error && (
          <>
            {events.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-xl border border-gray-200">
                <span className="material-icons text-6xl text-gray-400 mb-4">
                  event_busy
                </span>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  Aucun événement pour le moment
                </h3>
                <p className="text-gray-500 mb-6">
                  Soyez le premier à créer un événement !
                </p>
                <Link
                  to="/create"
                  className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-indigo-700 transition-all"
                >
                  <span className="material-icons">add</span>
                  Créer un événement
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200 overflow-hidden flex flex-col"
                  >
                    {/* Image de l'événement */}
                    <div className="h-48 bg-gray-200 relative">
                      {event.image ? (
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50">
                          <span className="material-icons text-5xl text-indigo-300">
                            event
                          </span>
                        </div>
                      )}
                      
                      {/* Badge catégorie */}
                      <span className={`absolute top-3 left-3 ${getCategoryColor(event.category_details?.name)} text-xs font-medium px-2.5 py-1 rounded`}>
                        {event.category_details?.name || 'Événement'}
                      </span>
                    </div>

                    {/* Contenu de la carte */}
                    <div className="p-5 flex-1 flex flex-col">
                      {/* Date */}
                      <div className="flex items-center gap-1 text-sm text-gray-500 mb-2">
                        <span className="material-icons text-base">calendar_today</span>
                        <span>{formatDate(event.date)}</span>
                      </div>

                      {/* Titre */}
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                        {event.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-1">
                        {event.description || "Rejoignez-nous pour cet événement unique"}
                      </p>

                      {/* Lieu */}
                      {event.location && (
                        <div className="flex items-center gap-1 text-sm text-gray-500 mb-3">
                          <span className="material-icons text-base">location_on</span>
                          <span className="truncate">{event.location}</span>
                        </div>
                      )}

                      {/* Prix et bouton */}
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <div>
                          <span className="text-xs text-gray-500">Prix</span>
                          <p className="text-lg font-bold text-gray-900">
                            {event.price?.toLocaleString()} FCFA
                          </p>
                        </div>
                        <Link
                          to={`/event/${event.id}`}
                          className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 px-4 py-2 rounded-lg text-sm font-medium transition"
                        >
                          Détails
                          <span className="material-icons text-base">arrow_forward</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Home;