import React, { useState, useEffect } from 'react';
import { Film, Play } from 'lucide-react';
import { apiService } from '../services/api';
import { ViewScreen, Documentary } from '../types';

interface DocumentariesListScreenProps {
  onNavigate: (screen: ViewScreen) => void;
}

export const DocumentariesListScreen: React.FC<DocumentariesListScreenProps> = ({ onNavigate }) => {
  const [documentaries, setDocumentaries] = useState<Documentary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocumentaries = async () => {
      const series = await apiService.getSeries();
      setDocumentaries(series);
      setLoading(false);
    };
    fetchDocumentaries();
  }, []);

  if (loading) {
    return <div className="p-8 text-center text-[#68655D]">Chargement des séries...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-28 text-[#1C1917]">
      {/* Grille des séries avec accès distinct à la page de série et aux duos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {documentaries.map((doc) => (
          <div 
            key={doc.id}
            id={`series-card-pure-${doc.id}`}
            className="group bg-[#FFFFFF] rounded-3xl border border-[#E7E5E4] hover:border-[#C89B3C] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col"
          >
            {/* Cover Image with Title */}
            <div 
              onClick={() => onNavigate({ type: 'documentary_detail', documentaryId: doc.id })}
              className="relative h-64 sm:h-72 overflow-hidden cursor-pointer"
            >
              <img
                src={doc.posterUrl || doc.coverImage}
                alt={doc.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
              />
              {/* Voile léger pour préserver la clarté et l'éclat de l'affiche */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
              
              {/* Title only */}
              <div className="absolute bottom-5 left-5 right-5 text-white drop-shadow-md">
                <h2 className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight group-hover:text-[#D9AF52] transition-colors">
                  {doc.title}
                </h2>
              </div>
            </div>

            {/* Synopsis & Actions */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <p className="text-sm text-[#68655D] leading-relaxed font-light line-clamp-3">
                {doc.description}
              </p>

              {/* Deux boutons distincts, sobres et élégants */}
              <div className="pt-3 border-t border-[#E7E5E4] flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => onNavigate({ type: 'documentary_detail', documentaryId: doc.id })}
                  className="px-4 py-2 rounded-full bg-stone-100 hover:bg-stone-200 text-[#1C1917] text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
                  title="Consulter l'équipe, les producteurs et les détails de la série"
                >
                  <Film className="w-3.5 h-3.5 text-[#A2482B]" />
                  <span>Voir la série</span>
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate({ type: 'duo_feed', selectedDocId: doc.id })}
                  className="px-4 py-2 rounded-full bg-[#A2482B] hover:bg-[#8A3B22] text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-95"
                  title="Regarder les épisodes 9:16 en miroir"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Explorer les duos</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
