import React, { useState, useRef, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  Lock, 
  LogOut, 
  ShieldCheck,
  KeyRound,
  Play,
  Pause,
  Bell,
  Coins,
  Clapperboard,
  Tv,
  MessageSquare,
  Users,
  BellRing
} from 'lucide-react';
import { ViewScreen } from '../types';
import { DOCUMENTARIES } from '../data/mockData';

interface SettingsScreenProps {
  onNavigate: (screen: ViewScreen) => void;
  returnTo?: 'profile' | 'duo_feed';
  selectedDocFilter: string[];
  onUpdateDocFilter: (filter: string[]) => void;
  language: string;
  onUpdateLanguage: (lang: string) => void;
}

type SettingsTab = 'series' | 'messages' | 'lang_sec';

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  onNavigate,
  returnTo = 'profile',
  selectedDocFilter,
  onUpdateDocFilter,
  language,
  onUpdateLanguage
}) => {
  // 3 onglets thématiques : "Choix des séries", "Messages & Alertes", et "Compte & Sécurité"
  const [activeTab, setActiveTab] = useState<SettingsTab>('series');

  // État du carrousel des séries
  const [activeSeriesIndex, setActiveSeriesIndex] = useState(0);

  // État du lecteur vidéo sur l'affiche
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Préférences de messagerie & notifications : ouvert à tous les utilisateurs de Yonywood par défaut
  const [messagePermission, setMessagePermission] = useState<'none' | 'invitation' | 'all'>(() => {
    return (localStorage.getItem('yonywood_msg_permission') as 'none' | 'invitation' | 'all') || 'all';
  });
  const [pushNewMessage, setPushNewMessage] = useState<boolean>(() => {
    const saved = localStorage.getItem('yonywood_push_msg');
    return saved !== null ? saved === 'true' : true;
  });
  const [messagePreview, setMessagePreview] = useState<boolean>(() => {
    const saved = localStorage.getItem('yonywood_msg_preview');
    return saved !== null ? saved === 'true' : true;
  });

  // Alertes & Préférences de coproduction
  const [alertFunding, setAlertFunding] = useState(true);
  const [alertNewEpisodes, setAlertNewEpisodes] = useState(true);
  const [alertDuocumentaires, setAlertDuocumentaires] = useState(true);
  const [autoPlayOnSwipe, setAutoPlayOnSwipe] = useState<boolean>(() => {
    const saved = localStorage.getItem('yonywood_autoplay');
    return saved !== null ? saved === 'true' : true;
  });

  // Configuration du compte
  const [userEmail, setUserEmail] = useState('finagnonakimnonvide@gmail.com');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [feedbackToast, setFeedbackToast] = useState<string | null>(null);

  // Gestion ultra-fluide du swipe (tactile mobile + souris desktop)
  const dragStartX = useRef<number | null>(null);
  const dragCurrentX = useRef<number | null>(null);
  const hasDragged = useRef(false);

  // 4 langues exclusives
  const SUPPORTED_LANGUAGES = [
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'pt', label: 'Português', flag: '🇵🇹' }
  ];

  // Filtre effectif : toutes les séries sont cochées par défaut
  const effectiveFilter = (selectedDocFilter && selectedDocFilter.length > 0)
    ? selectedDocFilter
    : DOCUMENTARIES.map(d => d.id);

  // Réinitialiser la lecture vidéo lors du changement de série ou d'onglet
  useEffect(() => {
    setIsPlaying(false);
  }, [activeSeriesIndex, activeTab]);

  const showToast = (msg: string) => {
    setFeedbackToast(msg);
    setTimeout(() => {
      setFeedbackToast(null);
    }, 2500);
  };

  const handleToggleSeries = (docId: string) => {
    let next: string[];
    if (effectiveFilter.includes(docId)) {
      next = effectiveFilter.filter(id => id !== docId);
    } else {
      next = [...effectiveFilter, docId];
    }
    onUpdateDocFilter(next);
  };

  const handlePrevSeries = () => {
    setIsPlaying(false);
    setActiveSeriesIndex(prev => (prev > 0 ? prev - 1 : DOCUMENTARIES.length - 1));
  };

  const handleNextSeries = () => {
    setIsPlaying(false);
    setActiveSeriesIndex(prev => (prev < DOCUMENTARIES.length - 1 ? prev + 1 : 0));
  };

  const toggleVideoPlayback = () => {
    if (hasDragged.current) return;

    if (!videoRef.current) {
      setIsPlaying(!isPlaying);
      return;
    }

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(false);
      });
    }
  };

  // --- Gestion du SWIPE TACTILE & POINTER (Desktop + Mobile) ---
  const handlePointerDown = (clientX: number) => {
    dragStartX.current = clientX;
    dragCurrentX.current = clientX;
    hasDragged.current = false;
  };

  const handlePointerMove = (clientX: number) => {
    if (dragStartX.current === null) return;
    dragCurrentX.current = clientX;
    if (Math.abs(clientX - dragStartX.current) > 10) {
      hasDragged.current = true;
    }
  };

  const handlePointerUp = () => {
    if (dragStartX.current !== null && dragCurrentX.current !== null) {
      const diffX = dragCurrentX.current - dragStartX.current;
      if (Math.abs(diffX) > 35) {
        if (diffX > 0) {
          handlePrevSeries();
        } else {
          handleNextSeries();
        }
      }
    }
    dragStartX.current = null;
    dragCurrentX.current = null;
    setTimeout(() => {
      hasDragged.current = false;
    }, 50);
  };

  const handleSaveEmail = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Adresse e-mail mise à jour avec succès.');
  };

  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword.trim()) {
      showToast('Veuillez entrer votre mot de passe actuel.');
      return;
    }
    if (!newPassword.trim() || newPassword.length < 6) {
      showToast('Le nouveau mot de passe doit comporter au moins 6 caractères.');
      return;
    }
    setCurrentPassword('');
    setNewPassword('');
    showToast('Mot de passe mis à jour avec succès.');
  };

  const handleLogout = () => {
    showToast('Session terminée.');
    setTimeout(() => {
      onNavigate({ type: 'duo_feed' });
    }, 400);
  };

  const currentSeries = DOCUMENTARIES[activeSeriesIndex] || DOCUMENTARIES[0];
  const isCurrentSeriesFollowed = effectiveFilter.includes(currentSeries.id);

  return (
    <div className="w-full h-[100dvh] bg-white text-[#1C1917] flex flex-col overflow-hidden select-none font-sans">
      {/* ========================================================================= */}
      {/* 1. EN-TÊTE FIXE BLANC : RETOUR "<" EN NOIR + TITRE + 2 ONGLETS TERRE CUITE */}
      {/* ========================================================================= */}
      <header className="relative z-30 flex items-center justify-between px-3.5 sm:px-6 py-2.5 bg-white border-b border-[#E7E5E4] shrink-0">
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Bouton retour "<" en noir pur */}
          <button
            type="button"
            onClick={() => onNavigate(returnTo === 'duo_feed' ? { type: 'duo_feed' } : { type: 'profile' })}
            className="w-8 h-8 rounded-full bg-white hover:bg-stone-100 border border-[#E7E5E4] text-[#1C1917] flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95 shrink-0"
            title="Retour"
            id="btn-settings-back"
          >
            <ChevronLeft className="w-4 h-4 stroke-[2.2]" />
          </button>

          <h1 className="font-editorial text-lg sm:text-2xl font-bold text-[#1C1917] leading-none">
            Paramètres
          </h1>
        </div>

        {/* 3 Onglets : Séries, Messages & Alertes, Compte & Sécurité */}
        <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('series')}
            className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'series'
                ? 'bg-[#A2482B] text-white shadow-xs'
                : 'bg-[#E7E5E4] hover:bg-[#A2482B] text-[#7A756B] hover:text-white'
            }`}
          >
            Séries
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('messages')}
            className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'messages'
                ? 'bg-[#A2482B] text-white shadow-xs'
                : 'bg-[#E7E5E4] hover:bg-[#A2482B] text-[#7A756B] hover:text-white'
            }`}
          >
            Messages & Alertes
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('lang_sec')}
            className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'lang_sec'
                ? 'bg-[#A2482B] text-white shadow-xs'
                : 'bg-[#E7E5E4] hover:bg-[#A2482B] text-[#7A756B] hover:text-white'
            }`}
          >
            Compte & Sécurité
          </button>

          {/* Bouton de déconnexion : fond terre cuite et icône blanche au survol */}
          <button
            type="button"
            onClick={handleLogout}
            className="w-8 h-8 rounded-full bg-[#E7E5E4] hover:bg-[#A2482B] text-[#7A756B] hover:text-white border border-stone-200/80 hover:border-transparent flex items-center justify-center transition-all cursor-pointer active:scale-95 shrink-0 ml-0.5 shadow-xs"
            title="Se déconnecter"
            id="btn-settings-header-logout"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* TOAST FLOTTANT                                                            */}
      {/* ========================================================================= */}
      {feedbackToast && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-[#1C1917] text-white text-xs font-medium shadow-2xl border border-white/20 animate-in fade-in duration-200 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>{feedbackToast}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* CONTENU PRINCIPAL (100% AU-DESSUS DE LA BARRE DE NAVIGATION)              */}
      {/* ========================================================================= */}
      <main className="flex-1 w-full bg-white flex flex-col justify-between items-center px-4 sm:px-8 pt-3 pb-24 overflow-hidden relative">
        
        {/* ======================================================================= */}
        {/* VUE 1 : CHOIX DES SÉRIES (SWIPE + CASE DISCRÈTE COCHÉE PAR DÉFAUT)     */}
        {/* ======================================================================= */}
        {activeTab === 'series' && (
          <div className="w-full flex-1 flex flex-col items-center justify-center animate-in fade-in duration-200 my-auto relative">
            
            {/* Zone de l'affiche 9:16 avec swipe tactile & flèches latérales */}
            <div 
              className="relative flex items-center justify-center w-full my-auto touch-pan-y"
              onTouchStart={(e) => handlePointerDown(e.touches[0].clientX)}
              onTouchMove={(e) => handlePointerMove(e.touches[0].clientX)}
              onTouchEnd={handlePointerUp}
              onMouseDown={(e) => handlePointerDown(e.clientX)}
              onMouseMove={(e) => handlePointerMove(e.clientX)}
              onMouseUp={handlePointerUp}
              onMouseLeave={handlePointerUp}
            >
              {/* Flèche gauche grand écran */}
              <button
                type="button"
                onClick={handlePrevSeries}
                className="hidden sm:flex absolute left-2 sm:left-4 lg:left-12 z-20 w-10 h-10 rounded-full bg-white hover:bg-stone-100 text-[#1C1917] border border-[#E7E5E4] items-center justify-center shadow-md cursor-pointer transition-all active:scale-90 shrink-0"
                title="Série précédente"
              >
                <ChevronLeft className="w-5 h-5 stroke-[2.2]" />
              </button>

              {/* Carte format vertical 9:16 (identique Coproduction) */}
              <div 
                onClick={toggleVideoPlayback}
                className="group aspect-[9/16] w-[min(340px,calc((100dvh-200px)*9/16))] h-[min(604px,calc(100dvh-200px))] max-w-[calc(100vw-28px)] mx-auto rounded-2xl sm:rounded-3xl overflow-hidden bg-[#151513] text-white shadow-2xl border border-stone-200/80 flex flex-col justify-between p-2.5 sm:p-4.5 select-none cursor-pointer shrink-0 relative"
                id={`card-series-${currentSeries.id}`}
              >
                {/* Média de fond : Affiche officielle par défaut OU Vidéo teaser */}
                {isPlaying ? (
                  <video
                    ref={videoRef}
                    src={currentSeries.teaserVideoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'}
                    poster={currentSeries.posterUrl}
                    autoPlay
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={currentSeries.posterUrl}
                    alt={currentSeries.title}
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                  />
                )}

                {/* Voile cinématographique */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 pointer-events-none" />

                {/* HAUT : Badge officiel du titre de la série */}
                <div className="relative z-10 flex items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10.5px] sm:text-[11px] font-semibold tracking-widest text-white shadow-sm max-w-full leading-relaxed">
                    {currentSeries.title}
                  </span>
                </div>

                {/* CENTRE : Icône de lecture vidéo discrète */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                  <div className={`w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/40 backdrop-blur-xs border border-white/20 flex items-center justify-center text-white shadow-xl transition-all duration-200 ${
                    isPlaying ? 'opacity-0 group-hover:opacity-100 hover:scale-110' : 'opacity-100 scale-100'
                  }`}>
                    {isPlaying ? (
                      <Pause className="w-5 h-5 fill-white text-white" />
                    ) : (
                      <Play className="w-5 h-5 fill-white text-white translate-x-0.5 opacity-90" />
                    )}
                  </div>
                </div>

                {/* CENTRE LIBÉRÉ */}
                <div className="my-auto" />

                {/* BAS : Case à cocher discrète et élégante dans le coin bas à droite */}
                <div className="relative z-10 flex items-end justify-end w-full pt-0.5">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleSeries(currentSeries.id);
                    }}
                    id={`btn-toggle-series-${currentSeries.id}`}
                    className={`w-6.5 h-6.5 sm:w-7 sm:h-7 rounded-full flex items-center justify-center shadow-md transition-all cursor-pointer active:scale-90 ${
                      isCurrentSeriesFollowed
                        ? 'bg-[#A2482B] text-white ring-1.5 ring-white/90 shadow-sm'
                        : 'bg-black/40 backdrop-blur-xs border border-white/70 text-transparent hover:border-white'
                    }`}
                    title={isCurrentSeriesFollowed ? 'Série activée (cliquez pour décocher)' : 'Série décochée (cliquez pour activer)'}
                  >
                    {isCurrentSeriesFollowed && (
                      <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white stroke-[2.6]" />
                    )}
                  </button>
                </div>

              </div>

              {/* Flèche droite grand écran */}
              <button
                type="button"
                onClick={handleNextSeries}
                className="hidden sm:flex absolute right-2 sm:right-4 lg:left-auto lg:right-12 z-20 w-10 h-10 rounded-full bg-white hover:bg-stone-100 text-[#1C1917] border border-[#E7E5E4] items-center justify-center shadow-md cursor-pointer transition-all active:scale-90 shrink-0"
                title="Série suivante"
              >
                <ChevronRight className="w-5 h-5 stroke-[2.2]" />
              </button>
            </div>

            {/* Indicateur mobile discret */}
            <div className="flex sm:hidden items-center justify-center gap-6 mt-2">
              <button
                type="button"
                onClick={handlePrevSeries}
                className="w-8 h-8 rounded-full bg-white border border-[#E7E5E4] text-[#1C1917] flex items-center justify-center shadow-xs active:scale-90 cursor-pointer"
                title="Précédente"
              >
                <ChevronLeft className="w-4 h-4 stroke-[2.2]" />
              </button>
              <span className="text-[11px] text-stone-500 font-medium">
                {activeSeriesIndex + 1} / {DOCUMENTARIES.length}
              </span>
              <button
                type="button"
                onClick={handleNextSeries}
                className="w-8 h-8 rounded-full bg-white border border-[#E7E5E4] text-[#1C1917] flex items-center justify-center shadow-xs active:scale-90 cursor-pointer"
                title="Suivante"
              >
                <ChevronRight className="w-4 h-4 stroke-[2.2]" />
              </button>
            </div>

          </div>
        )}

        {/* ======================================================================= */}
        {/* VUE 2 : MESSAGES, NOTIFICATIONS & ALERTES                                */}
        {/* ======================================================================= */}
        {activeTab === 'messages' && (
          <div className="w-full max-w-4xl flex-1 flex flex-col justify-center animate-in fade-in duration-200 my-auto py-2">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 items-start">
              
              {/* --- COLONNE 1 : RÉCEPTION DES MESSAGES & NOTIFICATIONS --- */}
              <div className="space-y-6 sm:space-y-8">
                
                {/* 1. Autorisation de réception des messages */}
                <div>
                  <h2 className="text-xs sm:text-sm font-bold text-[#1C1917] uppercase tracking-wider mb-3 flex items-center gap-2">
                    <MessageSquare className="w-3.5 h-3.5 text-[#A2482B]" />
                    <span>Réception des messages directs</span>
                  </h2>

                  <div className="space-y-2 bg-stone-50/60 p-3.5 rounded-2xl border border-stone-200/70">
                    <label className="text-[11px] font-semibold text-stone-600 block">
                      Qui peut vous contacter sur YonyWood :
                    </label>

                    <div className="grid grid-cols-1 gap-2">
                      {[
                        { 
                          id: 'all', 
                          title: 'Tous les utilisateurs de Yonywood', 
                          desc: 'Ouvert directement à l’ensemble des membres et protagonistes de Yonywood' 
                        },
                        { 
                          id: 'invitation', 
                          title: 'Sur demande d’échange', 
                          desc: 'Nécessite une invitation préalable acceptée avant de pouvoir dialoguer' 
                        },
                        { 
                          id: 'none', 
                          title: 'Désactivé', 
                          desc: 'Personne ne peut vous envoyer de message direct' 
                        }
                      ].map((item) => {
                        const isSelected = messagePermission === item.id;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => {
                              setMessagePermission(item.id as 'none' | 'invitation' | 'all');
                              localStorage.setItem('yonywood_msg_permission', item.id);
                              showToast(`Messagerie : ${item.title}`);
                            }}
                            className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between shadow-2xs ${
                              isSelected
                                ? 'bg-[#1C1917] text-white border-[#1C1917]'
                                : 'bg-white hover:bg-stone-50 text-stone-800 border-stone-200/80'
                            }`}
                          >
                            <div>
                              <span className="block text-xs font-semibold">{item.title}</span>
                              <span className={`text-[10px] ${isSelected ? 'text-stone-300' : 'text-stone-500'}`}>
                                {item.desc}
                              </span>
                            </div>
                            {isSelected && <Check className="w-3.5 h-3.5 text-[#E5C16C] shrink-0 ml-2" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* 2. Notifications de messages */}
                <div>
                  <h2 className="text-xs sm:text-sm font-bold text-[#1C1917] uppercase tracking-wider mb-3 flex items-center gap-2">
                    <BellRing className="w-3.5 h-3.5 text-[#A2482B]" />
                    <span>Alertes & Notifications de messages</span>
                  </h2>

                  <div className="space-y-3 bg-stone-50/60 p-3.5 rounded-2xl border border-stone-200/70">
                    {/* Push instantané */}
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <span className="text-xs font-semibold text-stone-800 block">
                          Notifications push instantanées
                        </span>
                        <span className="text-[11px] text-stone-500">
                          Alerte immédiate à l'arrivée d'un message
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const next = !pushNewMessage;
                          setPushNewMessage(next);
                          localStorage.setItem('yonywood_push_msg', String(next));
                          showToast(next ? 'Notifications push activées' : 'Notifications push désactivées');
                        }}
                        className={`w-9 h-5 rounded-full transition-colors cursor-pointer relative shrink-0 p-0.5 ${
                          pushNewMessage ? 'bg-[#A2482B]' : 'bg-stone-300'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-full bg-white shadow-xs transition-transform ${
                          pushNewMessage ? 'translate-x-4' : 'translate-x-0'
                        }`} />
                      </button>
                    </div>

                    {/* Aperçu du texte */}
                    <div className="flex items-center justify-between gap-3 pt-2.5 border-t border-stone-200/50">
                      <div>
                        <span className="text-xs font-semibold text-stone-800 block">
                          Aperçu du contenu du message
                        </span>
                        <span className="text-[11px] text-stone-500">
                          Afficher les premières lignes dans l'alerte
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const next = !messagePreview;
                          setMessagePreview(next);
                          localStorage.setItem('yonywood_msg_preview', String(next));
                          showToast(next ? 'Aperçu activé' : 'Aperçu masqué');
                        }}
                        className={`w-9 h-5 rounded-full transition-colors cursor-pointer relative shrink-0 p-0.5 ${
                          messagePreview ? 'bg-[#A2482B]' : 'bg-stone-300'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-full bg-white shadow-xs transition-transform ${
                          messagePreview ? 'translate-x-4' : 'translate-x-0'
                        }`} />
                      </button>
                    </div>
                  </div>
                </div>

              </div>

              {/* --- COLONNE 2 : ALERTES COPRODUCTION & PROJETS --- */}
              <div className="space-y-6 sm:space-y-8">
                
                {/* 3. Alertes Documentaires & Coproduction */}
                <div>
                  <h2 className="text-xs sm:text-sm font-bold text-[#1C1917] uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Bell className="w-3.5 h-3.5 text-[#A2482B]" />
                    <span>Coproduction & Projets</span>
                  </h2>

                  <div className="space-y-3 bg-stone-50/60 p-3.5 rounded-2xl border border-stone-200/70">
                    {/* Alerte Paliers de financement */}
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <Coins className="w-4 h-4 text-stone-600 shrink-0" />
                        <span className="text-xs font-medium text-stone-800">
                          Paliers de financement (50%, 80%, 100%)
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setAlertFunding(!alertFunding);
                          showToast(alertFunding ? 'Alertes financement désactivées' : 'Alertes financement activées');
                        }}
                        className={`w-9 h-5 rounded-full transition-colors cursor-pointer relative shrink-0 p-0.5 ${
                          alertFunding ? 'bg-[#A2482B]' : 'bg-stone-300'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-full bg-white shadow-xs transition-transform ${
                          alertFunding ? 'translate-x-4' : 'translate-x-0'
                        }`} />
                      </button>
                    </div>

                    {/* Alerte Nouveaux épisodes */}
                    <div className="flex items-center justify-between gap-3 pt-2 border-t border-stone-200/50">
                      <div className="flex items-center gap-2.5">
                        <Clapperboard className="w-4 h-4 text-stone-600 shrink-0" />
                        <span className="text-xs font-medium text-stone-800">
                          Nouveaux épisodes des séries suivies
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setAlertNewEpisodes(!alertNewEpisodes);
                          showToast(alertNewEpisodes ? 'Alertes épisodes désactivées' : 'Alertes épisodes activées');
                        }}
                        className={`w-9 h-5 rounded-full transition-colors cursor-pointer relative shrink-0 p-0.5 ${
                          alertNewEpisodes ? 'bg-[#A2482B]' : 'bg-stone-300'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-full bg-white shadow-xs transition-transform ${
                          alertNewEpisodes ? 'translate-x-4' : 'translate-x-0'
                        }`} />
                      </button>
                    </div>

                    {/* Alerte Invitations aux duocumentaires */}
                    <div className="flex items-center justify-between gap-3 pt-2 border-t border-stone-200/50">
                      <div className="flex items-center gap-2.5">
                        <Tv className="w-4 h-4 text-stone-600 shrink-0" />
                        <span className="text-xs font-medium text-stone-800">
                          Invitations aux duocumentaires
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const next = !alertDuocumentaires;
                          setAlertDuocumentaires(next);
                          showToast(next ? 'Invitations aux duocumentaires activées' : 'Invitations aux duocumentaires désactivées');
                        }}
                        className={`w-9 h-5 rounded-full transition-colors cursor-pointer relative shrink-0 p-0.5 ${
                          alertDuocumentaires ? 'bg-[#A2482B]' : 'bg-stone-300'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-full bg-white shadow-xs transition-transform ${
                          alertDuocumentaires ? 'translate-x-4' : 'translate-x-0'
                        }`} />
                      </button>
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* ======================================================================= */}
        {/* VUE 3 : COMPTE, SÉCURITÉ & LANGUE (ALIGNEMENT PARFAIT DES BAS DE BLOCS) */}
        {/* ======================================================================= */}
        {activeTab === 'lang_sec' && (
          <div className="w-full max-w-4xl flex-1 flex flex-col justify-center animate-in fade-in duration-200 my-auto py-2">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 items-stretch">
              
              {/* --- COLONNE 1 : LANGUES & EXPÉRIENCE DE LECTURE --- */}
              <div className="flex flex-col justify-between h-full space-y-6 sm:space-y-0">
                
                {/* 1. Langue de l'application */}
                <div>
                  <h2 className="text-xs sm:text-sm font-bold text-[#1C1917] uppercase tracking-wider mb-3 flex items-center gap-2">
                    <span>Langue et sous-titres</span>
                  </h2>

                  <div className="grid grid-cols-4 gap-2">
                    {SUPPORTED_LANGUAGES.map((item) => {
                      const isSelected = language === item.code;
                      return (
                        <button
                          key={item.code}
                          type="button"
                          onClick={() => {
                            onUpdateLanguage(item.code);
                            showToast(`Langue : ${item.label}`);
                          }}
                          className={`py-2.5 px-2 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 shadow-xs ${
                            isSelected
                              ? 'bg-[#A2482B] border-[#A2482B] text-white shadow-xs'
                              : 'bg-white border-stone-200 hover:bg-stone-50 text-stone-800'
                          }`}
                        >
                          <span className="text-base sm:text-lg leading-none">{item.flag}</span>
                          <div className="flex items-center gap-1">
                            <span className="text-[11px] sm:text-xs font-semibold">{item.label}</span>
                            {isSelected && <Check className="w-2.5 h-2.5 text-white stroke-[3]" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Préférence Lecture automatique au swipe */}
                <div className="pt-4 sm:pt-6">
                  <h2 className="text-xs sm:text-sm font-bold text-[#1C1917] uppercase tracking-wider mb-3 flex items-center gap-2">
                    <span>Expérience de lecture</span>
                  </h2>

                  <div className="flex items-center justify-between gap-3 bg-stone-50/60 p-3.5 rounded-2xl border border-stone-200/70">
                    <div>
                      <span className="text-xs font-semibold text-stone-800 block">
                        Lecture automatique au swipe
                      </span>
                      <span className="text-[11px] text-stone-500">
                        Lancer le teaser directement lors du défilement
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const next = !autoPlayOnSwipe;
                        setAutoPlayOnSwipe(next);
                        localStorage.setItem('yonywood_autoplay', String(next));
                        showToast(next ? 'Lecture auto activée' : 'Lecture auto désactivée');
                      }}
                      className={`w-9 h-5 rounded-full transition-colors cursor-pointer relative shrink-0 p-0.5 ${
                        autoPlayOnSwipe ? 'bg-[#A2482B]' : 'bg-stone-300'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full bg-white shadow-xs transition-transform ${
                        autoPlayOnSwipe ? 'translate-x-4' : 'translate-x-0'
                      }`} />
                    </button>
                  </div>
                </div>

              </div>

              {/* --- COLONNE 2 : SÉCURITÉ ET COMPTE --- */}
              <div className="flex flex-col justify-between h-full space-y-6 sm:space-y-0">
                
                {/* 1. Adresse e-mail */}
                <div>
                  <h2 className="text-xs sm:text-sm font-bold text-[#1C1917] uppercase tracking-wider mb-3 flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#A2482B]" />
                    <span>Sécurité et compte</span>
                  </h2>

                  <form onSubmit={handleSaveEmail} className="space-y-1.5">
                    <label className="text-[11px] font-semibold text-stone-600 block">
                      Adresse e-mail
                    </label>
                    <div className="flex items-center gap-1.5">
                      <input
                        type="email"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        className="flex-1 px-3.5 py-2 text-xs bg-white border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-stone-800 transition-colors shadow-2xs"
                        placeholder="nom@exemple.com"
                        required
                      />
                      <button
                        type="submit"
                        className="h-8.5 px-3.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition-all cursor-pointer active:scale-95 shrink-0"
                      >
                        Enregistrer
                      </button>
                    </div>
                  </form>
                </div>

                {/* 2. Formulaire Mot de passe : baissé pour que le bas soit au même niveau horizontal que le bas de Lecture automatique */}
                <div className="pt-4 sm:pt-6">
                  <form onSubmit={handleSavePassword} className="space-y-2">
                    <label className="text-[11px] font-semibold text-stone-600 flex items-center gap-1 block">
                      <Lock className="w-3 h-3 text-stone-400" />
                      <span>Modifier le mot de passe</span>
                    </label>

                    <div className="space-y-2">
                      <div className="relative">
                        <KeyRound className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="password"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          className="w-full pl-8 pr-3.5 py-2 text-xs bg-white border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-stone-800 transition-colors shadow-2xs"
                          placeholder="Mot de passe actuel"
                        />
                      </div>

                      <div className="flex items-center gap-1.5">
                        <div className="relative flex-1">
                          <Lock className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full pl-8 pr-3.5 py-2 text-xs bg-white border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-stone-800 transition-colors shadow-2xs"
                            placeholder="Nouveau mot de passe"
                          />
                        </div>
                        <button
                          type="submit"
                          className="h-8.5 px-3.5 rounded-xl bg-[#A2482B] hover:bg-[#8A3B22] text-white text-xs font-semibold transition-all cursor-pointer active:scale-95 shrink-0 shadow-xs"
                        >
                          Mettre à jour
                        </button>
                      </div>
                    </div>
                  </form>
                </div>

              </div>

            </div>

          </div>
        )}

      </main>
    </div>
  );
};
