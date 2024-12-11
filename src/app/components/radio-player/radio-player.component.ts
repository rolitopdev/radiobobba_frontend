import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GeneralService } from '../../services/general.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-radio-player',
  standalone: true,
  imports: [],
  templateUrl: './radio-player.component.html',
  styleUrl: './radio-player.component.scss'
})

export class RadioPlayerComponent implements OnInit, AfterViewInit {

  @ViewChild('audioPlayer') audioPlayer!: ElementRef<HTMLAudioElement>;

  public volume: number = 40;

  public isPlaying: boolean = false;

  public radioObj: any = {}; // Objeto para guardar la información de la radio (oyentes, djuser, title)
  public syncInterval: any; // Intervalo para verificar sincronización

  private updateSubscription: Subscription | null = null;

  constructor(public _generalService: GeneralService, public cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    // Hacemos la primera solicitud cuando el componente se inicializa
    this.getRadioInfo();
    // Hacemos la solicitud cada 40 segundos (40000 ms)
    this.updateSubscription = interval(40000).subscribe(() => {
      this.getRadioInfo();  // Repetir la solicitud cada 30 segundos
    });
  }

  ngAfterViewInit(): void {
    if (this.audioPlayer) {
      this.audioPlayer.nativeElement.volume = this.volume / 100;
    }
  }

  getRadioInfo() {
    this._generalService.getRadioInfo().subscribe({
      next: async (response: any) => {
        const { listeners, djusername, title } = response;
        this.radioObj = { listeners, djusername, title };
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('error getRadioInfo: ', error);
      }
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
    this.cdr.detectChanges();
  }

  setVolume(): void {
    if (this.audioPlayer) {
      // Ajusta el volumen en el reproductor de audio
      this.audioPlayer.nativeElement.volume = this.volume / 100;
    }
    // Guardar el volumen en localStorage
    localStorage.setItem('audioVolume', this.volume.toString());
  }

  ngOnDestroy(): void {
    clearInterval(this.syncInterval); // Limpiar intervalo cuando el componente se destruye
    // Cancelar el intervalo cuando el componente se destruya
    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe();
    }
  }

}