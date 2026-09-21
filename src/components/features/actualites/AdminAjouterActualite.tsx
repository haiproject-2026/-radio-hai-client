import React, { useState } from 'react';

export function AdminAjouterActualite() {
  const [titre, setTitre] = useState('');
  const [categorie, setCategorie] = useState('Général');
  const [imageUrl, setImageUrl] = useState('');
  const [contenu, setContenu] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await fetch('http://localhost:3000/actualites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titre, categorie, imageUrl, contenu }),
      });

      if (response.ok) {
        setMessage('✅ L\'actualité a été publiée sur le site !');
        setTitre('');
        setImageUrl('');
        setContenu('');
      } else {
        setMessage('❌ Erreur lors de la publication.');
      }
    } catch (err) {
      setMessage('❌ Impossible de contacter le backend.');
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-md border border-slate-100">
      <h2 className="text-base font-bold text-slate-900 uppercase tracking-wide mb-4">Publier une Actualité</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Titre de l'article</label>
          <input type="text" value={titre} onChange={(e) => setTitre(e.target.value)} className="w-full text-xs p-2.5 border border-slate-200 rounded-lg text-slate-800" required />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Catégorie</label>
          <select value={categorie} onChange={(e) => setCategorie(e.target.value)} className="w-full text-xs p-2.5 border border-slate-200 rounded-lg text-slate-800">
            <option value="Général">Général</option>
            <option value="Musique">Musique</option>
            <option value="Culture">Culture</option>
            <option value="Sport">Sport</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase mb-1">URL de l'image d'illustration</label>
          <input type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="w-full text-xs p-2.5 border border-slate-200 rounded-lg text-slate-800" placeholder="https://example.com" />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Contenu de l'article</label>
          <textarea rows={5} value={contenu} onChange={(e) => setContenu(e.target.value)} className="w-full text-xs p-2.5 border border-slate-200 rounded-lg text-slate-800" required />
        </div>
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3 rounded-xl transition-all shadow-sm">Publier l'article</button>
      </form>
      {message && <div className="mt-4 p-3 rounded-lg text-xs font-semibold bg-blue-50 text-blue-700">{message}</div>}
    </div>
  );
}
