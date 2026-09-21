'use client';

import { useState } from "react";
import { Send, MessageSquare, User, Phone } from "lucide-react";

export default function FormulaireSms(): React.JSX.Element {
  const [nom, setNom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [messageText, setMessageText] = useState("");
  const [statut, setStatut] = useState<{ type: "success" | "error" | null; msg: string }>({ type: null, msg: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatut({ type: null, msg: "" });
    setLoading(true);

    try {
      // CONNEXION RÉSEAU : Envoie des données alignées sur les colonnes de l'entité TypeORM
      const reponse = await fetch("http://localhost:5000/api/messages-auditeurs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nom: nom,
          email: telephone,       // Le numéro est stocké dans la colonne 'email' de votre entité
          sujet: "Dédicace SMS",  // ⚠️ Ajout obligatoire pour correspondre à la colonne 'sujet'
          texte: messageText      // ⚠️ Correction : Correspond à la colonne 'texte' de votre entité
        }),
      });

      if (reponse.ok) {
        setStatut({
          type: "success",
          msg: "✅ Votre message a bien été envoyé à l'équipe de Radio Hai !",
        });
        // Réinitialisation des champs après succès
        setNom("");
        setTelephone("");
        setMessageText("");
      } else {
        setStatut({
          type: "error",
          msg: "❌ Impossible d'enregistrer le message. Réponse incorrecte du serveur.",
        });
      }
    } catch (error) {
      console.error("Erreur réseau formulaire contact :", error);
      setStatut({
        type: "error",
        msg: "❌ Échec de la connexion avec le serveur de la radio.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6 w-full box-border text-left">
      <div>
        <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">
          Envoyer un Dédicace / Message SMS
        </h3>
        <p className="text-xs font-bold text-slate-400 mt-1 leading-relaxed">
          Votre message sera transmis instantanément aux animateurs en studio pour les prochaines émissions.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Champ : Nom d'auditeur */}
        <div className="space-y-1">
          <label className="block text-[10px] font-black text-slate-500 uppercase tracking-wider">
            Nom ou Pseudonyme
          </label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <input
              type="text"
              required
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              placeholder="Ex: Rova"
              className="w-full text-xs p-3 pl-10 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-slate-900 bg-slate-50 font-medium"
            />
          </div>
        </div>

        {/* Champ : Téléphone */}
        <div className="space-y-1">
          <label className="block text-[10px] font-black text-slate-500 uppercase tracking-wider">
            Numéro de téléphone
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <input
              type="tel"
              required
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
              placeholder="Ex: 034 12 345 67"
              className="w-full text-xs p-3 pl-10 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-slate-900 bg-slate-50 font-medium"
            />
          </div>
        </div>

        {/* Champ : Message SMS */}
        <div className="space-y-1">
          <label className="block text-[10px] font-black text-slate-500 uppercase tracking-wider">
            Votre Message / Dédicace
          </label>
          <div className="relative">
            <MessageSquare className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
            <textarea
              required
              rows={4}
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Écrivez votre dédicace en direct pour l'antenne..."
              className="w-full text-xs p-3 pl-10 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-slate-900 bg-slate-50 font-medium resize-none leading-relaxed"
            />
          </div>
        </div>

        {/* Bouton d'envoi d'antenne */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-[#1b75bc] hover:bg-blue-600 text-white font-black text-xs py-3.5 rounded-xl transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider ${
            loading ? "opacity-70 cursor-not-allowed animate-pulse" : ""
          }`}
        >
          <Send className="h-3.5 w-3.5" />
          {loading ? "Envoi en cours..." : "Envoyer mon message au studio 🎙️"}
        </button>
      </form>

      {/* Alerte de statut dynamique */}
      {statut.type && (
        <div
          className={`p-3.5 rounded-xl text-xs font-bold leading-relaxed border ${
            statut.type === "success"
              ? "bg-green-50 text-green-700 border-green-100"
              : "bg-red-50 text-red-700 border-red-100"
          }`}
        >
          {statut.msg}
        </div>
      )}
    </div>
  );
}
