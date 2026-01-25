
// Sound assets
const SOUNDS = {
  jump: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3', // Cartoon jump
  correct: 'https://assets.mixkit.co/active_storage/sfx/1114/1114-preview.mp3', // Correct ping
  error: 'https://assets.mixkit.co/active_storage/sfx/2572/2572-preview.mp3', // Error buzz
  collect: 'https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3', // Coin collect
  win: 'https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3', // Win jingle
  lose: 'https://assets.mixkit.co/active_storage/sfx/2026/2026-preview.mp3', // Retro failure
  engine: 'https://assets.mixkit.co/active_storage/sfx/1070/1070-preview.mp3', // Engine rev (short)
  // Funky/Kid-friendly background loops
  bgm_frog: 'https://assets.mixkit.co/active_storage/sfx/123/123-preview.mp3', // Hip hop styled (placeholder)
  bgm_racer: 'https://assets.mixkit.co/active_storage/sfx/124/124-preview.mp3', // Techno fast (placeholder)
  bgm_python: 'https://assets.mixkit.co/active_storage/sfx/125/125-preview.mp3', // Mystery synth (placeholder)
  start: 'https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3', // Game Start (reusing collect for now)
  move: 'https://assets.mixkit.co/active_storage/sfx/1070/1070-preview.mp3', // Robot move (reusing engine)
};

type SoundKey = keyof typeof SOUNDS;

class SoundManager {
  private audioCache: Partial<Record<SoundKey, HTMLAudioElement>> = {};
  private muted: boolean = false;
  private currentBgm: HTMLAudioElement | null = null;

  constructor() {
    // Preload sounds
    Object.keys(SOUNDS).forEach((key) => {
      const audio = new Audio(SOUNDS[key as SoundKey]);
      audio.volume = key.startsWith('bgm') ? 0.2 : 0.5; // Lower volume for music
      this.audioCache[key as SoundKey] = audio;
    });
  }

  play(key: SoundKey, volume = 0.5) {
    if (this.muted) return;
    
    const audio = this.audioCache[key];
    if (audio) {
      if (!key.toString().startsWith('bgm')) {
         audio.currentTime = 0; // Reset to start
         audio.volume = volume;
         audio.play().catch(e => console.warn("Audio play failed", e));
      }
    }
  }

  playMusic(key: 'bgm_frog' | 'bgm_racer' | 'bgm_python') {
    if (this.muted) return;
    
    // Stop current if playing
    this.stopMusic();

    const audio = this.audioCache[key];
    if (audio) {
      audio.loop = true;
      audio.volume = 0.2;
      audio.play().catch(e => console.warn("BGM play failed", e));
      this.currentBgm = audio;
    }
  }

  stopMusic() {
    if (this.currentBgm) {
      this.currentBgm.pause();
      this.currentBgm.currentTime = 0;
      this.currentBgm = null;
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    if (this.muted) {
      this.stopMusic();
    } else {
      // potentially resume music if it was playing? For now simple toggle.
    }
    return this.muted;
  }
}

export const soundService = new SoundManager();
