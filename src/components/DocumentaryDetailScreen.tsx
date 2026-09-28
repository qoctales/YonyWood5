import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  ArrowRight,
  Sparkles, 
  Play,
  Pause,
  Film,
  HelpCircle,
  Clock,
  Star,
  Volume2,
  VolumeX,
  Video
} from 'lucide-react';
import { DOCUMENTARIES, getCustomDocumentaries } from '../data/mockData';
import { ViewScreen, Documentary } from '../types';

interface DocumentaryDetailScreenProps {
  documentaryId: string;
  onNavigate: (screen: ViewScreen) => void;
}

export const DocumentaryDetailScreen: React.FC<DocumentaryDetailScreenProps> = ({ 
  documentaryId, 
  onNavigate 
}) => {
  const [docList, setDocList] = useState<Documentary[]>(() => getCustomDocumentaries());
  const [playingVideoIndex, setPlayingVideoIndex] = useState<number | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const handleUpdate = () => {
      setDocList(getCustomDocumentaries());
    };
    window.addEventListener('yonywood_series_updated', handleUpdate);
    return () => window.removeEventListener('yonywood_series_updated', handleUpdate);
  }, []);

  const doc = docList.find(d => d.id === documentaryId) || docList[0] || DOCUMENTARIES[0];

  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex flex-col justify-between py-6 px-4 sm:px-6 max-w-5xl mx-auto text-[#1C1917] font-sans">
      
      {/* 1. TOP BAR: Navigation & Sélecteur de séries */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#E7E5E4] pb-3">
          <button
            onClick={() => onNavigate({ type: 'documentaries' })}
            className="text-xs font-semibold text-[#8B6845] hover:text-[#1C1917] flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Toutes les séries</span>
          </button>

          <button
            onClick={() => onNavigate({ type: 'duo_feed', selectedDocId: doc.id })}
            className="text-xs font-semibold text-[#A2482B] hover:text-[#8A3B22] flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>Explorer les duos de la série</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Sélecteur de séries sobre */}
        <div className="flex items-center justify-center gap-1.5 flex-wrap pt-1">
          {docList.map((item) => {
            const isSelected = item.id === doc.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setPlayingVideoIndex(null);
                  onNavigate({ type: 'documentary_detail', documentaryId: item.id });
                }}
                className={`px-3.5 py-1 rounded-full text-xs transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#1C1917] text-[#FFFFFF] font-semibold shadow-xs'
                    : 'text-[#68655D] hover:text-[#1C1917] hover:bg-[#E7E5E4]/50 border border-transparent'
                }`}
              >
                {item.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. EN-TÊTE PRINCIPAL AVEC AFFICHE OFFICIELLE EN FORMAT VERTICAL 9/16 */}
      <div className="py-8 sm:py-12 text-center space-y-6 max-w-3xl mx-auto flex flex-col items-center">
        
        {/* AFFICHE OFFICIELLE 9/16 */}
        <div className="relative w-44 sm:w-56 aspect-[9/16] rounded-3xl overflow-hidden shadow-2xl border-2 border-stone-200 bg-stone-900 group">
          <img 
            src={doc.posterUrl || doc.coverImage} 
            alt={doc.title} 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/assets/posters/jesus-esu.png';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
          
          <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-[#A2482B] text-white text-[9px] font-mono font-bold tracking-widest uppercase">
            9:16
          </span>

          <span className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-[10px] font-mono tracking-widest text-white uppercase whitespace-nowrap">
            AFFICHE OFFICIELLE
          </span>
        </div>

        {/* Thématique / Focus */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#A2482B]/10 border border-[#A2482B]/20 text-[#A2482B] text-xs font-semibold tracking-wide">
          <Sparkles className="w-3.5 h-3.5 text-[#A2482B]" />
          <span>Thématique • {doc.centralQuestion}</span>
        </div>

        {/* Titre officiel de la série */}
        <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1C1917]">
          {doc.title}
        </h1>

        {/* Slogan */}
        <p className="font-editorial italic text-lg sm:text-xl text-[#8B6845] max-w-xl mx-auto leading-relaxed">
          « {doc.subtitle} »
        </p>

        {/* Effigies référentes de la série */}
        {doc.effigies && doc.effigies.length > 0 && (
          <div className="flex items-center justify-center gap-3 flex-wrap pt-1">
            <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-[#C89B3C] fill-[#C89B3C]" />
              <span>Effigies :</span>
            </span>
            {doc.effigies.map(eff => (
              <div 
                key={eff.id}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs text-stone-800"
              >
                <img 
                  src={eff.photoUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80'} 
                  alt={eff.name}
                  className="w-5 h-5 rounded-full object-cover"
                />
                <span className="font-semibold">{eff.name}</span>
                {eff.status === 'EFFIGIE_PRINCIPALE' && (
                  <span className="text-[9px] bg-[#C89B3C] text-white px-1.5 py-0.2 rounded-full font-bold">
                    1ère Vidéo
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Synopsis détaillé */}
        <p className="text-sm sm:text-base text-[#68655D] leading-relaxed max-w-2xl mx-auto font-light">
          {doc.description}
        </p>

        {/* Bouton d'accès aux duos */}
        <div className="pt-2 flex justify-center">
          <button
            onClick={() => onNavigate({ type: 'duo_feed', selectedDocId: doc.id })}
            className="px-6 py-2.5 rounded-2xl bg-[#A2482B] hover:bg-[#8A3B22] text-[#FFFFFF] text-xs font-semibold flex items-center gap-2 transition-all shadow-md shadow-[#A2482B]/20 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Accéder aux duos de cette série</span>
          </button>
        </div>
      </div>

      {/* 3. GALERIE DES ÉPISODES & MINI-VIDÉOS EN FORMAT VERTICAL 9/16 */}
      <div className="py-8 border-t border-stone-200 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-editorial font-bold text-[#1C1917] flex items-center gap-2">
              <Film className="w-5 h-5 text-[#A2482B]" />
              <span>Épisodes & Mini-Vidéos de Présentation (Format 9/16)</span>
            </h2>
            <p className="text-xs text-[#68655D] mt-0.5">
              Chaque question directrice est présentée en format vertical 9/16 par l'effigie ou le passeur de la série.
            </p>
          </div>

          <span className="text-xs text-[#A2482B] font-bold">
            {doc.episodeCount || doc.questions?.length || 5} chapitres 9/16
          </span>
        </div>

        {/* Grille des épisodes au format 9/16 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {doc.questions?.map((q, idx) => {
            const isPlaying = playingVideoIndex === idx;
            return (
              <div 
                key={idx}
                className="bg-white rounded-3xl border border-stone-200 hover:border-[#A2482B] overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col group"
              >
                {/* AFFICHE OU LECTEUR MINI-VIDÉO VERTICALE 9/16 */}
                <div className="relative aspect-[9/16] w-full overflow-hidden bg-stone-950">
                  {isPlaying && q.videoUrl ? (
                    <video
                      src={q.videoUrl}
                      autoPlay
                      loop
                      muted={isMuted}
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img 
                      src={q.posterUrl || doc.coverImage} 
                      alt={q.title}
                      className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = doc.coverImage;
                      }}
                    />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30 pointer-events-none" />
                  
                  {/* Badge numéro d'épisode */}
                  <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-[#A2482B] text-white text-[10px] font-mono font-bold tracking-wider shadow-sm">
                    ÉPISODE {q.number || String(idx + 1).padStart(2, '0')}
                  </div>

                  {q.audioDuration && (
                    <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[9px] font-mono text-white flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5" />
                      <span>{q.audioDuration}</span>
                    </div>
                  )}

                  {/* Bouton pour lancer la mini-vidéo 9/16 de la question */}
                  {q.videoUrl && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => setPlayingVideoIndex(isPlaying ? null : idx)}
                        className="w-12 h-12 rounded-full bg-[#A2482B]/90 hover:bg-[#A2482B] text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95 cursor-pointer border border-white/30"
                        title={isPlaying ? "Arrêter la vidéo" : "Lancer la mini-vidéo de la question"}
                      >
                        {isPlaying ? (
                          <Pause className="w-5 h-5 fill-white" />
                        ) : (
                          <Play className="w-5 h-5 fill-white ml-0.5" />
                        )}
                      </button>
                    </div>
                  )}

                  {/* Bouton de contrôle du son */}
                  {isPlaying && (
                    <button
                      type="button"
                      onClick={() => setIsMuted(!isMuted)}
                      className="absolute bottom-16 right-3 w-8 h-8 rounded-full bg-black/70 text-white flex items-center justify-center cursor-pointer"
                    >
                      {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    </button>
                  )}

                  <div className="absolute bottom-3 left-3 right-3 text-white pointer-events-none">
                    <h3 className="font-bold text-base tracking-tight drop-shadow-md line-clamp-1">
                      {q.title}
                    </h3>
                    {q.effigieName && (
                      <p className="text-[11px] text-amber-200 flex items-center gap-1 mt-0.5">
                        <Star className="w-3 h-3 fill-amber-200" />
                        <span>Présenté par {q.effigieName}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Question posée dans l'épisode */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3 bg-white">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#A2482B] uppercase tracking-wider">
                      <HelpCircle className="w-3 h-3" />
                      <span>Question posée :</span>
                    </div>
                    <p className="text-xs text-[#57534E] leading-relaxed italic line-clamp-3">
                      « {q.prompt} »
                    </p>
                  </div>

                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                    <button
                      onClick={() => onNavigate({ type: 'duo_feed', selectedDocId: doc.id })}
                      className="text-xs font-semibold text-[#A2482B] hover:text-[#8A3B22] flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <span>Voir les récits</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>

                    {q.videoUrl && (
                      <span className="text-[10px] text-stone-400 font-mono flex items-center gap-1">
                        <Video className="w-3 h-3 text-[#A2482B]" />
                        <span>Vidéo 9/16</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. FOOTER SOBRE */}
      <div className="text-center text-[11px] text-[#8B6845]/70 pt-6 pb-2">
        YONYWOOD • Récits d'humanité et de transmission
      </div>

    </div>
  );
};
