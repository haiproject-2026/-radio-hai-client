'use client';

import React, { useState } from 'react';

export function AdminAjouterAnimateur(): React.JSX.Element {
  const [nom, setNom] = useState('');
  const [role, setRole] = useState('');
  const [biographie, setBiographie] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    const formData = new FormData();
    formData.append('nom', nom);
    formData.append('role', role || 'Antenne');
    formData.append('bio', biographie);
    if (file) {
      formData.append('file', file);
    }

    try {
      const response = await fetch('http://localhost:5000/api/animateurs', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setMessage('✅ L\'animateur a bien été ajouté à l\'équipe avec sa photo !');
        setNom('');
        setRole('');
        setBiographie('');
        setFile(null);
        if (typeof window !== 'undefined') {
          window.location.reload();
        }
      } else {
        setMessage('❌ Erreur lors de l\'enregistrement sur le serveur.');
      }
    } catch (err) {
      // 🌟 CORRECTION : Utilisation de la variable err pour satisfaire la règle @typescript-eslint/no-unused-vars
      console.error('Erreur réseau lors de la création de l\'animateur :', err);
      setMessage('❌ Impossible de joindre le serveur NestJS sur le port 5000.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-md border border-slate-100 text-black font-sans text-left">
      <h2 className="text-base font-black text-slate-900 uppercase tracking-wide mb-4">Ajouter un membre à l'équipe</h2>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Nom / Pseudonyme</label>
            <input 
              type="text" 
              value={nom} 
              onChange={(e) => setNom(e.target.value)} 
              className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-cyan-500" 
              placeholder="Ex: Animateur Star"
              required 
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Rôle / Émission</label>
            <input 
              type="text" 
              value={role} 
              onChange={(e) => setRole(e.target.value)} 
              className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-cyan-500" 
              placeholder="Ex: Journaliste / Culture Vibes" 
              required 
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Photo de profil (Fichier Image)</label>
          <input 
            type="file" 
            accept="image/*"
            onChange={handleFileChange} 
            className="w-full text-xs p-2 bg-white border border-slate-200 rounded-lg text-slate-800 file:mr-4 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-bold file:bg-cyan-50 file:text-cyan-700 hover:file:bg-cyan-100 cursor-pointer" 
            required
          />
          <p className="text-[10px] text-slate-400 mt-1">Sélectionnez un fichier JPG ou PNG depuis votre ordinateur.</p>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Courte Biographie</label>
          <textarea 
            rows={4} 
            value={biographie} 
            onChange={(e) => setBiographie(e.target.value)} 
            className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-cyan-500" 
            placeholder="Écrivez quelques mots sur le parcours de l'animateur..."
            required 
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="bg-cyan-600 hover:bg-cyan-700 text-white font-black text-xs py-3 rounded-xl transition-all shadow-sm uppercase tracking-wider disabled:opacity-50 disabled:cursor-wait"
        >
          {loading ? "Enregistrement en cours..." : "Enregistrer l'animateur"}
        </button>
      </form>

      {message && (
        <div className="mt-4 p-3 rounded-lg text-xs font-bold bg-slate-100 text-slate-800 border border-slate-200">
          {message}
        </div>
      )}
    </div>
  );
}
