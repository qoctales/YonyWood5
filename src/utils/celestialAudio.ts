// Audio solennel, noble et organique pour l'astrolabe YonyWood (Web Audio API natif, 0 dépendance)
// Inspiré des bols tibétains, cloches de bronze vénérables, gongs doux et résonances d'ébène
class CelestialAudioSystem {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private lastHoverTime = 0;

  private init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.85, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  // Frôlement noble et velouté au survol (résonance feutrée de bronze / ébène)
  // Remplace l'ancien bip/glissando aigu enfantin par une onde grave, chaleureuse et discrète
  playOrbHover(_unusedPitch = 520) {
    try {
      const now = Date.now();
      // Anti-mitraillage délicat pour garder une atmosphère sereine
      if (now - this.lastHoverTime < 90) return;
      this.lastHoverTime = now;

      this.init();
      if (!this.ctx || !this.masterGain) return;

      const t = this.ctx.currentTime;
      // Fréquence fondamentale chaude et solennelle (autour de 146.8 Hz / Ré2 grave et élégant)
      const baseFreq = 146.83; 

      // 1. Fondamentale douce (sine ronde)
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(baseFreq, t);

      // 2. Harmonique chaude de quinte (La2 - 220Hz) avec filtre velouté
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(baseFreq * 1.5, t);

      // Filtre passe-bas pour ôter toute aigreur numérique
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, t);
      filter.frequency.exponentialRampToValueAtTime(160, t + 0.35);

      gain1.gain.setValueAtTime(0.0001, t);
      gain1.gain.linearRampToValueAtTime(0.045, t + 0.03);
      gain1.gain.exponentialRampToValueAtTime(0.0001, t + 0.38);

      gain2.gain.setValueAtTime(0.0001, t);
      gain2.gain.linearRampToValueAtTime(0.02, t + 0.04);
      gain2.gain.exponentialRampToValueAtTime(0.0001, t + 0.28);

      osc1.connect(gain1);
      osc2.connect(gain2);
      gain1.connect(filter);
      gain2.connect(filter);
      filter.connect(this.masterGain);

      osc1.start(t);
      osc2.start(t);
      osc1.stop(t + 0.4);
      osc2.stop(t + 0.4);
    } catch {
      // Ignorer silencieusement si l'audio est bloqué par le navigateur
    }
  }

  // Son solennel et majestueux lors de la sélection (porte, sujet, roue, voix)
  // Véritable cloche de bronze rituelle / gong profond avec harmoniques naturelles riches et longue résonance feutrée
  playOrbSelect() {
    try {
      this.init();
      if (!this.ctx || !this.masterGain) return;

      const t = this.ctx.currentTime;

      // Fréquence fondamentale sacrée et profonde : Ré1 / Ré2 (73.4 Hz et 146.8 Hz)
      // Harmoniques inspirées des cloches cathédrales et grands bols tibétains
      const partials = [
        { freq: 73.42, gain: 0.18, decay: 1.4, type: 'sine' as OscillatorType },   // Bourdon profond sous la matière
        { freq: 146.83, gain: 0.14, decay: 1.2, type: 'sine' as OscillatorType },  // Fondamentale Ré
        { freq: 220.00, gain: 0.09, decay: 0.9, type: 'sine' as OscillatorType },  // Quinte (La) pureté solennelle
        { freq: 293.66, gain: 0.05, decay: 0.7, type: 'sine' as OscillatorType },  // Octave Ré3
        { freq: 440.00, gain: 0.02, decay: 0.45, type: 'sine' as OscillatorType }, // Brillance dorée très discrète
      ];

      // Filtre de résonance acoustique (émule la cavité d'air et le bronze ancien)
      const biquad = this.ctx.createBiquadFilter();
      biquad.type = 'lowpass';
      biquad.frequency.setValueAtTime(650, t);
      biquad.frequency.exponentialRampToValueAtTime(220, t + 1.2);
      biquad.Q.setValueAtTime(2.2, t);
      biquad.connect(this.masterGain);

      partials.forEach(({ freq, gain: peakGain, decay, type }) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const g = this.ctx.createGain();

        osc.type = type;
        // Légère déviation micro-tonale pour la richesse organique et la vie de la cloche
        osc.frequency.setValueAtTime(freq * (1 + (Math.random() - 0.5) * 0.004), t);

        // Attaque douce et feutrée (pas de "clic" ni d'impact de jeu d'arcade)
        g.gain.setValueAtTime(0.0001, t);
        g.gain.linearRampToValueAtTime(peakGain, t + 0.025);
        g.gain.exponentialRampToValueAtTime(0.0001, t + decay);

        osc.connect(g);
        g.connect(biquad);

        osc.start(t);
        osc.stop(t + decay + 0.05);
      });
    } catch {
      // Ignorer silencieusement
    }
  }

  // Résonance d'ouverture intime (pour l'accès au profil / film / grand récit)
  playRevealDeep() {
    try {
      this.init();
      if (!this.ctx || !this.masterGain) return;
      const t = this.ctx.currentTime;

      // Accord mineur noble et mystérieux Ré - Fa - La
      const chord = [73.42, 110.00, 146.83, 174.61, 220.00];
      chord.forEach((freq, idx) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const g = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t + idx * 0.04);

        g.gain.setValueAtTime(0.0001, t + idx * 0.04);
        g.gain.linearRampToValueAtTime(0.06 / (idx + 1), t + idx * 0.04 + 0.08);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 1.8);

        osc.connect(g);
        g.connect(this.masterGain);

        osc.start(t + idx * 0.04);
        osc.stop(t + 1.85);
      });
    } catch {
      // Ignorer silencieusement
    }
  }
}

export const celestialAudio = new CelestialAudioSystem();
