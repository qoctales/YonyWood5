import React, { useState, useRef } from 'react';
import { 
  Crown, 
  Film, 
  ShieldAlert, 
  Users, 
  DollarSign, 
  ChevronLeft, 
  Edit3, 
  Trash2, 
  Plus, 
  Check, 
  X, 
  Sliders, 
  ArrowUpRight, 
  CheckCircle2, 
  Sparkles, 
  TrendingUp, 
  Search,
  Wallet,
  Save,
  RotateCcw,
  Upload,
  ArrowUp,
  ArrowDown,
  Layers,
  Clapperboard,
  Play,
  Pause,
  Video,
  UserCheck,
  Star,
  Eye,
  Volume2,
  VolumeX
} from 'lucide-react';
import { ViewScreen, Documentary, QuestionItem, SeriesEffigie, ReportItem, CoproductionEarning } from '../types';
import { DOCUMENTARIES, PROTAGONISTS, getCustomDocumentaries, saveCustomDocumentaries } from '../data/mockData';
import { useAuth } from '../services/authContext';

interface AdminDashboardProps {
  onNavigate: (screen: ViewScreen) => void;
  initialTab?: 'series' | 'moderation' | 'users' | 'finances';
}

const DEFAULT_EARNINGS: CoproductionEarning[] = [
  {
    id: 'earn-1',
    coproducerName: 'Romeo Nonvide',
    coproducerEmail: 'qoctales@gmail.com',
    seriesId: 'investors-builders',
    seriesTitle: 'Investors < > Builders',
    initialInvestment: 1500,
    sharesOwned: 150,
    totalViews: 92400,
    audienceMilestone: 'Palier 90k vues dépassé',
    dividendEarned: 435.00,
    payoutStatus: 'PAID',
    payoutDate: '2026-03-22'
  },
  {
    id: 'earn-2',
    coproducerName: 'Romeo Nonvide',
    coproducerEmail: 'qoctales@gmail.com',
    seriesId: 'jesus-legba',
    seriesTitle: 'Èṣù < > Jésus',
    initialInvestment: 1250,
    sharesOwned: 125,
    totalViews: 84200,
    audienceMilestone: 'Palier 75k vues dépassé',
    dividendEarned: 345.50,
    payoutStatus: 'PAID',
    payoutDate: '2026-03-15'
  },
  {
    id: 'earn-3',
    coproducerName: 'Clara Dupont',
    coproducerEmail: 'clara.dupont@gmail.com',
    seriesId: 'finagnon-qosqorico',
    seriesTitle: 'Finagnon < > Qosqorico',
    initialInvestment: 500,
    sharesOwned: 50,
    totalViews: 46100,
    audienceMilestone: 'Palier 40k vues atteint',
    dividendEarned: 115.00,
    payoutStatus: 'PAID',
    payoutDate: '2026-03-20'
  },
  {
    id: 'earn-4',
    coproducerName: 'Tarek Benani',
    coproducerEmail: 'tarek.benani@outlook.com',
    seriesId: 'blacks-one-beyond-eve',
    seriesTitle: 'Blacks One < > Beyond Eve',
    initialInvestment: 800,
    sharesOwned: 80,
    totalViews: 128000,
    audienceMilestone: 'Palier 100k vues pulvérisé (+30%)',
    dividendEarned: 412.80,
    payoutStatus: 'PENDING'
  },
  {
    id: 'earn-5',
    coproducerName: 'Sophie Morel',
    coproducerEmail: 'sophie.morel@culture-invest.fr',
    seriesId: 'dixeat-fiat-luxe',
    seriesTitle: 'E Vivi < > Fiât Luxe',
    initialInvestment: 1500,
    sharesOwned: 150,
    totalViews: 62400,
    audienceMilestone: 'Palier 50k vues atteint',
    dividendEarned: 285.00,
    payoutStatus: 'PROCESSING'
  }
];

// Échantillons de mini-vidéos 9/16 et d'affiches verticales suggérées
const DEMO_VERTICAL_VIDEOS = [
  { label: 'Présentation Question (Blazes)', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
  { label: 'Transmission Vivante (Escapes)', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4' },
  { label: 'Épopée du Réel (JoyBlazes)', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4' },
  { label: 'Séquence Atelier (Meltdowns)', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4' }
];

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onNavigate,
  initialTab = 'series'
}) => {
  const { usersList, updateUserRole, deleteUser, currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState<'series' | 'moderation' | 'users' | 'finances'>(initialTab);

  // 1. ÉTAT DES SÉRIES & ÉDITION
  const [seriesList, setSeriesList] = useState<Documentary[]>(() => {
    return getCustomDocumentaries();
  });

  const [editingSeries, setEditingSeries] = useState<Documentary | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editTagline, setEditTagline] = useState('');
  const [editCentralQuestion, setEditCentralQuestion] = useState('');
  const [editSynopsis, setEditSynopsis] = useState('');
  const [editCoverUrl, setEditCoverUrl] = useState('');
  const [editTeaserVideoUrl, setEditTeaserVideoUrl] = useState('');
  const [editQuestions, setEditQuestions] = useState<QuestionItem[]>([]);
  const [editEffigies, setEditEffigies] = useState<SeriesEffigie[]>([]);
  const [searchSeries, setSearchSeries] = useState('');

  // Modale pour ajouter une effigie
  const [isAddingEffigieModalOpen, setIsAddingEffigieModalOpen] = useState(false);
  const [selectedProtagonistForEffigie, setSelectedProtagonistForEffigie] = useState<string>('');
  const [customEffigieName, setCustomEffigieName] = useState('');
  const [customEffigieRole, setCustomEffigieRole] = useState('');
  const [customEffigiePhoto, setCustomEffigiePhoto] = useState('');
  const [customEffigieVideo, setCustomEffigieVideo] = useState('');
  const [customEffigieStatus, setCustomEffigieStatus] = useState<'EFFIGIE_PRINCIPALE' | 'EFFIGIE_SERIE'>('EFFIGIE_SERIE');

  // État lecteur vidéo pour la prévisualisation des mini-vidéos 9/16
  const [playingVideoIndex, setPlayingVideoIndex] = useState<number | 'cover' | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  // Input de téléversement d'image
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadTargetIndex, setUploadTargetIndex] = useState<number | 'cover' | null>(null);

  // 2. ÉTAT DES SIGNALEMENTS (MODÉRATION)
  const [reports, setReports] = useState<ReportItem[]>(() => {
    try {
      const saved = localStorage.getItem('yonywood_reports');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // ignore
    }
    return [
      {
        id: 'rep-demo-1',
        reason: 'copyright',
        reasonLabel: "Atteinte aux droits d'auteur",
        details: 'Musique de fond semblant correspondre à un morceau protégé.',
        targetType: 'duo',
        targetId: 'duo-1',
        targetTitle: 'Koffi Mensah <> Amara Diop (Duo 1)',
        reportedBy: 'utilisateur_veille@yonywood.com',
        createdAt: '2026-03-24T14:22:00Z',
        status: 'PENDING'
      },
      {
        id: 'rep-demo-2',
        reason: 'inappropriate',
        reasonLabel: 'Contenu inapproprié ou offensant',
        details: 'Passage avec langage très familier à la minute 01:20.',
        targetType: 'duo',
        targetId: 'duo-3',
        targetTitle: 'Yamina Vargas <> Carlos Mendoza (Duo 3)',
        reportedBy: 'spectateur_42@gmail.com',
        createdAt: '2026-03-25T09:10:00Z',
        status: 'PENDING'
      }
    ];
  });

  // 3. ÉTAT DES FINANCES & COMMISSION PLATEFORME
  const [platformFee, setPlatformFee] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('yonywood_platform_fee');
      if (saved) return Number(saved);
    } catch {
      // ignore
    }
    return 12; // 12% par défaut
  });

  const [earningsList] = useState<CoproductionEarning[]>(() => {
    try {
      const saved = localStorage.getItem('yonywood_earnings');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return DEFAULT_EARNINGS;
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Démarrer l'édition d'une série
  const startEditSeries = (s: Documentary) => {
    setEditingSeries(s);
    setEditTitle(s.title);
    setEditTagline(s.subtitle || '');
    setEditCentralQuestion(s.centralQuestion || '');
    setEditSynopsis(s.description || '');
    setEditCoverUrl(s.coverImage || '');
    setEditTeaserVideoUrl(s.teaserVideoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4');

    // Cloner les questions avec format 9/16 et mini-vidéos
    const clonedQuestions: QuestionItem[] = s.questions ? JSON.parse(JSON.stringify(s.questions)) : [];
    const enriched = clonedQuestions.map((q, idx) => ({
      ...q,
      number: q.number || String(idx + 1).padStart(2, '0'),
      title: q.title || `Épisode ${idx + 1}`,
      prompt: q.prompt || '',
      posterUrl: q.posterUrl || s.coverImage || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
      videoUrl: q.videoUrl || q.videoAvatarUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      effigieName: q.effigieName || (s.effigies && s.effigies[0]?.name) || ''
    }));
    setEditQuestions(enriched);

    // Initialiser les effigies
    setEditEffigies(s.effigies ? JSON.parse(JSON.stringify(s.effigies)) : [
      {
        id: `eff-${s.id}-1`,
        name: 'Effigie de la Série',
        role: 'Figure emblématique & transmission',
        photoUrl: s.coverImage,
        videoUrl: s.teaserVideoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        status: 'EFFIGIE_PRINCIPALE'
      }
    ]);
  };

  // Mettre à jour une question
  const handleUpdateQuestion = (index: number, field: keyof QuestionItem, value: any) => {
    setEditQuestions(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  // Ajouter un nouvel épisode à la série
  const handleAddEpisode = () => {
    const nextNum = String(editQuestions.length + 1).padStart(2, '0');
    const newEpisode: QuestionItem = {
      number: nextNum,
      title: `Épisode ${nextNum} : Nouvelle transmission`,
      prompt: 'Racontez-nous un moment charnière qui a façonné votre engagement...',
      posterUrl: editCoverUrl || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      audioDuration: '0:45',
      effigieName: editEffigies[0]?.name || ''
    };
    setEditQuestions(prev => [...prev, newEpisode]);
    showToast(`Épisode ${nextNum} ajouté (Format 9/16) !`);
  };

  // Supprimer un épisode
  const handleDeleteEpisode = (index: number) => {
    if (editQuestions.length <= 1) {
      alert('Une série doit comporter au moins un épisode.');
      return;
    }
    const epToDelete = editQuestions[index];
    if (window.confirm(`Supprimer l'épisode "${epToDelete.title || epToDelete.number}" de la série ?`)) {
      setEditQuestions(prev => {
        const filtered = prev.filter((_, i) => i !== index);
        return filtered.map((ep, idx) => ({
          ...ep,
          number: String(idx + 1).padStart(2, '0')
        }));
      });
      showToast('Épisode supprimé.');
    }
  };

  // Déplacer un épisode
  const handleMoveEpisode = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= editQuestions.length) return;

    setEditQuestions(prev => {
      const copy = [...prev];
      const temp = copy[index];
      copy[index] = copy[targetIndex];
      copy[targetIndex] = temp;
      return copy.map((ep, idx) => ({
        ...ep,
        number: String(idx + 1).padStart(2, '0')
      }));
    });
  };

  // Gestion des Effigies de la série
  const handleAddEffigieFromProtagonist = () => {
    if (!selectedProtagonistForEffigie) return;
    const proto = PROTAGONISTS.find(p => p.id === selectedProtagonistForEffigie);
    if (!proto) return;

    const newEffigie: SeriesEffigie = {
      id: `eff-${proto.id}-${Date.now()}`,
      name: proto.name,
      role: proto.role,
      photoUrl: proto.photoUrl,
      videoUrl: proto.teaserVideoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      protagonistId: proto.id,
      status: editEffigies.length === 0 ? 'EFFIGIE_PRINCIPALE' : 'EFFIGIE_SERIE'
    };

    setEditEffigies(prev => [...prev, newEffigie]);
    setSelectedProtagonistForEffigie('');
    setIsAddingEffigieModalOpen(false);
    showToast(`Profil "${proto.name}" ajouté comme Effigie de la série !`);
  };

  const handleAddCustomEffigie = () => {
    if (!customEffigieName.trim()) return;

    const newEffigie: SeriesEffigie = {
      id: `eff-custom-${Date.now()}`,
      name: customEffigieName.trim(),
      role: customEffigieRole.trim() || 'Effigie Référente',
      photoUrl: customEffigiePhoto.trim() || editCoverUrl,
      videoUrl: customEffigieVideo.trim() || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      status: customEffigieStatus
    };

    // Si marquée comme principale, retirer ce statut des autres
    if (customEffigieStatus === 'EFFIGIE_PRINCIPALE') {
      setEditEffigies(prev => prev.map(e => ({ ...e, status: 'EFFIGIE_SERIE' })).concat(newEffigie));
    } else {
      setEditEffigies(prev => [...prev, newEffigie]);
    }

    setCustomEffigieName('');
    setCustomEffigieRole('');
    setCustomEffigiePhoto('');
    setCustomEffigieVideo('');
    setIsAddingEffigieModalOpen(false);
    showToast(`Effigie "${newEffigie.name}" créée avec succès !`);
  };

  const handleSetPrimaryEffigie = (effigieId: string) => {
    setEditEffigies(prev => prev.map(e => ({
      ...e,
      status: e.id === effigieId ? 'EFFIGIE_PRINCIPALE' : 'EFFIGIE_SERIE'
    })));
    showToast("Effigie principale désignée (apparaîtra en première vidéo) !");
  };

  const handleDeleteEffigie = (effigieId: string) => {
    setEditEffigies(prev => prev.filter(e => e.id !== effigieId));
    showToast("Effigie retirée.");
  };

  // Upload d'image de secours pour l'affiche
  const triggerFileUpload = (target: number | 'cover') => {
    setUploadTargetIndex(target);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (uploadTargetIndex === 'cover') {
        setEditCoverUrl(result);
        showToast('Affiche 9/16 de la série chargée !');
      } else if (typeof uploadTargetIndex === 'number') {
        handleUpdateQuestion(uploadTargetIndex, 'posterUrl', result);
        showToast(`Affiche 9/16 de l'épisode ${uploadTargetIndex + 1} chargée !`);
      }
      setUploadTargetIndex(null);
    };
    reader.readAsDataURL(file);
  };

  // Sauvegarde globale de la série
  const handleSaveSeries = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSeries) return;

    const updated = seriesList.map(s => {
      if (s.id === editingSeries.id) {
        return {
          ...s,
          title: editTitle.trim() || s.title,
          subtitle: editTagline.trim() || s.subtitle,
          centralQuestion: editCentralQuestion.trim() || s.centralQuestion,
          description: editSynopsis.trim() || s.description,
          coverImage: editCoverUrl.trim() || s.coverImage,
          posterUrl: editCoverUrl.trim() || s.posterUrl,
          teaserVideoUrl: editTeaserVideoUrl.trim() || s.teaserVideoUrl,
          questions: editQuestions,
          episodeCount: editQuestions.length,
          effigies: editEffigies
        };
      }
      return s;
    });

    setSeriesList(updated);
    saveCustomDocumentaries(updated);
    setEditingSeries(null);
    showToast(`Série "${editTitle}" et ses ${editQuestions.length} mini-vidéos 9/16 enregistrées !`);
  };

  // Réinitialiser le catalogue
  const handleResetCatalog = () => {
    if (window.confirm('Voulez-vous réinitialiser toutes les séries et affiches à leurs valeurs d’origine ?')) {
      localStorage.removeItem('yonywood_custom_series');
      window.location.reload();
    }
  };

  // Actions modération
  const handleUpdateReportStatus = (reportId: string, newStatus: 'RESOLVED' | 'DISMISSED') => {
    const updated = reports.map(r => r.id === reportId ? { ...r, status: newStatus } : r);
    setReports(updated);
    try {
      localStorage.setItem('yonywood_reports', JSON.stringify(updated));
    } catch {
      // ignore
    }
    showToast(newStatus === 'RESOLVED' ? 'Signalement marqué comme résolu' : 'Signalement rejeté/ignoré');
  };

  // Action commission financière
  const handleSavePlatformFee = (newFee: number) => {
    setPlatformFee(newFee);
    try {
      localStorage.setItem('yonywood_platform_fee', String(newFee));
    } catch {
      // ignore
    }
    showToast(`Commission plateforme ajustée à ${newFee}%`);
  };

  // Calculs financiers
  const totalInvested = earningsList.reduce((acc, e) => acc + e.initialInvestment, 0);
  const platformRevenue = Math.round(totalInvested * (platformFee / 100));
  const totalDividendsDistributed = earningsList.reduce((acc, e) => acc + e.dividendEarned, 0);

  const filteredSeries = seriesList.filter(s => 
    s.title.toLowerCase().includes(searchSeries.toLowerCase()) ||
    (s.territories && s.territories.some(t => t.toLowerCase().includes(searchSeries.toLowerCase()))) ||
    (s.subtitle && s.subtitle.toLowerCase().includes(searchSeries.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[#FAFAF9] text-[#1C1917] pb-24 selection:bg-[#A2482B]/20 selection:text-[#1C1917] font-sans">
      
      {/* Input caché pour le téléversement d'affiche */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="image/*" 
        className="hidden" 
      />

      {/* Toast de confirmation terre cuite */}
      {toastMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-full bg-[#A2482B] text-white text-xs font-semibold shadow-xl shadow-[#A2482B]/30 flex items-center gap-2 animate-in fade-in zoom-in border border-white/20">
          <CheckCircle2 className="w-4 h-4 text-amber-200" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Modale d'ajout d'une Effigie de la série */}
      {isAddingEffigieModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white border border-stone-200 rounded-3xl p-6 shadow-2xl space-y-5 animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-[#C89B3C] fill-[#C89B3C]" />
                <h3 className="text-base font-bold text-stone-900">
                  Désigner une Effigie de la Série
                </h3>
              </div>
              <button 
                onClick={() => setIsAddingEffigieModalOpen(false)}
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Option A : Choisir parmi les profils de protagonistes existants */}
            <div className="p-4 rounded-2xl bg-[#FAFAF9] border border-stone-200 space-y-3">
              <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider">
                Option 1 : Choisir un profil de la plateforme
              </label>
              <div className="flex gap-2">
                <select
                  value={selectedProtagonistForEffigie}
                  onChange={(e) => setSelectedProtagonistForEffigie(e.target.value)}
                  className="flex-1 h-10 px-3 rounded-xl bg-white border border-stone-300 text-xs text-stone-900 focus:border-[#A2482B] outline-hidden cursor-pointer"
                >
                  <option value="">Sélectionner un protagoniste...</option>
                  {PROTAGONISTS.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.role} • {p.country})
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  disabled={!selectedProtagonistForEffigie}
                  onClick={handleAddEffigieFromProtagonist}
                  className="px-4 py-2 rounded-xl bg-[#A2482B] hover:bg-[#8A3B22] disabled:opacity-40 text-white text-xs font-bold shrink-0 cursor-pointer transition-colors shadow-xs"
                >
                  Ajouter ce profil
                </button>
              </div>
            </div>

            {/* Option B : Créer une effigie personnalisée */}
            <div className="space-y-3 pt-2">
              <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider">
                Option 2 : Créer une Effigie sur-mesure
              </label>

              <div className="space-y-2.5">
                <div>
                  <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                    Nom de l'Effigie <span className="text-[#A2482B]">*</span>
                  </label>
                  <input
                    type="text"
                    value={customEffigieName}
                    onChange={(e) => setCustomEffigieName(e.target.value)}
                    placeholder="Ex: Dah Zounon ou Fatou Diallo"
                    className="w-full h-9 px-3 rounded-xl bg-stone-50 border border-stone-300 text-xs text-stone-900 focus:border-[#A2482B] outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                    Statut / Rôle de l'Effigie
                  </label>
                  <input
                    type="text"
                    value={customEffigieRole}
                    onChange={(e) => setCustomEffigieRole(e.target.value)}
                    placeholder="Ex: Ambassadrice de la Série & Investisseuse"
                    className="w-full h-9 px-3 rounded-xl bg-stone-50 border border-stone-300 text-xs text-stone-900 focus:border-[#A2482B] outline-hidden"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                      URL Photo / Portrait 9:16
                    </label>
                    <input
                      type="text"
                      value={customEffigiePhoto}
                      onChange={(e) => setCustomEffigiePhoto(e.target.value)}
                      placeholder="https://..."
                      className="w-full h-9 px-3 rounded-xl bg-stone-50 border border-stone-300 text-xs text-stone-900 focus:border-[#A2482B] outline-hidden font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                      URL Vidéo 9:16 de l'Effigie
                    </label>
                    <input
                      type="text"
                      value={customEffigieVideo}
                      onChange={(e) => setCustomEffigieVideo(e.target.value)}
                      placeholder="https://...mp4"
                      className="w-full h-9 px-3 rounded-xl bg-stone-50 border border-stone-300 text-xs text-stone-900 focus:border-[#A2482B] outline-hidden font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                    Importance dans la série
                  </label>
                  <select
                    value={customEffigieStatus}
                    onChange={(e) => setCustomEffigieStatus(e.target.value as any)}
                    className="w-full h-9 px-3 rounded-xl bg-stone-50 border border-stone-300 text-xs text-stone-900 focus:border-[#A2482B] outline-hidden cursor-pointer"
                  >
                    <option value="EFFIGIE_SERIE">Effigie de la Série</option>
                    <option value="EFFIGIE_PRINCIPALE">Effigie Principale (première vidéo qui apparaît)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-stone-100">
              <button
                type="button"
                onClick={() => setIsAddingEffigieModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold cursor-pointer"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleAddCustomEffigie}
                className="px-5 py-2 rounded-xl bg-[#A2482B] hover:bg-[#8A3B22] text-white text-xs font-bold cursor-pointer shadow-xs"
              >
                Créer l'Effigie
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Barre de navigation supérieure - Couleurs Terre Cuite & Fond Clair */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate({ type: 'profile' })}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-[#A2482B] text-stone-700 hover:text-white flex items-center justify-center transition-all cursor-pointer border border-stone-200"
            title="Revenir au Profil"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#A2482B] to-[#C89B3C] text-white flex items-center justify-center shadow-md shadow-[#A2482B]/20">
              <Crown className="w-4 h-4 font-black" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-serif font-black text-stone-900 tracking-tight">
                  Espace Administration
                </span>
                <span className="px-1.5 py-0.5 rounded bg-[#A2482B]/10 text-[#A2482B] border border-[#A2482B]/20 text-[9px] font-black uppercase tracking-wider">
                  Directeur Studio
                </span>
              </div>
              <p className="text-[10px] text-stone-500">
                Connecté en tant que <span className="text-stone-800 font-semibold">{currentUser?.name || 'Romeo Nonvide'}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Boutons d'action droite */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleResetCatalog}
            title="Réinitialiser le catalogue d'origine"
            className="hidden sm:flex items-center gap-1 text-[11px] text-stone-500 hover:text-stone-800 px-3 py-1.5 rounded-full bg-stone-100 hover:bg-stone-200 border border-stone-200 transition-all cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Réinitialiser</span>
          </button>

          <button
            onClick={() => onNavigate({ type: 'home' })}
            className="px-3.5 py-1.5 rounded-full bg-[#A2482B] hover:bg-[#8A3B22] text-white text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
          >
            <span>Voir le site</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Navigation des 4 onglets de gestion - Terre cuite & Fond clair */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 pt-6">
        <div className="flex items-center gap-2 p-1.5 bg-white border border-stone-200 rounded-2xl overflow-x-auto scrollbar-none shadow-xs">
          <button
            onClick={() => setActiveTab('series')}
            className={`flex-1 min-w-[170px] py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'series'
                ? 'bg-[#A2482B] text-white shadow-md shadow-[#A2482B]/20'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            <Film className="w-3.5 h-3.5" />
            <span>Séries & Vidéos 9/16 ({seriesList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('moderation')}
            className={`flex-1 min-w-[130px] py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer relative ${
              activeTab === 'moderation'
                ? 'bg-[#A2482B] text-white shadow-md shadow-[#A2482B]/20'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Modération</span>
            {reports.filter(r => r.status === 'PENDING').length > 0 && (
              <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-black flex items-center justify-center">
                {reports.filter(r => r.status === 'PENDING').length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('users')}
            className={`flex-1 min-w-[130px] py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'users'
                ? 'bg-[#A2482B] text-white shadow-md shadow-[#A2482B]/20'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Utilisateurs ({usersList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('finances')}
            className={`flex-1 min-w-[130px] py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'finances'
                ? 'bg-[#A2482B] text-white shadow-md shadow-[#A2482B]/20'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>Finances & Gains</span>
          </button>
        </div>
      </div>

      {/* Contenu principal */}
      <main className="max-w-6xl mx-auto px-4 sm:px-8 pt-6">

        {/* ========================================================================= */}
        {/* ONGLET 1 : SÉRIES, ÉPISODES 9/16, EFFIGIES & MINI-VIDÉOS                  */}
        {/* ========================================================================= */}
        {activeTab === 'series' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-serif font-bold text-stone-900 flex items-center gap-2">
                  <Clapperboard className="w-5 h-5 text-[#A2482B]" />
                  <span>Séries, Mini-Vidéos 9/16 & Effigies</span>
                </h2>
                <p className="text-xs text-stone-600 mt-0.5">
                  Toutes les affiches et présentations de questions sont au <strong className="text-[#A2482B]">format vertical 9/16</strong> (vidéos de présentation avec affiches de secours et statut d'effigie).
                </p>
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  placeholder="Rechercher une série..."
                  value={searchSeries}
                  onChange={(e) => setSearchSeries(e.target.value)}
                  className="w-full h-9 pl-9 pr-3 rounded-xl bg-white border border-stone-300 text-xs text-stone-900 placeholder:text-stone-400 outline-hidden focus:border-[#A2482B] transition-colors"
                />
              </div>
            </div>

            {/* Accès rapide aux séries : Èṣù < > Jésus, Investors < > Builders, etc. */}
            <div className="flex items-center gap-2 flex-wrap text-xs">
              <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider mr-1">
                Séries au catalogue :
              </span>
              {seriesList.map((s) => (
                <button
                  key={s.id}
                  onClick={() => startEditSeries(s)}
                  className={`px-3 py-1.5 rounded-full border transition-all cursor-pointer flex items-center gap-1.5 ${
                    editingSeries?.id === s.id
                      ? 'bg-[#A2482B] text-white border-[#A2482B] shadow-sm font-bold'
                      : 'bg-white text-stone-700 border-stone-200 hover:border-[#A2482B] hover:text-[#A2482B]'
                  }`}
                >
                  <Film className="w-3 h-3 text-[#A2482B]" />
                  <span>{s.title}</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-stone-100 text-stone-600 font-mono">
                    {s.questions?.length || s.episodeCount || 5} ép. (9/16)
                  </span>
                </button>
              ))}
            </div>

            {/* =================================================================== */}
            {/* PANNEAU D'ÉDITION D'UNE SÉRIE & FORMAT VERTICAL 9/16                */}
            {/* =================================================================== */}
            {editingSeries && (
              <div className="p-6 rounded-3xl bg-white border-2 border-[#A2482B]/40 shadow-xl space-y-6 animate-in fade-in">
                
                {/* En-tête de l'éditeur */}
                <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-2xl bg-[#A2482B]/10 text-[#A2482B] flex items-center justify-center border border-[#A2482B]/20">
                      <Edit3 className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-stone-900">
                        Édition complète : <span className="text-[#A2482B]">{editingSeries.title}</span>
                      </h3>
                      <p className="text-[11px] text-stone-500">
                        Affiches verticales 9/16, mini-vidéos de présentation de chaque question et désignation des Effigies.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setEditingSeries(null)}
                    className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center cursor-pointer transition-colors"
                    title="Fermer sans enregistrer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <form onSubmit={handleSaveSeries} className="space-y-6">
                  
                  {/* BLOC 1 : IDENTITÉ GÉNÉRALE DE LA SÉRIE (AFFICHE 9/16 & SYNOPSIS) */}
                  <div className="p-5 rounded-2xl bg-[#FAFAF9] border border-stone-200 space-y-4">
                    <div className="flex items-center gap-2">
                      <Layers className="w-4 h-4 text-[#A2482B]" />
                      <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                        1. Identité, Slogan & Affiche Officielle 9/16 de la Série
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
                      
                      {/* Aperçu de l'affiche 9/16 de la série */}
                      <div className="md:col-span-3 space-y-2">
                        <label className="block text-xs font-bold text-stone-700">
                          Affiche Série (9/16 Vertical)
                        </label>
                        
                        <div className="relative aspect-[9/16] w-full max-w-[200px] mx-auto rounded-2xl overflow-hidden border-2 border-stone-300 bg-stone-900 shadow-md group">
                          <img 
                            src={editCoverUrl} 
                            alt={editTitle}
                            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/assets/posters/jesus-esu.png';
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-2.5 text-white">
                            <span className="text-[10px] font-mono tracking-widest uppercase bg-[#A2482B] text-white px-2 py-0.5 rounded-full w-fit mb-1">
                              Format 9/16
                            </span>
                            <span className="text-xs font-bold line-clamp-1">{editTitle}</span>
                          </div>
                        </div>

                        <div className="flex gap-1.5 pt-1">
                          <button
                            type="button"
                            onClick={() => triggerFileUpload('cover')}
                            className="flex-1 py-1.5 px-2 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-800 text-[10px] font-semibold flex items-center justify-center gap-1 cursor-pointer transition-colors"
                          >
                            <Upload className="w-3 h-3 text-[#A2482B]" />
                            <span>Téléverser image</span>
                          </button>
                        </div>
                      </div>

                      {/* Champs texte de la série */}
                      <div className="md:col-span-9 space-y-3.5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          <div>
                            <label className="block text-xs font-semibold text-stone-700 mb-1">
                              Nom de la série <span className="text-[#A2482B]">*</span>
                            </label>
                            <input
                              type="text"
                              value={editTitle}
                              onChange={(e) => setEditTitle(e.target.value)}
                              placeholder="Ex: Èṣù < > Jésus"
                              className="w-full h-10 px-3 rounded-xl bg-white border border-stone-300 text-xs text-stone-900 focus:border-[#A2482B] outline-hidden font-medium"
                              required
                            />
                            <p className="text-[10px] text-stone-400 mt-0.5">
                              Ex: « Èṣù &lt; &gt; Jésus » (Jésus en deuxième position)
                            </p>
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-stone-700 mb-1">
                              Slogan de la série
                            </label>
                            <input
                              type="text"
                              value={editTagline}
                              onChange={(e) => setEditTagline(e.target.value)}
                              placeholder="Ex: Deux traditions. Une même question de foi."
                              className="w-full h-10 px-3 rounded-xl bg-white border border-stone-300 text-xs text-stone-900 focus:border-[#A2482B] outline-hidden"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          <div>
                            <label className="block text-xs font-semibold text-stone-700 mb-1">
                              Thématique / Question centrale
                            </label>
                            <input
                              type="text"
                              value={editCentralQuestion}
                              onChange={(e) => setEditCentralQuestion(e.target.value)}
                              placeholder="Ex: La foi, L'alliance, Le territoire"
                              className="w-full h-10 px-3 rounded-xl bg-white border border-stone-300 text-xs text-stone-900 focus:border-[#A2482B] outline-hidden"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-stone-700 mb-1">
                              URL de l'affiche 9/16 de la série
                            </label>
                            <input
                              type="text"
                              value={editCoverUrl}
                              onChange={(e) => setEditCoverUrl(e.target.value)}
                              placeholder="https://... ou fichier local"
                              className="w-full h-10 px-3 rounded-xl bg-white border border-stone-300 text-xs text-stone-900 focus:border-[#A2482B] outline-hidden font-mono"
                              required
                            />
                          </div>
                        </div>

                        {/* Vidéo teaser / présentation de la série en 9:16 */}
                        <div>
                          <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center justify-between">
                            <span className="flex items-center gap-1.5">
                              <Video className="w-3.5 h-3.5 text-[#A2482B]" />
                              <span>URL de la mini-vidéo générale 9/16 de la série</span>
                            </span>
                            <span className="text-[10px] text-stone-400">Format portrait 9/16</span>
                          </label>
                          <input
                            type="text"
                            value={editTeaserVideoUrl}
                            onChange={(e) => setEditTeaserVideoUrl(e.target.value)}
                            placeholder="https://...mp4"
                            className="w-full h-10 px-3 rounded-xl bg-white border border-stone-300 text-xs text-stone-900 focus:border-[#A2482B] outline-hidden font-mono"
                          />
                        </div>

                        {/* Synopsis détaillé */}
                        <div>
                          <label className="block text-xs font-semibold text-stone-700 mb-1">
                            Synopsis détaillé de la série
                          </label>
                          <textarea
                            rows={3}
                            value={editSynopsis}
                            onChange={(e) => setEditSynopsis(e.target.value)}
                            placeholder="Racontez la confrontation féconde, les univers en miroir et la dramaturgie..."
                            className="w-full p-3 rounded-xl bg-white border border-stone-300 text-xs text-stone-900 focus:border-[#A2482B] outline-hidden resize-none leading-relaxed"
                          />
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* =================================================================== */}
                  {/* BLOC 2 : EFFIGIES & PROFILS RÉFÉRENTS DE LA SÉRIE                  */}
                  {/* =================================================================== */}
                  <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/5 via-amber-400/5 to-amber-500/5 border border-amber-300/70 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-amber-200">
                      <div>
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-[#C89B3C] fill-[#C89B3C]" />
                          <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                            2. Effigies & Figures Référentes de la Série ({editEffigies.length})
                          </h4>
                        </div>
                        <p className="text-[11px] text-stone-600 mt-0.5">
                          Les profils désignés comme <strong>Effigie</strong> incarnent la série face caméra. Leurs vidéos de présentation apparaissent en premier.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => setIsAddingEffigieModalOpen(true)}
                        className="px-3.5 py-1.5 rounded-full bg-[#C89B3C] hover:bg-[#B78A2E] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors shrink-0"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Désigner une Effigie</span>
                      </button>
                    </div>

                    {editEffigies.length === 0 ? (
                      <p className="text-xs text-stone-500 italic py-2">
                        Aucune effigie spécifique désignée pour le moment. Cliquez sur "Désigner une Effigie" pour choisir un profil.
                      </p>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {editEffigies.map((eff) => {
                          const isPrimary = eff.status === 'EFFIGIE_PRINCIPALE';
                          return (
                            <div 
                              key={eff.id}
                              className={`p-3.5 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
                                isPrimary 
                                  ? 'bg-amber-50/90 border-[#C89B3C] shadow-sm ring-2 ring-[#C89B3C]/20' 
                                  : 'bg-white border-stone-200'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <img 
                                  src={eff.photoUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'} 
                                  alt={eff.name}
                                  className="w-12 h-16 rounded-xl object-cover border border-stone-200 shrink-0 shadow-xs"
                                />
                                <div>
                                  <div className="flex items-center gap-1">
                                    <span className="font-bold text-xs text-stone-900">{eff.name}</span>
                                    {isPrimary && (
                                      <Star className="w-3 h-3 text-[#C89B3C] fill-[#C89B3C]" />
                                    )}
                                  </div>
                                  <div className="text-[10px] text-stone-500">{eff.role || 'Effigie de la Série'}</div>
                                  <span className={`inline-block mt-1 text-[9px] font-bold px-2 py-0.5 rounded-full ${
                                    isPrimary 
                                      ? 'bg-[#C89B3C] text-white' 
                                      : 'bg-stone-100 text-stone-600'
                                  }`}>
                                    {isPrimary ? '1ère Vidéo (Effigie Principale)' : 'Effigie Associée'}
                                  </span>
                                </div>
                              </div>

                              <div className="flex flex-col gap-1 items-end shrink-0">
                                {!isPrimary && (
                                  <button
                                    type="button"
                                    onClick={() => handleSetPrimaryEffigie(eff.id)}
                                    title="Mettre en 1ère vidéo"
                                    className="p-1 rounded-lg bg-stone-100 hover:bg-[#C89B3C] hover:text-white text-stone-600 text-[10px] font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                                  >
                                    <UserCheck className="w-3 h-3" />
                                    <span className="text-[9px]">Prioritaire</span>
                                  </button>
                                )}
                                <button
                                  type="button"
                                  onClick={() => handleDeleteEffigie(eff.id)}
                                  title="Retirer cette effigie"
                                  className="p-1 rounded-lg text-rose-500 hover:bg-rose-50 cursor-pointer"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* =================================================================== */}
                  {/* BLOC 3 : ÉPISODES & QUESTIONS CLÉS EN FORMAT 9/16 VERTICAL          */}
                  {/* =================================================================== */}
                  <div className="space-y-4 pt-2">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-2 border-b border-stone-200">
                      <div>
                        <div className="flex items-center gap-2">
                          <Film className="w-4 h-4 text-[#A2482B]" />
                          <h4 className="text-sm font-bold text-stone-900">
                            3. Épisodes de la Série & Questions ({editQuestions.length} chapitres 9/16)
                          </h4>
                        </div>
                        <p className="text-xs text-stone-600 mt-0.5">
                          Pour chaque épisode : définissez la <strong>mini-vidéo 9/16 où la question est présentée</strong>, l'affiche image de secours et l'effigie qui l'introduit.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={handleAddEpisode}
                        className="px-4 py-2 rounded-xl bg-[#A2482B] hover:bg-[#8A3B22] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer transition-all active:scale-95"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Rajouter un épisode (9/16)</span>
                      </button>
                    </div>

                    {/* Liste des épisodes verticaux 9/16 */}
                    <div className="space-y-5">
                      {editQuestions.map((q, idx) => {
                        const isVideoPlaying = playingVideoIndex === idx;
                        return (
                          <div 
                            key={idx}
                            className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-200 hover:border-[#A2482B]/60 shadow-xs hover:shadow-md transition-all space-y-4"
                          >
                            {/* En-tête de l'épisode */}
                            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                              <div className="flex items-center gap-2">
                                <span className="px-2.5 py-0.5 rounded-lg bg-[#A2482B] text-white font-mono text-xs font-black">
                                  Épisode {q.number || String(idx + 1).padStart(2, '0')}
                                </span>
                                <span className="text-xs font-bold text-stone-900">
                                  {q.title || `Épisode ${idx + 1}`}
                                </span>
                                <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-stone-100 text-stone-600 text-[10px] font-mono">
                                  Ratio 9:16 Vertical
                                </span>
                              </div>

                              {/* Contrôles de position et suppression */}
                              <div className="flex items-center gap-1">
                                <button
                                  type="button"
                                  disabled={idx === 0}
                                  onClick={() => handleMoveEpisode(idx, 'up')}
                                  title="Monter"
                                  className="p-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                                >
                                  <ArrowUp className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  type="button"
                                  disabled={idx === editQuestions.length - 1}
                                  onClick={() => handleMoveEpisode(idx, 'down')}
                                  title="Descendre"
                                  className="p-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                                >
                                  <ArrowDown className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteEpisode(idx)}
                                  title="Supprimer cet épisode"
                                  className="p-1 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer ml-1"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>

                            {/* Grille : Colonne 9/16 Gauche (Vidéo + Affiche) / Colonne Droite (Question + Effigie) */}
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
                              
                              {/* COLONNE GAUCHE 9:16 VERTICAL (4 colonnes) */}
                              <div className="md:col-span-4 space-y-2.5">
                                <div className="flex items-center justify-between text-[11px] font-bold text-stone-700">
                                  <span>Mini-Vidéo & Affiche 9/16</span>
                                  <span className="text-[10px] text-[#A2482B] font-mono">9:16</span>
                                </div>

                                {/* Lecteur vidéo 9:16 / Carte d'aperçu */}
                                <div className="relative aspect-[9/16] w-full max-w-[210px] mx-auto rounded-2xl overflow-hidden border-2 border-stone-300 bg-stone-950 shadow-md group">
                                  {isVideoPlaying && q.videoUrl ? (
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
                                      src={q.posterUrl || editCoverUrl} 
                                      alt={q.title} 
                                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                                      onError={(e) => {
                                        (e.target as HTMLImageElement).src = '/assets/posters/jesus-esu.png';
                                      }}
                                    />
                                  )}

                                  {/* Voile et badge vidéo */}
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

                                  <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[9px] font-mono text-white border border-white/20">
                                    ÉP. {q.number}
                                  </div>

                                  {/* Bouton de lecture vidéo */}
                                  {q.videoUrl && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                      <button
                                        type="button"
                                        onClick={() => setPlayingVideoIndex(isVideoPlaying ? null : idx)}
                                        className="w-12 h-12 rounded-full bg-[#A2482B]/90 hover:bg-[#A2482B] text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95 cursor-pointer border border-white/40"
                                        title={isVideoPlaying ? "Arrêter la vidéo" : "Tester la mini-vidéo 9/16"}
                                      >
                                        {isVideoPlaying ? (
                                          <Pause className="w-5 h-5 fill-white" />
                                        ) : (
                                          <Play className="w-5 h-5 fill-white ml-0.5" />
                                        )}
                                      </button>
                                    </div>
                                  )}

                                  {/* Contrôle son si en lecture */}
                                  {isVideoPlaying && (
                                    <button
                                      type="button"
                                      onClick={() => setIsMuted(!isMuted)}
                                      className="absolute bottom-2.5 right-2.5 w-7 h-7 rounded-full bg-black/70 text-white flex items-center justify-center cursor-pointer"
                                    >
                                      {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                                    </button>
                                  )}

                                  <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white pointer-events-none">
                                    <span className="text-[10px] font-medium line-clamp-1">
                                      {isVideoPlaying ? 'Lecture vidéo 9/16' : 'Aperçu 9/16'}
                                    </span>
                                  </div>
                                </div>

                                {/* Champ URL de la mini-vidéo 9/16 */}
                                <div>
                                  <label className="block text-[10px] font-bold text-stone-600 mb-0.5 flex items-center gap-1">
                                    <Video className="w-3 h-3 text-[#A2482B]" />
                                    <span>URL de la mini-vidéo (9/16)</span>
                                  </label>
                                  <input
                                    type="text"
                                    value={q.videoUrl || ''}
                                    onChange={(e) => handleUpdateQuestion(idx, 'videoUrl', e.target.value)}
                                    placeholder="https://...mp4"
                                    className="w-full h-8 px-2.5 rounded-lg bg-stone-50 border border-stone-300 text-[11px] text-stone-900 focus:border-[#A2482B] outline-hidden font-mono"
                                  />
                                </div>

                                {/* Champ URL de l'image de secours 9/16 */}
                                <div>
                                  <label className="block text-[10px] font-bold text-stone-600 mb-0.5">
                                    Affiche miniature de secours (9/16)
                                  </label>
                                  <input
                                    type="text"
                                    value={q.posterUrl || ''}
                                    onChange={(e) => handleUpdateQuestion(idx, 'posterUrl', e.target.value)}
                                    placeholder="URL de l'image ou téléversement"
                                    className="w-full h-8 px-2.5 rounded-lg bg-stone-50 border border-stone-300 text-[11px] text-stone-900 focus:border-[#A2482B] outline-hidden font-mono"
                                  />
                                </div>

                                {/* Actions rapides pour l'affiche */}
                                <div className="flex items-center gap-1.5 pt-0.5">
                                  <button
                                    type="button"
                                    onClick={() => triggerFileUpload(idx)}
                                    className="flex-1 py-1.5 px-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-[10px] font-semibold flex items-center justify-center gap-1 cursor-pointer border border-stone-200 transition-colors"
                                  >
                                    <Upload className="w-3 h-3 text-[#A2482B]" />
                                    <span>Téléverser image</span>
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() => handleUpdateQuestion(idx, 'videoUrl', DEMO_VERTICAL_VIDEOS[idx % DEMO_VERTICAL_VIDEOS.length].url)}
                                    className="flex-1 py-1.5 px-2 rounded-lg bg-[#C89B3C]/10 hover:bg-[#C89B3C]/20 text-[#8B6845] text-[10px] font-semibold flex items-center justify-center gap-1 cursor-pointer border border-[#C89B3C]/30 transition-colors"
                                  >
                                    <Sparkles className="w-3 h-3 text-[#C89B3C]" />
                                    <span>Vidéo démo</span>
                                  </button>
                                </div>
                              </div>

                              {/* COLONNE DROITE : TITRE, QUESTION POSÉE & EFFIGIE DU CHAPITRE (8 colonnes) */}
                              <div className="md:col-span-8 space-y-3.5">
                                
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                                  <div className="sm:col-span-1">
                                    <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                                      Numéro d'épisode
                                    </label>
                                    <input
                                      type="text"
                                      value={q.number}
                                      onChange={(e) => handleUpdateQuestion(idx, 'number', e.target.value)}
                                      className="w-full h-9 px-2.5 rounded-xl bg-stone-50 border border-stone-300 text-xs text-stone-900 focus:border-[#A2482B] outline-hidden font-mono"
                                    />
                                  </div>

                                  <div className="sm:col-span-2">
                                    <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                                      Titre de l'épisode <span className="text-[#A2482B]">*</span>
                                    </label>
                                    <input
                                      type="text"
                                      value={q.title}
                                      onChange={(e) => handleUpdateQuestion(idx, 'title', e.target.value)}
                                      placeholder="Ex: Le Pari Fondateur"
                                      className="w-full h-9 px-3 rounded-xl bg-stone-50 border border-stone-300 text-xs text-stone-900 focus:border-[#A2482B] outline-hidden font-medium"
                                      required
                                    />
                                  </div>
                                </div>

                                {/* Question posée (Prompt de l'épisode) */}
                                <div>
                                  <label className="block text-[11px] font-semibold text-stone-700 mb-1 flex items-center justify-between">
                                    <span>Question posée dans l'épisode (Présentée dans la vidéo 9/16)</span>
                                    <span className="text-[10px] text-[#A2482B] font-medium">Texte prononcé face caméra</span>
                                  </label>
                                  <textarea
                                    rows={3}
                                    value={q.prompt}
                                    onChange={(e) => handleUpdateQuestion(idx, 'prompt', e.target.value)}
                                    placeholder="Racontez-nous un moment où vous avez..."
                                    className="w-full p-3 rounded-xl bg-stone-50 border border-stone-300 text-xs text-stone-900 focus:border-[#A2482B] outline-hidden resize-none leading-relaxed"
                                    required
                                  />
                                </div>

                                {/* Sélection de l'Effigie qui introduit cet épisode */}
                                <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-200 space-y-1.5">
                                  <label className="block text-[11px] font-bold text-stone-800 flex items-center gap-1.5">
                                    <Star className="w-3.5 h-3.5 text-[#C89B3C] fill-[#C89B3C]" />
                                    <span>Effigie qui présente cette question</span>
                                  </label>
                                  <div className="flex gap-2 items-center">
                                    <select
                                      value={q.effigieName || ''}
                                      onChange={(e) => handleUpdateQuestion(idx, 'effigieName', e.target.value)}
                                      className="flex-1 h-9 px-3 rounded-xl bg-white border border-stone-300 text-xs text-stone-900 focus:border-[#A2482B] outline-hidden cursor-pointer"
                                    >
                                      <option value="">Aucune effigie spécifique (présentation neutre)</option>
                                      {editEffigies.map(eff => (
                                        <option key={eff.id} value={eff.name}>
                                          {eff.name} {eff.status === 'EFFIGIE_PRINCIPALE' ? '★ (Effigie Principale)' : ''}
                                        </option>
                                      ))}
                                    </select>

                                    <button
                                      type="button"
                                      onClick={() => setIsAddingEffigieModalOpen(true)}
                                      className="px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold shrink-0 cursor-pointer"
                                      title="Créer une nouvelle effigie"
                                    >
                                      + Créer Effigie
                                    </button>
                                  </div>
                                </div>

                              </div>

                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Bouton bas pour rajouter un épisode */}
                    <div className="pt-2 flex justify-center">
                      <button
                        type="button"
                        onClick={handleAddEpisode}
                        className="px-5 py-2.5 rounded-full bg-white hover:bg-stone-50 border-2 border-dashed border-[#A2482B]/40 hover:border-[#A2482B] text-[#A2482B] text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-xs"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Rajouter un nouvel épisode 9/16 ({String(editQuestions.length + 1).padStart(2, '0')})</span>
                      </button>
                    </div>
                  </div>

                  {/* Boutons d'enregistrement finaux */}
                  <div className="flex items-center justify-between pt-5 border-t border-stone-200">
                    <button
                      type="button"
                      onClick={() => setEditingSeries(null)}
                      className="px-5 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-xs font-semibold text-stone-700 cursor-pointer transition-colors"
                    >
                      Annuler les modifications
                    </button>

                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-[#A2482B] hover:bg-[#8A3B22] text-xs font-bold text-white flex items-center gap-2 shadow-md shadow-[#A2482B]/20 cursor-pointer transition-all active:scale-95"
                    >
                      <Save className="w-4 h-4" />
                      <span>Enregistrer la série & les {editQuestions.length} vidéos 9/16</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* =================================================================== */}
            {/* GRILLE DES SÉRIES DU CATALOGUE (FORMAT 9/16 VERTICAL)                */}
            {/* =================================================================== */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSeries.map((series) => {
                const epCount = series.questions?.length || series.episodeCount || 5;
                const effigieCount = series.effigies?.length || 0;
                return (
                  <div 
                    key={series.id}
                    className="rounded-3xl bg-white border border-stone-200 hover:border-[#A2482B] shadow-xs hover:shadow-lg overflow-hidden flex flex-col group transition-all"
                  >
                    {/* Affiche 9/16 Verticale */}
                    <div className="relative aspect-[9/16] w-full overflow-hidden bg-stone-900">
                      <img 
                        src={series.coverImage} 
                        alt={series.title}
                        className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/assets/posters/jesus-esu.png';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/30 pointer-events-none" />
                      
                      {/* Badge format 9/16 & territoire */}
                      <div className="absolute top-3 left-3 flex items-center gap-1.5">
                        <span className="px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-bold text-white border border-white/20">
                          🌍 {series.territories && series.territories.length > 0 ? series.territories[0] : 'International'}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-[#A2482B] text-white text-[9px] font-mono font-bold">
                          9:16
                        </span>
                      </div>

                      <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-[#C89B3C] text-white text-[10px] font-bold shadow-xs">
                        {epCount} épisodes
                      </div>

                      {/* Titre & Slogan en bas de l'affiche 9/16 */}
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <h4 className="text-xl font-editorial font-bold tracking-tight text-white drop-shadow-md">
                          {series.title}
                        </h4>
                        <p className="text-xs text-stone-200 line-clamp-2 mt-1 italic">
                          « {series.subtitle} »
                        </p>

                        {/* Aperçu des vignettes 9/16 des questions de la série */}
                        <div className="flex items-center gap-1.5 pt-3 overflow-x-auto scrollbar-none">
                          {series.questions?.slice(0, 5).map((q, qIdx) => (
                            <div 
                              key={qIdx}
                              title={`${q.number}: ${q.title}`}
                              className="relative w-8 aspect-[9/16] rounded-md overflow-hidden shrink-0 border border-white/40 bg-stone-800"
                            >
                              <img 
                                src={q.posterUrl || series.coverImage} 
                                alt={q.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Détails et actions */}
                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                      <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                        {series.description}
                      </p>

                      {effigieCount > 0 && (
                        <div className="flex items-center gap-1 text-[11px] text-[#8B6845] font-semibold">
                          <Star className="w-3.5 h-3.5 text-[#C89B3C] fill-[#C89B3C]" />
                          <span>{effigieCount} Effigie{effigieCount > 1 ? 's' : ''} désignée{effigieCount > 1 ? 's' : ''}</span>
                        </div>
                      )}

                      <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                        <button
                          onClick={() => onNavigate({ type: 'documentary_detail', documentaryId: series.id })}
                          className="text-[11px] font-semibold text-stone-600 hover:text-stone-900 flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Voir la fiche</span>
                        </button>

                        <button
                          onClick={() => startEditSeries(series)}
                          className="px-3.5 py-1.5 rounded-xl bg-[#A2482B] hover:bg-[#8A3B22] text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Gérer 9/16 & Effigies</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* ONGLET 2 : MODÉRATION & SIGNALEMENTS                                      */}
        {/* ========================================================================= */}
        {activeTab === 'moderation' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-serif font-bold text-stone-900 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-[#A2482B]" />
                <span>File de Modération (Signalements)</span>
              </h2>
              <p className="text-xs text-stone-600 mt-0.5">
                Passez en revue les signalements déposés par la communauté sur les Duos et les séries.
              </p>
            </div>

            {reports.length === 0 ? (
              <div className="p-12 text-center rounded-3xl bg-white border border-stone-200">
                <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
                <h4 className="text-sm font-bold text-stone-900">Aucun signalement en attente</h4>
                <p className="text-xs text-stone-500 mt-1">Toutes les vidéos sont conformes à la charte éditoriale.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {reports.map((report) => {
                  const isPending = report.status === 'PENDING';
                  return (
                    <div 
                      key={report.id}
                      className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                        isPending 
                          ? 'bg-white border-[#A2482B]/40 shadow-sm' 
                          : 'bg-stone-50 border-stone-200 opacity-60'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            isPending 
                              ? 'bg-[#A2482B]/10 text-[#A2482B] border border-[#A2482B]/30' 
                              : report.status === 'RESOLVED'
                                ? 'bg-emerald-100 text-emerald-700'
                                : 'bg-stone-200 text-stone-600'
                          }`}>
                            {isPending ? 'En attente' : report.status === 'RESOLVED' ? 'Résolu' : 'Ignoré'}
                          </span>
                          <span className="text-xs font-semibold text-stone-900">
                            {report.reasonLabel}
                          </span>
                          <span className="text-[10px] text-stone-500 font-mono">
                            {new Date(report.createdAt).toLocaleDateString('fr-FR')}
                          </span>
                        </div>

                        <div className="text-xs text-stone-700">
                          Cible signalée : <span className="font-semibold text-stone-900">{report.targetTitle}</span> ({report.targetType})
                        </div>

                        {report.details && (
                          <p className="text-xs text-stone-600 italic bg-stone-100 p-2.5 rounded-xl mt-1 max-w-xl border border-stone-200">
                            "{report.details}"
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center">
                        {isPending ? (
                          <>
                            <button
                              onClick={() => handleUpdateReportStatus(report.id, 'DISMISSED')}
                              className="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium cursor-pointer transition-all"
                            >
                              Ignorer
                            </button>
                            <button
                              onClick={() => handleUpdateReportStatus(report.id, 'RESOLVED')}
                              className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs cursor-pointer transition-all flex items-center gap-1.5"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>Traiter & Résoudre</span>
                            </button>
                          </>
                        ) : (
                          <span className="text-[11px] text-stone-500 italic">
                            Dossier clôturé
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* ONGLET 3 : UTILISATEURS                                                    */}
        {/* ========================================================================= */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-serif font-bold text-stone-900 flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#A2482B]" />
                  <span>Membres & Rôles</span>
                </h2>
                <p className="text-xs text-stone-600 mt-0.5">
                  Gérez les permissions (Admin, Créateur, Spectateur) et supprimez les comptes non conformes.
                </p>
              </div>

              <div className="text-xs text-stone-600 font-medium">
                Total : <span className="text-stone-900 font-bold">{usersList.length}</span> membres
              </div>
            </div>

            <div className="overflow-x-auto rounded-3xl border border-stone-200 bg-white shadow-xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAFAF9] text-stone-500 uppercase text-[10px] tracking-wider border-b border-stone-200">
                  <tr>
                    <th className="p-3.5">Utilisateur</th>
                    <th className="p-3.5">E-mail</th>
                    <th className="p-3.5">Rôle</th>
                    <th className="p-3.5">Parts détenues</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {usersList.map((user) => {
                    const isSelf = currentUser?.id === user.id;
                    return (
                      <tr key={user.id} className="hover:bg-stone-50 transition-colors">
                        <td className="p-3.5 flex items-center gap-3">
                          <img 
                            src={user.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'} 
                            alt={user.name}
                            className="w-8 h-8 rounded-full object-cover border border-stone-300"
                          />
                          <div>
                            <div className="font-semibold text-stone-900 flex items-center gap-1.5">
                              <span>{user.name}</span>
                              {user.role === 'ADMIN' && (
                                <Crown className="w-3 h-3 text-[#C89B3C] fill-[#C89B3C]" />
                              )}
                            </div>
                            <div className="text-[10px] text-stone-500">{user.territory || 'International'}</div>
                          </div>
                        </td>

                        <td className="p-3.5 font-mono text-stone-700">
                          {user.email}
                        </td>

                        <td className="p-3.5">
                          <select
                            value={user.role}
                            disabled={isSelf}
                            onChange={(e) => {
                              updateUserRole(user.id, e.target.value as any);
                              showToast(`Rôle de ${user.name} modifié`);
                            }}
                            className="bg-stone-50 border border-stone-300 text-stone-800 rounded-lg px-2 py-1 text-xs outline-hidden cursor-pointer disabled:opacity-50"
                          >
                            <option value="ADMIN">ADMIN</option>
                            <option value="CREATOR">CRÉATEUR</option>
                            <option value="USER">COPRODUCTEUR</option>
                          </select>
                        </td>

                        <td className="p-3.5 font-semibold text-[#A2482B]">
                          {user.sharesCount || 0} parts
                        </td>

                        <td className="p-3.5 text-right">
                          {!isSelf && (
                            <button
                              onClick={() => {
                                if (window.confirm(`Confirmer la suppression de ${user.name} ?`)) {
                                  deleteUser(user.id);
                                  showToast('Utilisateur supprimé');
                                }
                              }}
                              className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition-all cursor-pointer"
                              title="Supprimer cet utilisateur"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* ONGLET 4 : FINANCES & COMMISSIONS                                         */}
        {/* ========================================================================= */}
        {activeTab === 'finances' && (
          <div className="space-y-6">
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-3xl bg-white border border-stone-200 shadow-xs">
                <div className="flex items-center justify-between text-stone-500 text-xs mb-1">
                  <span>Volume Total Collecté</span>
                  <Wallet className="w-4 h-4 text-[#A2482B]" />
                </div>
                <div className="text-2xl font-bold font-serif text-stone-900">
                  {totalInvested.toLocaleString('fr-FR')} €
                </div>
                <p className="text-[10px] text-stone-400 mt-1">Fonds de coproduction levés</p>
              </div>

              <div className="p-5 rounded-3xl bg-white border border-[#A2482B]/30 shadow-xs">
                <div className="flex items-center justify-between text-stone-500 text-xs mb-1">
                  <span>Commission Retenue ({platformFee}%)</span>
                  <Crown className="w-4 h-4 text-[#C89B3C]" />
                </div>
                <div className="text-2xl font-bold font-serif text-[#A2482B]">
                  {platformRevenue.toLocaleString('fr-FR')} €
                </div>
                <p className="text-[10px] text-stone-400 mt-1">Revenus nets de la plateforme</p>
              </div>

              <div className="p-5 rounded-3xl bg-white border border-stone-200 shadow-xs">
                <div className="flex items-center justify-between text-stone-500 text-xs mb-1">
                  <span>Dividendes Versés</span>
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-2xl font-bold font-serif text-emerald-700">
                  {totalDividendsDistributed.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €
                </div>
                <p className="text-[10px] text-stone-400 mt-1">Retours distribués aux coproducteurs</p>
              </div>
            </div>

            {/* Réglage du taux de commission */}
            <div className="p-5 rounded-3xl bg-white border border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
              <div>
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-[#A2482B]" />
                  <h3 className="text-sm font-bold text-stone-900">Structure Financière : Taux de Commission</h3>
                </div>
                <p className="text-xs text-stone-500 mt-0.5">
                  Pourcentage prélevé automatiquement sur chaque acquisition de part.
                </p>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <input
                  type="range"
                  min="5"
                  max="25"
                  step="1"
                  value={platformFee}
                  onChange={(e) => handleSavePlatformFee(Number(e.target.value))}
                  className="w-36 accent-[#A2482B] cursor-pointer"
                />
                <span className="px-3 py-1 rounded-xl bg-[#A2482B] text-white font-mono font-bold text-sm shrink-0">
                  {platformFee} %
                </span>
              </div>
            </div>

            {/* Tableau « Qui a gagné quoi » */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-serif font-bold text-stone-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#C89B3C]" />
                  <span>Tableau des Gains & Retours d'Audience ("Qui a gagné quoi")</span>
                </h3>
                <span className="text-xs text-stone-500">{earningsList.length} transactions enregistrées</span>
              </div>

              <div className="overflow-x-auto rounded-3xl border border-stone-200 bg-white shadow-xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAFAF9] text-stone-500 uppercase text-[10px] tracking-wider border-b border-stone-200">
                    <tr>
                      <th className="p-3.5">Coproducteur</th>
                      <th className="p-3.5">Série Documentaire</th>
                      <th className="p-3.5">Investissement Initial</th>
                      <th className="p-3.5">Audience & Paliers</th>
                      <th className="p-3.5">Plus-Value / Gain</th>
                      <th className="p-3.5 text-right">Statut Versement</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {earningsList.map((earning) => (
                      <tr key={earning.id} className="hover:bg-stone-50 transition-colors">
                        <td className="p-3.5">
                          <div className="font-semibold text-stone-900">{earning.coproducerName}</div>
                          <div className="text-[10px] text-stone-500 font-mono">{earning.coproducerEmail}</div>
                        </td>

                        <td className="p-3.5 text-stone-700 font-medium">
                          {earning.seriesTitle}
                        </td>

                        <td className="p-3.5">
                          <div className="font-semibold text-stone-900">{earning.initialInvestment} €</div>
                          <div className="text-[10px] text-stone-500">{earning.sharesOwned} parts</div>
                        </td>

                        <td className="p-3.5">
                          <div className="text-stone-700 font-mono">{earning.totalViews.toLocaleString('fr-FR')} vues</div>
                          <div className="text-[10px] text-emerald-600 font-semibold">{earning.audienceMilestone}</div>
                        </td>

                        <td className="p-3.5 font-bold text-emerald-700 text-sm">
                          +{earning.dividendEarned.toFixed(2)} €
                        </td>

                        <td className="p-3.5 text-right">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            earning.payoutStatus === 'PAID'
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                              : earning.payoutStatus === 'PROCESSING'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-stone-200 text-stone-600'
                          }`}>
                            {earning.payoutStatus === 'PAID' 
                              ? `Payé (${earning.payoutDate ? new Date(earning.payoutDate).toLocaleDateString('fr-FR') : 'Confirmé'})` 
                              : earning.payoutStatus === 'PROCESSING'
                                ? 'En cours de virement'
                                : 'En attente de clôture'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

      </main>
    </div>
  );
};
