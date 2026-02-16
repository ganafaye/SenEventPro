import { useState } from "react";
import axios from "axios";

export default function CreateEvent({ onEventCreated }) {
  const [form, setForm] = useState({
    title: "",
    date: "",
    price: "",
    category: "1", 
    location: "1", 
    organizer: "1", 
    description: "" // Ce champ ne doit pas être vide à l'envoi
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Vérification de sécurité avant l'envoi
    if (!form.description.trim()) {
      alert("La description est obligatoire !");
      return;
    }

    const dataToSend = {
      ...form,
      price: parseFloat(form.price)
    };

    axios
      .post("http://localhost:8000/api/events/", dataToSend)
      .then((res) => {
        alert("Événement créé avec succès !");
        // Reset du formulaire
        setForm({
            title: "", date: "", price: "", 
            category: "1", location: "1", organizer: "1", 
            description: ""
        });
        if (onEventCreated) onEventCreated(); 
      })
      .catch((err) => {
        console.error("Détails complets de l'erreur:", err.response.data);
        alert("Erreur de validation : " + JSON.stringify(err.response.data));
      });
  };

  return (
    <div className="max-w-xl mx-auto py-10 bg-white p-8 rounded-3xl shadow-lg border border-slate-100 my-10">
      <h2 className="text-2xl font-bold mb-6 text-slate-800">Ajouter un événement</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* ... Titre, Date, Prix (inchangés) ... */}
        <div>
          <label className="block text-sm font-semibold mb-1">Titre</label>
          <input type="text" name="title" value={form.title} onChange={handleChange} className="w-full border-2 border-slate-50 p-3 rounded-xl outline-none focus:border-[#38e07b]" required />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input type="date" name="date" value={form.date} onChange={handleChange} className="border-2 border-slate-50 p-3 rounded-xl" required />
          <input type="number" name="price" placeholder="Prix" value={form.price} onChange={handleChange} className="border-2 border-slate-50 p-3 rounded-xl" required />
        </div>

        {/* CHAMP DESCRIPTION CORRIGÉ */}
        <div>
          <label className="block text-sm font-semibold mb-1">Description (Obligatoire)</label>
          <textarea 
            name="description" 
            value={form.description} 
            onChange={handleChange} 
            placeholder="Détails de l'événement..."
            className="w-full border-2 border-slate-50 p-3 rounded-xl outline-none focus:border-[#38e07b] min-h-[100px]"
            required // Empêche l'envoi si vide côté navigateur
          ></textarea>
        </div>

        {/* Champs cachés ou par défaut pour category/location/organizer */}
        <div className="flex gap-2 text-[10px] text-gray-400">
            <span>Catégorie ID: {form.category}</span>
            <span>Lieu ID: {form.location}</span>
        </div>

        <button type="submit" className="w-full bg-[#38e07b] text-white py-4 rounded-xl font-bold hover:shadow-xl transition-all">
          Enregistrer l'événement
        </button>
      </form>
    </div>
  );
}