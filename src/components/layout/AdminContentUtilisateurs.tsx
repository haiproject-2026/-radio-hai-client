'use client';

import { useState, useEffect } from 'react';
import { PlusCircle, Trash2, Loader2 } from 'lucide-react';

interface MembreEquipe { id: string; nom: string; role: 'Administrateur' | 'Journaliste' | 'Responsable Podcast' | 'Animateur'; permission: string; }
interface CollaborateurResponseNest { id: string | number; nom: string; role: string; permission: string; }

export default function AdminContentUtilisateurs() {
  const [nom, setNom] = useState('');
  const [role, setRole] = useState<MembreEquipe['role']>('Animateur');
  const [membres, setMembres] = useState<MembreEquipe[]>([]);
  const [chargement, setChargement] = useState(false);
  const [actionEnCours, setActionEnCours] = useState(false);

  const chargerMembres = async () => {
    try {
      setChargement(true);
      const res = await fetch('http://localhost:3000/utilisateurs');
      if (!res.ok) throw new Error();
      const data = await res.json() as unknown as CollaborateurResponseNest[];
      
      if (Array.isArray(data)) {
        const formatActu = data.map((item: CollaborateurResponseNest) => ({
          id: String(item.id),
          nom: String(item.nom || ''),
          role: (['Administrateur', 'Journaliste', 'Responsable Podcast', 'Animateur'].includes(item.role) ? item.role : 'Animateur') as MembreEquipe['role'],
          permission: String(item.permission || 'LECTURE SEULE')
        }));
        setMembres(formatActu);
      }
    } catch {
      setMembres([
        { id: '1', nom: 'ÉQUIPE FIANARANTSOA', role: 'Administrateur', permission: 'ACCÈS TOTAL' },
        { id: '2', nom: 'RESPONSABLE PODCAST HAI', role: 'Responsable Podcast', permission: 'GESTION AUDIO' },
        { id: '3', nom: 'ANIMATEUR MATINALE', role: 'Animateur', permission: 'DIFFUSION LIVE' }
      ]);
    } finally {
      setChargement(false);
    }
  };

  useEffect(() => {
    const demarrerLectureMembres = async () => { await chargerMembres(); };
    void demarrerLectureMembres();
  }, []);

  const gererAjoutMembre = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nom.trim()) return;

    let permission = 'LECTURE SEULE';
    if (role === 'Administrateur') permission = 'ACCÈS TOTAL';
    if (role === 'Responsable Podcast') permission = 'GESTION AUDIO';
    if (role === 'Journaliste') permission = 'PUBLICATION NEWS';
    if (role === 'Animateur') permission = 'DIFFUSION LIVE';

    try {
      setActionEnCours(true);
      const res = await fetch('http://localhost:3000/utilisateurs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nom, role, permission }),
      });
      if (!res.ok) throw new Error();
      setNom(''); await chargerMembres();
    } catch {
      setMembres((prev) => [...prev, { id: String(Date.now()), nom: nom.toUpperCase(), role, permission }]);
      setNom('');
    } finally {
      setActionEnCours(false);
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-sm font-black text-black uppercase tracking-wider border-b border-gray-100 pb-2">👥 GESTION DE L'ÉQUIPE</h3>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <form onSubmit={gererAjoutMembre} className="bg-gray-50 border border-gray-200 p-4 rounded-xl space-y-4">
          <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} placeholder="NOM COMPLET..." className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs font-bold text-black focus:outline-none" />
          <select value={role} onChange={(e) => setRole(e.target.value as MembreEquipe['role'])} className="w-full bg-white border border-gray-200 rounded-lg px-2 py-2 text-xs font-black text-slate-700 uppercase focus:outline-none"><option value="Animateur">🎙️ Animateur</option><option value="Responsable Podcast">🎙️ Responsable Podcast</option><option value="Journaliste">📰 Journaliste</option><option value="Administrateur">🔒 Administrateur</option></select>
          <button type="submit" disabled={actionEnCours} className="w-full h-10 bg-[#16354D] text-white text-xs font-black uppercase rounded-lg flex items-center justify-center gap-2">{actionEnCours ? <Loader2 className="h-4 w-4 animate-spin" /> : <PlusCircle className="h-4 w-4" />}Enregistrer</button>
        </form>
        <div className="xl:col-span-2 space-y-2">
          {chargement ? <p className="text-xs font-bold animate-pulse text-gray-400">LECTURE DU PERSONNEL...</p> : (
            <div className="divide-y divide-gray-100 max-h-[300px] overflow-y-auto pr-1">{membres.map(m => (
              <div key={m.id} className="py-2.5 flex items-center justify-between gap-4"><div className="min-w-0"><h5 className="text-xs font-black text-black uppercase">{m.nom}</h5><span className="text-[9px] font-bold text-gray-400 uppercase">{m.role} • {m.permission}</span></div>
              <button onClick={() => setMembres(membres.filter(x => x.id !== m.id))} className="text-gray-400 hover:text-red-500 border-none bg-transparent cursor-pointer"><Trash2 className="h-4 w-4" /></button></div>
            ))}</div>
          )}
        </div>
      </div>
    </div>
  );
}
