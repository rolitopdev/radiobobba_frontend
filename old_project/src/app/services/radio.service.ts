import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class RadioService {

  private audio: HTMLAudioElement;
  private isPlaying: boolean = false;
  private volume: number = 1; // Volumen máximo
  private lastSyncTime: number = 0;
  private syncThreshold: number = 5; // Umbral de sincronización (en segundos)

  constructor() {

    this.audio = new Audio();
    this.audio.src = 'https://sonic.streamingchilenos.com/8074/stream';
    this.audio.load();
    this.audio.volume = this.volume;

    // Monitoreamos el estado de la transmisión
    this.audio.addEventListener('playing', () => {
      this.lastSyncTime = this.audio.currentTime;
      this.syncAudioStream();
    });

  }

  // Inicia la reproducción
  play() {
    if (!this.isPlaying) {
      this.audio.play();
      this.isPlaying = true;
      this.syncAudioStream();
    }
  }

  // Pausa la reproducción
  pause() {
    if (this.isPlaying) {
      this.audio.pause();
      this.isPlaying = false;
    }
  }

  // Detiene la reproducción
  stop() {
    this.audio.pause();
    this.audio.currentTime = 0;
    this.isPlaying = false;
  }

  // Ajusta el volumen
  setVolume(volume: number) {
    this.audio.volume = volume;
    this.volume = volume;
  }

  getVolume(): number {
    return this.volume;
  }

  getIsPlaying(): boolean {
    return this.isPlaying;
  }

  // Reajusta la transmisión si el retraso es demasiado
  private syncAudioStream() {

    const currentTime = this.audio.currentTime;
    const timeDifference = currentTime - this.lastSyncTime;

    // Si el tiempo se ha retrasado más que el umbral, reajustamos la posición
    if (Math.abs(timeDifference) > this.syncThreshold) {
      console.log('Reajustando la transmisión de radio...');
      this.audio.currentTime = currentTime;
    }

    this.lastSyncTime = currentTime;

  }

}