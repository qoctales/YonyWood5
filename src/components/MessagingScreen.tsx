import React, { useState } from 'react';
import { 
  Send, 
  ChevronLeft,
  Check,
  X,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  UserCheck,
  Clock
} from 'lucide-react';
import { ViewScreen } from '../types';

interface MessagingScreenProps {
  onNavigate: (screen: ViewScreen) => void;
}

interface MessageThread {
  id: string;
  senderName: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unreadCount?: number;
  badge?: string;
  messages: {
    id: string;
    from: 'user' | 'contact';
    text: string;
    timestamp: string;
  }[];
}

interface ExchangeRequest {
  id: string;
  senderName: string;
  avatar: string;
  motif: string;
  motifBadge: string;
  message: string;
  time: string;
}

export const MessagingScreen: React.FC<MessagingScreenProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'threads' | 'invitations'>('threads');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const [exchangeRequests, setExchangeRequests] = useState<ExchangeRequest[]>([
    {
      id: 'req-1',
      senderName: 'Amara',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
      motif: 'Coproduction & Projet',
      motifBadge: '🎬 Coproduction',
      message: 'Bonjour Amina, j’ai découvert votre travail dans le documentaire Finagnon. Je prépare une création mariant bois de kora et tissage traditionnel, et j’aimerais vous inviter à collaborer.',
      time: 'Aujourd’hui à 10:15'
    },
    {
      id: 'req-2',
      senderName: 'Fatou',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      motif: 'Transmission & Savoir-faire',
      motifBadge: '🌿 Savoir-faire',
      message: 'Chère Amina, nous organisons une rencontre autour des pigments végétaux et de la transmission textile. Seriez-vous ouverte à un échange préparatoire ?',
      time: 'Hier'
    }
  ]);

  const [selectedRequestId, setSelectedRequestId] = useState<string>('req-1');

  const [threads, setThreads] = useState<MessageThread[]>([
    {
      id: 'thread-1',
      senderName: 'Koffi',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      lastMessage: '« Merci pour votre écoute sur la question du rythme du peigne d’acajou. »',
      time: '11:42',
      unreadCount: 1,
      badge: 'Dialogue ouvert',
      messages: [
        {
          id: 'm-1',
          from: 'contact',
          text: 'Bonjour Amina, j’ai vu que mon duo avec Amara avait fait écho chez vous.',
          timestamp: '11:30'
        },
        {
          id: 'm-2',
          from: 'user',
          text: 'Absolument Koffi, la manière dont vous avez parlé de votre transmission familiale m’a profondément touchée.',
          timestamp: '11:38'
        },
        {
          id: 'm-3',
          from: 'contact',
          text: 'Merci pour votre écoute sur la question du rythme du peigne d’acajou.',
          timestamp: '11:42'
        }
      ]
    },
    {
      id: 'thread-2',
      senderName: 'Comité Yonywood',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      lastMessage: 'Votre proposition de vidéo « Le souffle de la poterie rouge » a été validée.',
      time: 'Hier',
      badge: 'Projet',
      messages: [
        {
          id: 'm-4',
          from: 'contact',
          text: 'Votre proposition de vidéo « Le souffle de la poterie rouge » a été validée.',
          timestamp: 'Hier'
        }
      ]
    },
    {
      id: 'thread-3',
      senderName: 'Sayuri',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
      lastMessage: '« La laque demande de la patience, comme chaque rencontre. »',
      time: 'Mar 10',
      messages: [
        {
          id: 'm-5',
          from: 'contact',
          text: 'La laque demande de la patience, comme chaque rencontre.',
          timestamp: 'Mar 10'
        }
      ]
    }
  ]);

  const [activeThreadId, setActiveThreadId] = useState<string>('thread-1');
  const [draftMessage, setDraftMessage] = useState('');
  // For mobile navigation: when true, user is inside the conversation
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);

  const activeThread = threads.find(t => t.id === activeThreadId) || threads[0];
  const selectedRequest = exchangeRequests.find(r => r.id === selectedRequestId) || exchangeRequests[0];

  const handleSelectThread = (threadId: string) => {
    setActiveThreadId(threadId);
    setIsMobileChatOpen(true);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draftMessage.trim()) return;

    const newMsg = {
      id: `user-${Date.now()}`,
      from: 'user' as const,
      text: draftMessage.trim(),
      timestamp: 'À l’instant'
    };

    setThreads(prev => prev.map(t => {
      if (t.id === activeThreadId) {
        return {
          ...t,
          lastMessage: draftMessage.trim(),
          time: 'À l’instant',
          messages: [...t.messages, newMsg]
        };
      }
      return t;
    }));

    setDraftMessage('');
  };

  // Accepter une demande d'échange
  const handleAcceptRequest = (req: ExchangeRequest) => {
    // 1. Créer une nouvelle discussion avec uniquement le prénom
    const newThreadId = `thread-accepted-${Date.now()}`;
    const newThread: MessageThread = {
      id: newThreadId,
      senderName: req.senderName,
      avatar: req.avatar,
      lastMessage: req.message,
      time: 'À l’instant',
      badge: req.motifBadge,
      messages: [
        {
          id: `m-init-${Date.now()}`,
          from: 'contact',
          text: req.message,
          timestamp: req.time
        }
      ]
    };

    setThreads(prev => [newThread, ...prev]);
    // 2. Retirer de la liste des demandes
    setExchangeRequests(prev => prev.filter(r => r.id !== req.id));
    // 3. Basculer sur l'onglet discussions et ouvrir le fil
    setActiveThreadId(newThreadId);
    setActiveTab('threads');
    setIsMobileChatOpen(true);
    showToast(`Invitation acceptée ! La discussion avec ${req.senderName} est ouverte.`);
  };

  // Refuser une demande d'échange
  const handleDeclineRequest = (reqId: string) => {
    setExchangeRequests(prev => prev.filter(r => r.id !== reqId));
    showToast("Demande d’échange poliment déclinée.");
  };

  return (
    <div className="min-h-screen pb-36 pt-4 px-3 sm:px-6 max-w-5xl mx-auto text-[#1C1917]">
      
      {/* Toast de notification */}
      {toastMessage && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 max-w-md w-full px-4 py-2.5 rounded-2xl bg-[#1C1917] text-white text-xs font-semibold flex items-center justify-between shadow-2xl animate-in fade-in">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-[#E5C16C] shrink-0" />
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="p-1 text-stone-400 hover:text-white">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Header épuré avec bouton Retour vers Profil (chevron unifié, sans sous-titre ni badge) */}
      <div className="pb-3 border-b border-[#E7E5E4] mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate({ type: 'profile' })}
            className="w-8 h-8 rounded-full bg-white hover:bg-stone-100 border border-stone-200 text-[#1C1917] flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95 shrink-0"
            title="Retour au profil"
            id="btn-back-to-profile"
          >
            <ChevronLeft className="w-4 h-4 stroke-[2.2]" />
          </button>
          <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1C1917] leading-none">
            Messagerie
          </h1>
        </div>
      </div>

      {/* Container de messagerie responsive */}
      <div className="bg-[#FFFFFF] rounded-3xl border border-[#E7E5E4] shadow-xs overflow-hidden min-h-[580px] flex flex-col md:grid md:grid-cols-12">
        
        {/* Colonne latérale (Discussions & Demandes d'échange) */}
        <div className={`md:col-span-5 border-r border-[#E7E5E4] flex flex-col ${
          isMobileChatOpen ? 'hidden md:flex' : 'flex'
        }`}>
          {/* Onglets sélecteurs */}
          <div className="p-2 border-b border-[#E7E5E4] bg-[#F9F6EE]/60 grid grid-cols-2 gap-1.5">
            <button
              type="button"
              onClick={() => setActiveTab('threads')}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'threads'
                  ? 'bg-white text-[#1C1917] shadow-xs border border-stone-200'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Discussions</span>
              <span className="ml-1 px-1.5 py-0.2 rounded-full bg-stone-200/70 text-stone-700 text-[10px]">
                {threads.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('invitations')}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 relative ${
                activeTab === 'invitations'
                  ? 'bg-[#A2482B] text-white shadow-xs'
                  : 'text-stone-500 hover:text-[#A2482B]'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Demandes</span>
              {exchangeRequests.length > 0 && (
                <span className={`ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                  activeTab === 'invitations'
                    ? 'bg-white text-[#A2482B]'
                    : 'bg-[#A2482B] text-white'
                }`}>
                  {exchangeRequests.length}
                </span>
              )}
            </button>
          </div>

          {/* Contenu selon onglet actif */}
          {activeTab === 'threads' ? (
            /* Liste des conversations */
            <div className="overflow-y-auto flex-1 divide-y divide-[#E7E5E4]/50">
              {threads.map((thread) => {
                const isSelected = thread.id === activeThreadId;
                return (
                  <div
                    key={thread.id}
                    onClick={() => handleSelectThread(thread.id)}
                    className={`p-4 cursor-pointer transition-all flex items-start gap-3 ${
                      isSelected ? 'bg-[#A2482B]/10 border-l-4 border-l-[#A2482B]' : 'hover:bg-[#FAFAF9]'
                    }`}
                  >
                    <div className="relative shrink-0">
                      <img
                        src={thread.avatar}
                        alt={thread.senderName}
                        className="w-11 h-11 rounded-full object-cover border border-[#C89B3C]/40"
                      />
                      {thread.unreadCount && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#A2482B] text-[9px] font-bold text-[#FFFFFF] flex items-center justify-center">
                          {thread.unreadCount}
                        </span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-editorial text-sm font-bold text-[#1C1917] truncate">
                          {thread.senderName}
                        </h4>
                        <span className="text-[10px] text-[#8B6845] shrink-0 font-mono">
                          {thread.time}
                        </span>
                      </div>

                      <p className="text-xs text-[#68655D] truncate mt-1">
                        {thread.lastMessage}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Liste des demandes d'échange (Invitations) */
            <div className="overflow-y-auto flex-1 divide-y divide-stone-200/60 p-2 space-y-2">
              {exchangeRequests.length === 0 ? (
                <div className="p-8 text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
                    <ShieldCheck className="w-6 h-6 text-stone-400" />
                  </div>
                  <h3 className="text-xs font-bold text-stone-700">Aucune demande en attente</h3>
                  <p className="text-[11px] text-stone-500 max-w-xs mx-auto">
                    Toutes les invitations à échanger ont été traitées. Votre boîte de réception est sereine.
                  </p>
                </div>
              ) : (
                exchangeRequests.map((req) => {
                  const isSelected = req.id === selectedRequestId;
                  return (
                    <div
                      key={req.id}
                      onClick={() => setSelectedRequestId(req.id)}
                      className={`p-3.5 rounded-2xl cursor-pointer transition-all border ${
                        isSelected 
                          ? 'bg-amber-50/70 border-[#A2482B]/40 shadow-xs' 
                          : 'bg-white border-stone-200/70 hover:bg-stone-50'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <img
                          src={req.avatar}
                          alt={req.senderName}
                          className="w-10 h-10 rounded-full object-cover shrink-0 border border-stone-300"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="font-editorial text-xs sm:text-sm font-bold text-stone-900 truncate">
                              {req.senderName}
                            </h4>
                            <span className="text-[10px] text-stone-400 font-mono shrink-0">
                              {req.time}
                            </span>
                          </div>
                          <span className="inline-block mt-0.5 text-[9.5px] font-semibold text-[#A2482B] bg-[#A2482B]/10 px-2 py-0.5 rounded-md">
                            {req.motifBadge}
                          </span>
                          <p className="text-[11px] text-stone-600 line-clamp-2 mt-1.5 italic">
                            "{req.message}"
                          </p>

                          {/* Actions mobiles rapides */}
                          <div className="flex md:hidden items-center gap-1.5 mt-2.5 pt-2 border-t border-stone-200/50">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAcceptRequest(req);
                              }}
                              className="flex-1 py-1.5 px-2 bg-[#A2482B] hover:bg-[#8B3A20] text-white font-bold text-[10px] rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer"
                            >
                              <Check className="w-3 h-3" />
                              <span>Accepter</span>
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeclineRequest(req.id);
                              }}
                              className="py-1.5 px-3 bg-stone-100 hover:bg-stone-200 text-stone-600 font-medium text-[10px] rounded-lg transition-all cursor-pointer"
                            >
                              Décliner
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>

        {/* Colonne principale droite */}
        {activeTab === 'threads' ? (
          /* Vue conversation active */
          <div className={`md:col-span-7 flex flex-col justify-between h-full bg-[#FFFFFF] ${
            !isMobileChatOpen ? 'hidden md:flex' : 'flex'
          }`}>
            
            {/* Header de la conversation active avec bouton retour pour mobile */}
            <div className="p-3.5 sm:p-4 border-b border-[#E7E5E4] bg-[#F9F6EE]/40 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                {/* Bouton retour visible uniquement sur mobile pour revenir à la liste */}
                <button
                  onClick={() => setIsMobileChatOpen(false)}
                  className="md:hidden p-1.5 -ml-1 text-[#8B6845] hover:text-[#1C1917] hover:bg-[#E7E5E4]/50 rounded-full transition-colors"
                  title="Retour aux discussions"
                >
                  <ChevronLeft className="w-5 h-5 stroke-[2.2]" />
                </button>

                <img
                  src={activeThread.avatar}
                  alt={activeThread.senderName}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border border-[#C89B3C]/40"
                />
                <div>
                  <h3 className="font-editorial text-sm sm:text-base font-bold text-[#1C1917]">
                    {activeThread.senderName}
                  </h3>
                </div>
              </div>

              {activeThread.badge && (
                <span className="text-[9px] uppercase font-bold text-[#8B6845] bg-[#C89B3C]/15 px-2.5 py-0.5 rounded-full">
                  {activeThread.badge}
                </span>
              )}
            </div>

            {/* Flux des messages */}
            <div className="p-4 sm:p-6 space-y-3.5 overflow-y-auto flex-1 min-h-[360px] max-h-[460px]">
              {activeThread.messages.map((msg) => {
                const isMe = msg.from === 'user';
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[85%] sm:max-w-md p-3 sm:p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                        isMe
                          ? 'bg-[#1C1917] text-[#FFFFFF] rounded-br-xs shadow-xs'
                          : 'bg-[#FAFAF9] text-[#1C1917] rounded-bl-xs border border-[#E7E5E4]'
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[9px] text-[#8B6845] mt-1 px-1 font-mono">
                      {msg.timestamp}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Formulaire de saisie */}
            <form onSubmit={handleSendMessage} className="p-3 sm:p-4 border-t border-[#E7E5E4] flex items-center gap-2 bg-[#F9F6EE]/30">
              <input
                type="text"
                value={draftMessage}
                onChange={(e) => setDraftMessage(e.target.value)}
                placeholder="Écrire votre message..."
                className="flex-1 bg-[#FFFFFF] border border-[#E7E5E4] rounded-full px-4 py-2 text-xs sm:text-sm text-[#1C1917] placeholder-[#9E9B90] outline-none focus:border-[#A2482B] transition-colors"
              />
              <button
                type="submit"
                disabled={!draftMessage.trim()}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#A2482B] hover:bg-[#8B3A20] disabled:opacity-40 text-[#FFFFFF] flex items-center justify-center transition-colors shrink-0 cursor-pointer shadow-xs"
                title="Envoyer"
              >
                <Send className="w-4 h-4 ml-0.5" />
              </button>
            </form>

          </div>
        ) : (
          /* Vue détaillée de la demande sélectionnée sur desktop */
          <div className="hidden md:flex md:col-span-7 flex-col justify-between h-full bg-[#FAFAF9]/40 p-6 sm:p-8">
            {selectedRequest ? (
              <div className="max-w-md mx-auto w-full space-y-6 bg-white p-6 rounded-3xl border border-stone-200/80 shadow-sm my-auto">
                <div className="flex items-center gap-4 pb-4 border-b border-stone-100">
                  <img
                    src={selectedRequest.avatar}
                    alt={selectedRequest.senderName}
                    className="w-14 h-14 rounded-full object-cover border-2 border-[#A2482B]/30"
                  />
                  <div>
                    <h3 className="font-editorial text-lg font-bold text-stone-900">
                      {selectedRequest.senderName}
                    </h3>
                    <span className="inline-block mt-1 text-[10px] font-bold text-[#A2482B] bg-[#A2482B]/10 px-2 py-0.5 rounded-full">
                      {selectedRequest.motifBadge}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block">
                    Message d'introduction & Démarche :
                  </span>
                  <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/60 text-xs sm:text-sm text-stone-800 leading-relaxed font-serif italic">
                    "{selectedRequest.message}"
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-stone-400 font-mono pt-1">
                    <Clock className="w-3 h-3" />
                    <span>Reçu {selectedRequest.time}</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/50 text-[11px] text-amber-900 flex items-start gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#A2482B] shrink-0 mt-0.5" />
                  <span>En acceptant cette invitation, un salon privé et sécurisé s’ouvrira instantanément pour poursuivre l'échange.</span>
                </div>

                <div className="flex gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => handleAcceptRequest(selectedRequest)}
                    className="flex-1 h-11 bg-[#A2482B] hover:bg-[#8B3A20] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    <span>Accepter l'échange</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeclineRequest(selectedRequest.id)}
                    className="h-11 px-4 bg-white hover:bg-stone-100 text-stone-600 font-semibold text-xs rounded-xl border border-stone-200 transition-all active:scale-[0.98] cursor-pointer"
                  >
                    Décliner
                  </button>
                </div>
              </div>
            ) : (
              <div className="my-auto text-center p-8 space-y-2">
                <ShieldCheck className="w-8 h-8 text-stone-300 mx-auto" />
                <p className="text-xs text-stone-500 font-medium">Sélectionnez une demande dans la liste pour consulter les détails.</p>
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
};
