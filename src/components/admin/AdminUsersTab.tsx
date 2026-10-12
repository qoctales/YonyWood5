import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Shield, 
  Briefcase, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  XCircle, 
  Edit3, 
  FileCheck, 
  Save, 
  X,
  Plus,
  Filter
} from 'lucide-react';
import { AdminUserAccount, BusinessRole, AdminRole } from '../../types/adminBackOffice';

interface AdminUsersTabProps {
  users: AdminUserAccount[];
  onUpdateUser: (updated: AdminUserAccount, justification: string) => void;
  onDeleteUser: (userId: string, justification: string) => void;
}

const ALL_BUSINESS_ROLES: { id: BusinessRole; label: string; desc: string }[] = [
  { id: 'egerie', label: 'Égérie', desc: 'Figure d\'incarnation d\'une série' },
  { id: 'membre_coopte', label: 'Membre coopté', desc: 'Membre admis par cooptation avec filiation' },
  { id: 'acteur_documentaire', label: 'Acteur documentaire', desc: 'Intervenant à l\'image ou témoin' },
  { id: 'auteur', label: 'Auteur', desc: 'Auteur d\'histoires et récits du réel' },
  { id: 'scenariste', label: 'Scénariste', desc: 'Concepteur des arcs narratifs' },
  { id: 'producteur', label: 'Producteur', desc: 'Financeur ou coproducteur accrédité' },
  { id: 'distributeur_communautaire', label: 'Distributeur communautaire', desc: 'Passeur et relais de diffusion' },
  { id: 'referent_cooptation', label: 'Référent de cooptation', desc: 'Habilité à parrainer de nouveaux membres' }
];

const ALL_ADMIN_ROLES: { id: AdminRole; label: string; desc: string }[] = [
  { id: 'superadministrateur', label: 'Superadministrateur', desc: 'Accès total à toutes les configurations' },
  { id: 'responsable_editorial', label: 'Responsable éditorial', desc: 'Validation des histoires et thématiques' },
  { id: 'responsable_production', label: 'Responsable de production', desc: 'Gestion des séries, duos et tournages' },
  { id: 'responsable_commercial', label: 'Responsable commercial', desc: 'Gestion des marques, pub et sponsoring' },
  { id: 'responsable_financier', label: 'Responsable financier', desc: 'Gestion des commissions, enveloppes et versements' },
  { id: 'moderateur', label: 'Modérateur', desc: 'Traitement des signalements et sécurité' },
  { id: 'analyste', label: 'Analyste', desc: 'Consultation des métriques et rapports' }
];

export const AdminUsersTab: React.FC<AdminUsersTabProps> = ({
  users,
  onUpdateUser,
  onDeleteUser
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ACTIF' | 'EN_ATTENTE_VERIFICATION' | 'VERIFIE' | 'SUSPENDU'>('ALL');
  const [roleFilter, setRoleFilter] = useState<string>('ALL');

  // Modal d'édition de profil & rôles
  const [editingUser, setEditingUser] = useState<AdminUserAccount | null>(null);
  const [editBusinessRoles, setEditBusinessRoles] = useState<BusinessRole[]>([]);
  const [editAdminRoles, setEditAdminRoles] = useState<AdminRole[]>([]);
  const [editAccountStatus, setEditAccountStatus] = useState<AdminUserAccount['accountStatus']>('ACTIF');
  const [editJustification, setEditJustification] = useState('');
  const [editVerificationNotes, setEditVerificationNotes] = useState('');

  const openEditModal = (u: AdminUserAccount) => {
    setEditingUser(u);
    setEditBusinessRoles([...u.businessRoles]);
    setEditAdminRoles([...u.adminRoles]);
    setEditAccountStatus(u.accountStatus);
    setEditVerificationNotes(u.verificationDocuments?.notes || '');
    setEditJustification('');
  };

  const handleToggleBusinessRole = (role: BusinessRole) => {
    setEditBusinessRoles(prev => 
      prev.includes(role) ? prev.filter(r => r !== role) : [...prev, role]
    );
  };

  const handleToggleAdminRole = (role: AdminRole) => {
    setEditAdminRoles(prev => 
      prev.includes(role) ? prev.filter(r => r !== role) : [...prev, role]
    );
  };

  const handleSaveUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;

    const updated: AdminUserAccount = {
      ...editingUser,
      accountStatus: editAccountStatus,
      businessRoles: editBusinessRoles,
      adminRoles: editAdminRoles,
      verificationDocuments: {
        idDocumentProvided: editingUser.verificationDocuments?.idDocumentProvided || false,
        contractSigned: editingUser.verificationDocuments?.contractSigned || false,
        submittedAt: editingUser.verificationDocuments?.submittedAt || new Date().toISOString(),
        verifiedAt: editAccountStatus === 'VERIFIE' ? new Date().toISOString() : editingUser.verificationDocuments?.verifiedAt,
        notes: editVerificationNotes.trim()
      }
    };

    onUpdateUser(updated, editJustification.trim() || 'Mise à jour des rôles et du statut du compte');
    setEditingUser(null);
  };

  const filteredUsers = users.filter(u => {
    const matchesSearch = 
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.territory && u.territory.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = statusFilter === 'ALL' || u.accountStatus === statusFilter;

    const matchesRole = 
      roleFilter === 'ALL' || 
      u.businessRoles.includes(roleFilter as BusinessRole) ||
      u.adminRoles.includes(roleFilter as AdminRole);

    return matchesSearch && matchesStatus && matchesRole;
  });

  return (
    <div className="space-y-6">
      {/* En-tête explicatif */}
      <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold font-serif text-stone-900 flex items-center gap-2">
            <Users className="w-4 h-4 text-[#A2482B]" />
            <span>Gestion des Utilisateurs & Double Matrice de Rôles</span>
          </h2>
          <p className="text-xs text-stone-500 mt-1 max-w-3xl">
            Séparation stricte entre les <strong className="text-stone-800">rôles métier</strong> (égérie, acteur, producteur, référent cooptation...) et les <strong className="text-stone-800">rôles administratifs</strong> (superadmin, responsable éditorial, financier...). Un utilisateur peut cumuler plusieurs attributions selon ses habilitations.
          </p>
        </div>

        <div className="text-xs text-stone-600 bg-stone-50 px-4 py-2 rounded-2xl border border-stone-200 shrink-0">
          <span className="font-bold text-stone-900">{users.length}</span> profils enregistrés
        </div>
      </div>

      {/* Barre de filtres et recherche */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1 min-w-[240px]">
          <div className="relative w-full">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input 
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Rechercher par nom, email ou territoire..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:border-[#A2482B] outline-hidden"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Filtre statut */}
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value as any)}
            className="px-3 py-1.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-800 focus:border-[#A2482B] outline-hidden cursor-pointer"
          >
            <option value="ALL">Tous les statuts</option>
            <option value="VERIFIE">Comptes vérifiés</option>
            <option value="ACTIF">Actifs (standards)</option>
            <option value="EN_ATTENTE_VERIFICATION">En attente de vérification</option>
            <option value="SUSPENDU">Suspendus</option>
          </select>

          {/* Filtre rôle */}
          <select
            value={roleFilter}
            onChange={e => setRoleFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-800 focus:border-[#A2482B] outline-hidden cursor-pointer"
          >
            <option value="ALL">Tous les rôles</option>
            <optgroup label="Rôles Métier">
              {ALL_BUSINESS_ROLES.map(r => (
                <option key={r.id} value={r.id}>{r.label}</option>
              ))}
            </optgroup>
            <optgroup label="Rôles Administratifs">
              {ALL_ADMIN_ROLES.map(r => (
                <option key={r.id} value={r.id}>{r.label}</option>
              ))}
            </optgroup>
          </select>
        </div>
      </div>

      {/* Tableau des utilisateurs */}
      <div className="overflow-x-auto rounded-3xl border border-stone-200 bg-white shadow-xs">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#FAFAF9] text-stone-500 uppercase text-[10px] tracking-wider border-b border-stone-200">
            <tr>
              <th className="p-3.5">Utilisateur & Territoire</th>
              <th className="p-3.5">Statut du Compte</th>
              <th className="p-3.5">Rôles Métier</th>
              <th className="p-3.5">Rôles Administratifs</th>
              <th className="p-3.5">Conformité & Pièces</th>
              <th className="p-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {filteredUsers.map(user => (
              <tr key={user.id} className="hover:bg-stone-50/80 transition-colors">
                {/* Utilisateur */}
                <td className="p-3.5">
                  <div className="flex items-center gap-3">
                    <img 
                      src={user.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'} 
                      alt={user.name} 
                      className="w-8 h-8 rounded-full object-cover border border-stone-200"
                    />
                    <div>
                      <div className="font-bold text-stone-900">{user.name}</div>
                      <div className="text-[10px] text-stone-500 font-mono">{user.email}</div>
                      {user.territory && (
                        <div className="text-[10px] text-stone-400 mt-0.5">{user.territory} • {user.country}</div>
                      )}
                    </div>
                  </div>
                </td>

                {/* Statut du compte */}
                <td className="p-3.5">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    user.accountStatus === 'VERIFIE'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : user.accountStatus === 'ACTIF'
                        ? 'bg-blue-50 text-blue-800 border border-blue-200'
                        : user.accountStatus === 'EN_ATTENTE_VERIFICATION'
                          ? 'bg-amber-50 text-amber-800 border border-amber-200'
                          : 'bg-rose-50 text-rose-800 border border-rose-200'
                  }`}>
                    {user.accountStatus === 'VERIFIE' && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                    {user.accountStatus === 'EN_ATTENTE_VERIFICATION' && <Clock className="w-3 h-3 text-amber-600" />}
                    {user.accountStatus === 'SUSPENDU' && <XCircle className="w-3 h-3 text-rose-600" />}
                    <span>{user.accountStatus}</span>
                  </span>
                </td>

                {/* Rôles Métier */}
                <td className="p-3.5">
                  <div className="flex flex-wrap gap-1 max-w-[260px]">
                    {user.businessRoles.length > 0 ? (
                      user.businessRoles.map(roleKey => {
                        const r = ALL_BUSINESS_ROLES.find(x => x.id === roleKey);
                        return (
                          <span 
                            key={roleKey} 
                            className="px-2 py-0.5 rounded-lg bg-stone-100 text-stone-700 font-medium text-[10px] border border-stone-200"
                            title={r?.desc}
                          >
                            {r?.label || roleKey}
                          </span>
                        );
                      })
                    ) : (
                      <span className="text-stone-400 text-[10px] italic">Aucun rôle métier</span>
                    )}
                  </div>
                </td>

                {/* Rôles Administratifs */}
                <td className="p-3.5">
                  <div className="flex flex-wrap gap-1 max-w-[260px]">
                    {user.adminRoles.length > 0 ? (
                      user.adminRoles.map(roleKey => {
                        const r = ALL_ADMIN_ROLES.find(x => x.id === roleKey);
                        return (
                          <span 
                            key={roleKey} 
                            className="px-2 py-0.5 rounded-lg bg-[#A2482B]/10 text-[#A2482B] font-bold text-[10px] border border-[#A2482B]/20"
                            title={r?.desc}
                          >
                            {r?.label || roleKey}
                          </span>
                        );
                      })
                    ) : (
                      <span className="text-stone-400 text-[10px] italic">Aucune habilitation admin</span>
                    )}
                  </div>
                </td>

                {/* Conformité & Pièces */}
                <td className="p-3.5">
                  <div className="space-y-0.5 text-[10px]">
                    <div className="flex items-center gap-1">
                      <span className={`w-1.5 h-1.5 rounded-full ${user.verificationDocuments?.idDocumentProvided ? 'bg-emerald-500' : 'bg-stone-300'}`} />
                      <span className={user.verificationDocuments?.idDocumentProvided ? 'text-stone-700' : 'text-stone-400'}>
                        Pièce ID : {user.verificationDocuments?.idDocumentProvided ? 'Fournie' : 'Manquante'}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className={`w-1.5 h-1.5 rounded-full ${user.verificationDocuments?.contractSigned ? 'bg-emerald-500' : 'bg-stone-300'}`} />
                      <span className={user.verificationDocuments?.contractSigned ? 'text-stone-700' : 'text-stone-400'}>
                        Contrat : {user.verificationDocuments?.contractSigned ? 'Signé' : 'Non signé'}
                      </span>
                    </div>
                  </div>
                </td>

                {/* Actions */}
                <td className="p-3.5 text-right">
                  <button
                    onClick={() => openEditModal(user)}
                    className="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-[#A2482B] text-stone-700 hover:text-white transition-all text-xs font-semibold cursor-pointer inline-flex items-center gap-1"
                  >
                    <Edit3 className="w-3 h-3" />
                    <span>Gérer rôles</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL D'ÉDITION DES RÔLES & PERMISSIONS */}
      {editingUser && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-stone-200 my-8 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-3">
                <img 
                  src={editingUser.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'} 
                  alt={editingUser.name} 
                  className="w-10 h-10 rounded-full object-cover border border-stone-200"
                />
                <div>
                  <h3 className="text-base font-bold text-stone-900 font-serif">
                    Gérer le profil de {editingUser.name}
                  </h3>
                  <p className="text-xs text-stone-500 font-mono">{editingUser.email}</p>
                </div>
              </div>
              <button 
                onClick={() => setEditingUser(null)}
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveUser} className="space-y-5">
              {/* Statut du compte */}
              <div>
                <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1.5">
                  Statut du Compte
                </label>
                <select
                  value={editAccountStatus}
                  onChange={e => setEditAccountStatus(e.target.value as any)}
                  className="w-full h-10 px-3 rounded-xl bg-stone-50 border border-stone-300 text-xs text-stone-900 font-semibold focus:border-[#A2482B] outline-hidden cursor-pointer"
                >
                  <option value="ACTIF">ACTIF (Standard)</option>
                  <option value="VERIFIE">VÉRIFIÉ (Identité & pièces validées)</option>
                  <option value="EN_ATTENTE_VERIFICATION">EN ATTENTE DE VÉRIFICATION (Dossier en cours)</option>
                  <option value="SUSPENDU">SUSPENDU (Accès bloqué)</option>
                </select>
              </div>

              {/* Rôles Métier */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-stone-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-[#C89B3C]" />
                    <span>Rôles Métier (Sélection multiple)</span>
                  </label>
                  <span className="text-[10px] text-stone-500">Cocher pour attribuer</span>
                </div>
                <div className="grid grid-cols-2 gap-2 bg-stone-50 p-3 rounded-2xl border border-stone-200">
                  {ALL_BUSINESS_ROLES.map(role => {
                    const isChecked = editBusinessRoles.includes(role.id);
                    return (
                      <label 
                        key={role.id} 
                        className={`flex items-start gap-2.5 p-2 rounded-xl border text-xs cursor-pointer transition-all ${
                          isChecked 
                            ? 'bg-white border-[#A2482B] shadow-xs' 
                            : 'bg-transparent border-transparent hover:bg-white/60'
                        }`}
                      >
                        <input 
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleToggleBusinessRole(role.id)}
                          className="mt-0.5 accent-[#A2482B] cursor-pointer"
                        />
                        <div>
                          <div className={`font-semibold ${isChecked ? 'text-[#A2482B]' : 'text-stone-800'}`}>
                            {role.label}
                          </div>
                          <div className="text-[10px] text-stone-500">{role.desc}</div>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Rôles Administratifs */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-stone-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-[#A2482B]" />
                    <span>Rôles Administratifs & Habilitations</span>
                  </label>
                  <span className="text-[10px] text-stone-500">Permissions sensibles</span>
                </div>
                <div className="grid grid-cols-2 gap-2 bg-[#A2482B]/5 p-3 rounded-2xl border border-[#A2482B]/20">
                  {ALL_ADMIN_ROLES.map(role => {
                    const isChecked = editAdminRoles.includes(role.id);
                    return (
                      <label 
                        key={role.id} 
                        className={`flex items-start gap-2.5 p-2 rounded-xl border text-xs cursor-pointer transition-all ${
                          isChecked 
                            ? 'bg-white border-[#A2482B] shadow-xs' 
                            : 'bg-transparent border-transparent hover:bg-white/60'
                        }`}
                      >
                        <input 
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleToggleAdminRole(role.id)}
                          className="mt-0.5 accent-[#A2482B] cursor-pointer"
                        />
                        <div>
                          <div className={`font-semibold ${isChecked ? 'text-[#A2482B]' : 'text-stone-800'}`}>
                            {role.label}
                          </div>
                          <div className="text-[10px] text-stone-500">{role.desc}</div>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Notes de vérification */}
              <div>
                <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">
                  Notes de vérification du dossier
                </label>
                <input 
                  type="text"
                  value={editVerificationNotes}
                  onChange={e => setEditVerificationNotes(e.target.value)}
                  placeholder="Ex: Pièce ID vérifiée le 12/04, contrat de diffusion en règle"
                  className="w-full h-9 px-3 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:border-[#A2482B] outline-hidden"
                />
              </div>

              {/* Justification obligatoire pour l'audit */}
              <div>
                <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">
                  Motif / Justification administrative <span className="text-[#A2482B]">*</span>
                </label>
                <input 
                  type="text"
                  value={editJustification}
                  onChange={e => setEditJustification(e.target.value)}
                  placeholder="Ex: Attribution du rôle d'égérie suite à la validation du contrat de coproduction"
                  className="w-full h-9 px-3 rounded-xl bg-stone-50 border border-stone-300 text-xs text-stone-900 focus:border-[#A2482B] outline-hidden"
                  required
                />
                <p className="text-[10px] text-stone-400 mt-0.5">
                  Sera consigné de façon inaltérable dans le Journal d'Audit officiel.
                </p>
              </div>

              {/* Boutons d'action */}
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={!editJustification.trim()}
                  className="px-5 py-2 rounded-xl bg-[#A2482B] hover:bg-[#8A3B22] disabled:opacity-40 text-white text-xs font-bold cursor-pointer transition-colors shadow-xs flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Enregistrer & Consigner</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
