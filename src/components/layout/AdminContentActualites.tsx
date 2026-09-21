'use client';

import { useState } from "react";
import { useApp } from "../../contexts/app";

export default function AdminContentActualites() {
  const { ajouterElement } = useApp();
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [station, setStation] = useState("fianarantsoa");
  const [categorie, setCategorie] = useState("Madagascar");
  const [estAlaUne, setEstAlaUne] = useState(false);

  const gererSoumissionManuelle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!titre.trim() || !description.trim()) return;

    // ✅ Toutes les propriétés sont désormais valides pour Omit<ElementMenu, "id">
    await ajouterElement("actualites", {
      titre,
      description,
      statut: "publie",
      provenance: "admin", 
      categorie: categorie as 'Monde' | 'Madagascar' | 'Politique' | 'Économie' | 'Sport' | 'Culture' | 'Technologie' | 'Santé',
      estAlaUne,
      date: new Date().toLocaleDateString("fr-FR"),
      station: station as 'fianarantsoa' | 'ambalavao' | 'all',
    });

    setTitre("");
    setDescription("");
    setEstAlaUne(false);
    alert("Actualité officielle publiée de manière permanente !");
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white border border-gray-100 rounded-2xl shadow-xs text-left box-border">
      <div className="mb-5">
        <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Publication Éditoriale</h2>
        <p className="text-xs text-slate-400 mt-1">Les publications rédigées ici restent fixes et indépendantes du défilement automatique.</p>
      </div>

      <form onSubmit={gererSoumissionManuelle} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-black uppercase text-slate-400 tracking-wider">Station cible</label>
            <select value={station} onChange={(e) => setStation(e.target.value)} className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-white font-bold text-slate-700">
              <option value="fianarantsoa">Fianarantsoa (97.6 MHz)</option>
              <option value="ambalavao">Ambalavao</option>
              <option value="all">Toutes</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-black uppercase text-slate-400 tracking-wider">Catégorie</label>
            <select value={categorie} onChange={(e) => setCategorie(e.target.value)} className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-white font-bold text-slate-700">
              <option value="Madagascar">Madagascar</option>
              <option value="Monde">Monde</option>
              <option value="Politique">Politique</option>
              <option value="Sport">Sport</option>
              <option value="Culture">Culture</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-black uppercase text-slate-400 tracking-wider">Titre</label>
          <input type="text" value={titre} onChange={(e) => setTitre(e.target.value)} placeholder="Titre de la note officielle..." className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#ea7333] font-semibold text-slate-700" />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-black uppercase text-slate-400 tracking-wider">Contenu du message</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Écrivez votre contenu..." rows={4} className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#ea7333] font-medium text-slate-700" />
        </div>

        <div className="flex items-center gap-3 p-3 bg-slate-50 border border-gray-100 rounded-xl">
          <input type="checkbox" id="alaune" checked={estAlaUne} onChange={(e) => setEstAlaUne(e.target.checked)} className="h-4 w-4 accent-[#ea7333] cursor-pointer" />
          <label htmlFor="alaune" className="text-xs font-bold text-slate-700 cursor-pointer select-none">DÉFINIR COMME ARTICLE À LA UNE PRINCIPAL</label>
        </div>

        <button type="submit" className="w-full h-11 bg-[#1d4461] hover:bg-slate-800 text-white font-black uppercase text-xs tracking-wider rounded-xl transition-colors">
          Épingler l'article sur le site
        </button>
      </form>
    </div>
  );
}
