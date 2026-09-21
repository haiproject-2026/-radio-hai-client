export interface FooterLink {
  label: string;
  href: string;
}

export const NAVIGATION_LINKS: FooterLink[] = [
  { label: "Accueil", href: "#" },
  { label: "Actualités", href: "#" },
  { label: "Émissions", href: "#" },
  { label: "Podcasts", href: "#" },
  { label: "Replay", href: "#" },
  { label: "Grille des programmes", href: "#" },
  { label: "À propos", href: "#" },
  { label: "Contact", href: "#" }
];

export const A_PROPOS_LINKS: FooterLink[] = [
  { label: "Qui sommes-nous ?", href: "#" },
  { label: "Notre équipe", href: "#" },
  { label: "Fréquences", href: "#" },
  { label: "Partenaires", href: "#" },
  { label: "Mentions légales", href: "#" },
  { label: "Politique de confidentialité", href: "#" }
];
