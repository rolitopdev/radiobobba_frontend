import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RadioService } from 'src/app/services/radio.service';

@Component({
  selector: 'app-radio-player',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './radio-player.component.html',
  styleUrl: './radio-player.component.scss'
})

export class RadioPlayerComponent {

  public isPlaying: boolean = false;
  public volume: number = Number(localStorage.getItem('volume') || 1); // Volumen predeterminado al máximo

  constructor(private radioService: RadioService) {

  }

  ngOnInit(): void {
    this.isPlaying = this.radioService.getIsPlaying();
    this.volume = this.radioService.getVolume();
  }

  play() {
    this.radioService.play();
    this.isPlaying = true;
  }

  pause() {
    this.radioService.pause();
    this.isPlaying = false;
  }

  stop() {
    this.radioService.stop();
    this.isPlaying = false;
  }

  setVolume(event: any) {
    const volume = event.target.value;
    this.radioService.setVolume(volume);
    this.volume = volume;
    localStorage.setItem('volume', this.volume.toString());
  }

}
