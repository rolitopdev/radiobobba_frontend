import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiIcon } from '@taiga-ui/core';
import { interval, Subscription } from 'rxjs';
import { GeneralService } from '../../services/general.service';
import { TuiPulse, TuiSliderComponent } from '@taiga-ui/kit';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-radio-player',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgStyle, TuiIcon, TuiSliderComponent, TuiPulse],
  templateUrl: './radio-player.component.html',
  styleUrl: './radio-player.component.scss'
})

export class RadioPlayerComponent {

  @ViewChild('audioPlayer') audioPlayer!: ElementRef<HTMLAudioElement>;

  public volume: number = Number(localStorage.getItem('audioVolume')!) || 50;
  public isPlaying: boolean = false;
  public lastSyncedTime: number = 0; // Último tiempo sincronizado
  public syncInterval: any; // Intervalo para verificar sincronización
  public djs: any = ['Harry.Plones']; // Array de djs en línea.
  public radioObj: any = {};
  private updateSubscription: Subscription | null = null;

  backgroundImageUrl = "https://www.habbo.com/habbo-imaging/avatarimage?figure=hr-5619-59-.hd-3096-10-.ch-3332-1424-89-.lg-3333-1430-.sh-3089-89-.he-1608-undefined-.fa-5467-undefined-.cc-4091-1340-&gender=M&direction=2&head_direction=2&action=gesture=nrm&&size=l";

  constructor(public _generalService: GeneralService) { }

  ngOnInit(): void {
    // Sincronizar el audio cada 500ms
    this.syncInterval = setInterval(() => this.syncAudio(), 500);

    console.log('rtgasdsadas', this.volume)
    // Establecer el volumen cuando se inicie el componente
    if (this.audioPlayer) {
  this.audioPlayer.nativeElement.volume = this.volume; // Ajustar el volumen (escala de 0 a 1)
    }

    this.getRadioInfo(); // Hacemos la primera solicitud cuando el componente se inicializa

    // Hacemos la solicitud cada 30 segundos (30000 ms)
    this.updateSubscription = interval(30000).subscribe(() => {
      this.getRadioInfo();  // Repetir la solicitud cada 30 segundos
    });

  }

  togglePlay(): void {
    if (this.isPlaying) {
      this.audioPlayer.nativeElement.pause();
    } else {
      this.audioPlayer.nativeElement.volume = this.volume / 100;
      this.audioPlayer.nativeElement.play();
    }
    this.isPlaying = !this.isPlaying;
  }

  setVolume(event?: Event): void {
    if (this.audioPlayer) {
      // Ajusta el volumen en el reproductor de audio
      this.audioPlayer.nativeElement.volume = this.volume / 100;
    }
    // Guardar el volumen en localStorage
    localStorage.setItem('audioVolume', this.volume.toString());
  }

  syncAudio(): void {
    const audio = this.audioPlayer.nativeElement;
    if (!audio) return;
    const currentTime = audio.currentTime;
    // Estimar la latencia en función de la diferencia con el último tiempo sincronizado
    const latency = Math.abs(currentTime - this.lastSyncedTime);
    if (latency > 1) {
      console.log('Desfase detectado. Sincronizando...');
      audio.currentTime = this.lastSyncedTime; // Ajusta el tiempo para volver a sincronizar
    }
    // Actualizar el último tiempo sincronizado
    this.lastSyncedTime = currentTime;
  }

  getRadioInfo(): void {
    this._generalService.getRadioInfo().subscribe({
      next: async (response: any) => {
        const { listeners, djusername, title } = response;
        this.radioObj = { listeners, djusername, title };
        console.log(this.radioObj)
      },
      error: (error) => {
        // Manejar el error
        console.error('Error: ', error);
      }
    });
  }

  ngOnDestroy(): void {
    clearInterval(this.syncInterval); // Limpiar intervalo cuando el componente se destruye
    // Cancelar el intervalo cuando el componente se destruya
    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe();
    }
  }

}