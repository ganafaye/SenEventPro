import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow px-8 py-4 flex justify-between">
      <h1 className="text-2xl font-bold text-green-600">
          Projet Systeme Repartis
      </h1>

      <div className="space-x-4">
        <Link to="/" className="text-gray-700 hover:text-green-600">
          Voir les événements
        </Link>

        <Link
          to="/create"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Créer un événement
        </Link>
      </div>
    </nav>
  );
}
