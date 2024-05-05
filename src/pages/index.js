import React, { useState } from 'react';

const AdressesPage = () => {
  const [adresses, setAdresses] = useState([
    {
      id: 1,
      adresse: "123 Rue de la Paix, Paris",
      lieuDit: "Chez Pierre",
      pays: "France",
      type: "restaurant",
      cuisine: "français"
    },
    {
      id: 2,
      adresse: "456 Avenue des Champs-Élysées, Paris",
      lieuDit: "Le Louvre",
      pays: "France",
      type: "musée"
    },
    {
      id: 3,
      adresse: "789 Via Veneto, Rome",
      lieuDit: "Trattoria Mario",
      pays: "Italie",
      type: "restaurant",
      cuisine: "italien"
    }
  ]);

  const [typeFilter, setTypeFilter] = useState('');
  const [cuisineFilter, setCuisineFilter] = useState('');

  const renderFilteredAdresses = () => {
    let filteredAdresses = adresses;

    if (typeFilter) {
      filteredAdresses = filteredAdresses.filter(adresse => adresse.type === typeFilter);
    }

    if (typeFilter === 'restaurant' && cuisineFilter) {
      filteredAdresses = filteredAdresses.filter(adresse => adresse.cuisine === cuisineFilter);
    }

    return filteredAdresses.map(adresse => (
      <tr key={adresse.id}>
        <td className="border px-4 py-2">{adresse.adresse}</td>
        <td className="border px-4 py-2">{adresse.lieuDit}</td>
        <td className="border px-4 py-2">{adresse.pays}</td>
        <td className="border px-4 py-2">{adresse.type}</td>
        {adresse.type === 'restaurant' && <td className="border px-4 py-2">{adresse.cuisine}</td>}
      </tr>
    ));
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="mb-4">
        <label className="mr-2">Type :</label>
        <select className="border rounded px-2 py-1" value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
          <option value="">Tous</option>
          <option value="restaurant">Restaurant</option>
          <option value="bar">Bar</option>
          <option value="musée">Musée</option>
        </select>

        {typeFilter === 'restaurant' && (
          <div className="mt-2">
            <label className="mr-2">Cuisine :</label>
            <select className="border rounded px-2 py-1" value={cuisineFilter} onChange={e => setCuisineFilter(e.target.value)}>
              <option value="">Tous</option>
              <option value="français">Français</option>
              <option value="italien">Italien</option>
            </select>
          </div>
        )}
      </div>

      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Adresse</th>
            <th className="border px-4 py-2">Lieu-Dit</th>
            <th className="border px-4 py-2">Pays</th>
            <th className="border px-4 py-2">Type</th>
            {typeFilter === 'restaurant' && <th className="border px-4 py-2">Cuisine</th>}
          </tr>
        </thead>
        <tbody>
          {renderFilteredAdresses()}
        </tbody>
      </table>
    </div>
  );
};

export default AdressesPage;
