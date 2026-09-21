import React, { useState, useEffect } from 'react';

interface SlotProgramme {
  id?: number;
  heure: string;
  titre: string;
  description: string;
  icone: string;
  ordre: number;
}

export function AdminModifierPlanning() {
  const [planning, setPlanning] = useState<SlotProgramme[]>([]);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(true);

  // 1. Charger le planning depuis le port 5000 de NestJS
  useEffect(() => {
    fetch('http://localhost:5000/radio/planning')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setPlanning(data);
        } else {
          // Si vide, on pré-remplit 5 lignes vides de sécurité
          const lignesVides = Array.from({ length: 5 }, (_, i) => ({
            heure: '', titre: '', description: '', icone: '🎵', ordre: i + 1
          }));
          setPlanning(lignesVides);
        }
      })
      .catch((err) => console.error('Erreur de chargement du planning admin:', err));
  }, []);

  // 2. Gérer le changement de texte dans une case spécifique du tableau
  const handleInputChange = (index: number, champ: keyof SlotProgramme, valeur: string | number) => {
    const nouveauPlanning = [...planning];
    nouveauPlanning[index] = { ...nouveauPlanning[index], [champ]: valeur } as SlotProgramme;
    setPlanning(nouveauPlanning);
  };

  // 3. Envoyer tout le tableau modifié au backend NestJS sur le port 5000
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    try {
      const reponse = await fetch('http://localhost:5000/radio/planning', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(planning),
      });

      if (reponse.ok) {
        setStatus(true);
        setMessage('✅ La grille "À Venir Aujourd\'hui" a été mise à jour !');
      } else {
        setStatus(false);
        setMessage('❌ Erreur lors de l\'enregistrement de la grille.');
      }
    } catch (error) {
      console.error('Détail de l\'erreur de planification backend:', error);
      setStatus(false);
      setMessage('❌ Connexion au serveur backend échouée.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-md border border-slate-100 select-none text-left">
      <div className="mb-4 border-b pb-2">
        <h2 className="text-base font-black text-slate-900 uppercase tracking-wide">
          Panneau Admin - Planification de la Journée
        </h2>
        <p className="text-[11px] text-slate-400 font-medium">
          Modifiez la grille horaire "À venir aujourd'hui" visible en pied de page.
        </p>
      </div>

      <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          {planning.map((slot, index) => (
            <div key={index} className="grid grid-cols-12 gap-2 items-center bg-slate-50 p-3 rounded-xl border border-slate-100">
              
              {/* Case 1 : Heure */}
              <div className="col-span-2">
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Heure</label>
                <input 
                  type="text" 
                  value={slot.heure} 
                  onChange={(e) => handleInputChange(index, 'heure', e.target.value)}
                  className="w-full text-xs p-2 border border-slate-200 rounded-md text-slate-900 focus:outline-none focus:border-blue-500 font-mono font-bold"
                  placeholder="Ex: 12:00"
                  required
                />
              </div>

              {/* Case 2 : Icône */}
              <div className="col-span-1">
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Émoji</label>
                <input 
                  type="text" 
                  value={slot.icone} 
                  onChange={(e) => handleInputChange(index, 'icone', e.target.value)}
                  className="w-full text-xs p-2 border border-slate-200 rounded-md text-center text-slate-900 focus:outline-none"
                  placeholder="🎵"
                  required
                />
              </div>

              {/* Case 3 : Titre de l'Émission */}
              <div className="col-span-4">
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Nom de l'émission</label>
                <input 
                  type="text" 
                  value={slot.titre} 
                  onChange={(e) => handleInputChange(index, 'titre', e.target.value)}
                  className="w-full text-xs p-2 border border-slate-200 rounded-md text-slate-900 focus:outline-none focus:border-blue-500 font-bold"
                  placeholder="Ex: L'INFO EXPRESS"
                  required
                />
              </div>

              {/* Case 4 : Description de l'Émission */}
              <div className="col-span-5">
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Sous-titre / Description</label>
                <input 
                  type="text" 
                  value={slot.description} 
                  onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                  className="w-full text-xs p-2 border border-slate-200 rounded-md text-slate-900 focus:outline-none focus:border-blue-500 font-medium"
                  placeholder="Ex: Toute l'actualité en continu"
                  required
                />
              </div>

            </div>
          ))}
        </div>

        <button 
          type="submit" 
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3 rounded-xl transition-all shadow-sm mt-2 active:scale-95 cursor-pointer"
        >
          Enregistrer et Publier le Planning du Jour 📅
        </button>
      </form>

      {message && (
        <div className={`mt-4 p-3 rounded-lg text-xs font-bold ${status ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {message}
        </div>
      )}
    </div>
  );
}
