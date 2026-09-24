/**
 * 🌐 CLIENT D'API YONYWOOD AVEC FALLBACK GRACIEUX
 * Permet au front-end de communiquer avec l'API développée par l'agent Google Antigravity,
 * tout en conservant un fonctionnement parfait hors-ligne / mock si le serveur n'est pas encore démarré.
 */

import { DOCUMENTARIES, DUOS } from '../data/mockData';
import { EXPLORER_CATEGORIES, EXPLORER_CATALOG } from '../data/explorerTopicsData';
import { Duo, Documentary, ExplorerCategory } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

class YonywoodApiService {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T | null> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...(localStorage.getItem('yonywood_auth_token') ? {
            'Authorization': `Bearer ${localStorage.getItem('yonywood_auth_token')}`
          } : {})
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`Erreur API ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch {
      // En cas d'indisponibilité du serveur Antigravity, retour gracieux (fallback)
      return null;
    }
  }

  // 1. SÉRIES DOCUMENTAIRES
  async getSeries(): Promise<Documentary[]> {
    const data = await this.request<Documentary[]>('/series');
    return data || DOCUMENTARIES;
  }

  async getSeriesById(id: string): Promise<Documentary | undefined> {
    const data = await this.request<Documentary>(`/series/${id}`);
    return data || DOCUMENTARIES.find(d => d.id === id);
  }

  // 2. FLUX DES DUOS (VIDÉOS 9:16)
  async getDuos(selectedSeriesFilter?: string[]): Promise<Duo[]> {
    const query = selectedSeriesFilter && selectedSeriesFilter.length > 0 
      ? `?series=${encodeURIComponent(selectedSeriesFilter.join(','))}` 
      : '';
    
    const data = await this.request<Duo[]>(`/duos${query}`);
    if (data) return data;

    // Fallback local avec filtre
    if (selectedSeriesFilter && selectedSeriesFilter.length > 0) {
      return DUOS.filter(d => selectedSeriesFilter.includes(d.documentaryId));
    }
    return DUOS;
  }

  // 3. ASTROLABE / ROUES DES 8 PORTES
  async getExplorerCategories() {
    const data = await this.request('/explorer/categories');
    return data || EXPLORER_CATEGORIES;
  }

  async getExplorerTopics(category: ExplorerCategory) {
    const data = await this.request(`/explorer/topics/${category}`);
    return data || EXPLORER_CATALOG[category] || [];
  }

  // 4. MESSAGERIE DIRECTE & PRÉFÉRENCES
  async updateMessagePreferences(prefs: {
    permission: 'all' | 'invitation' | 'none';
    pushNotification: boolean;
    preview: boolean;
  }) {
    localStorage.setItem('yonywood_msg_permission', prefs.permission);
    localStorage.setItem('yonywood_push_msg', String(prefs.pushNotification));
    localStorage.setItem('yonywood_msg_preview', String(prefs.preview));

    return await this.request('/auth/preferences', {
      method: 'PUT',
      body: JSON.stringify(prefs)
    });
  }

  // 5. COPRODUCTION
  async submitPledge(seriesId: string, sharesCount: number, amount: number) {
    return await this.request('/coproduction/pledge', {
      method: 'POST',
      body: JSON.stringify({ seriesId, sharesCount, amount })
    });
  }
}

export const apiService = new YonywoodApiService();
