import React, { useState, useEffect } from "react";
import axios from "axios";
import EventCard from "../components/EventCard";

export default function EventsPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/events/")
      .then((res) => setEvents(res.data.results || res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">

      {/* HERO SECTION */}
      <div className="bg-green-600 py-12 px-6 text-white">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">
            Mini application web gestion d'événements 🎉
          </h1>
          <p className="text-lg opacity-90">
            Concerts, conférences, formations et plus encore.
          </p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto py-12 px-6">

        {/* Header + compteur */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-10 gap-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            Tous les événements
          </h2>

          <div className="bg-white shadow px-4 py-2 rounded-lg text-gray-600">
            {events.length} événement{events.length > 1 ? "s" : ""}
          </div>
        </div>

        {/* Barre de recherche (design only) */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Rechercher un événement..."
            className="w-full md:w-1/3 border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Grid des événements */}
        {events.length === 0 ? (
          <div className="bg-white shadow rounded-xl p-10 text-center">
            <p className="text-gray-500 text-lg">
              Aucun événement disponible pour le moment.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
