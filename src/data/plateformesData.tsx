import { Laptop, Smartphone, Apple, Globe, Radio as RadioIcon, Play, Disc, Music4 } from "lucide-react";

export interface PlateformeItem {
  label: string;
  icone: React.JSX.Element;
  url: string;
}

export const plateformes: PlateformeItem[] = [
  { 
    label: "Site Web", 
    icone: <Globe className="h-4 w-4 text-blue-600 group-hover:scale-110 transition-transform" />, 
    url: "https://radiohai.com" 
  },
  { 
    label: "Android", 
    icone: <Smartphone className="h-4 w-4 text-green-600 group-hover:scale-110 transition-transform" />, 
    url: "https://google.com" 
  },
  { 
    label: "iOS", 
    icone: <Apple className="h-4 w-4 text-slate-800 group-hover:scale-110 transition-transform" />, 
    url: "https://apple.com" 
  },
  { 
    label: "TuneIn", 
    icone: <RadioIcon className="h-4 w-4 text-teal-600 group-hover:scale-110 transition-transform" />, 
    url: "https://tunein.com" 
  },
  { 
    label: "Radio FM", 
    icone: <Disc className="h-4 w-4 text-red-600 group-hover:scale-110 transition-transform" />, 
    url: "https://radiohai.com" 
  },
  { 
    label: "Google", 
    icone: <Play className="h-4 w-4 text-amber-500 group-hover:scale-110 transition-transform" />, 
    url: "https://google.com" 
  },
  { 
    label: "Spotify", 
    icone: <Music4 className="h-4 w-4 text-green-500 group-hover:scale-110 transition-transform" />, 
    url: "https://spotify.com" 
  },
  { 
    label: "Deezer", 
    icone: <Laptop className="h-4 w-4 text-purple-600 group-hover:scale-110 transition-transform" />, 
    url: "https://deezer.com" 
  }
];
