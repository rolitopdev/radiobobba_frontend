import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiIcon } from '@taiga-ui/core';
import { interval, Subscription } from 'rxjs';
import { GeneralService } from '../../services/general.service';
import { TuiPulse } from '@taiga-ui/kit';
import { NgStyle } from '@angular/common';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-radio-player',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgStyle, TuiIcon, TuiPulse],
  templateUrl: './radio-player.component.html',
  styleUrl: './radio-player.component.scss'
})

export class RadioPlayerComponent {

  @ViewChild('audioPlayer') audioPlayer!: ElementRef<HTMLAudioElement>;

  public volume: number = Number(localStorage.getItem('audioVolume')!) || 50;
  public isPlaying: boolean = true;

  public syncInterval: any; // Intervalo para verificar sincronización

  private updateSubscription: Subscription | null = null;

  public djImage: string = 'https://www.habbo.com/habbo-imaging/avatarimage?figure=hr-5619-59-.hd-3096-10-.ch-3332-1424-89-.lg-3333-1430-.sh-3089-89-.he-1608-undefined-.fa-5467-undefined-.cc-4091-1340-&gender=M&direction=2&head_direction=2&action=gesture=nrm&&size=l';
  public djName: string = 'AutoDJ';

  public radioObj: any = {};

  constructor(public _generalService: GeneralService, public _firebaseService: FirebaseService, public cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    // Establecer el volumen cuando se inicie el componente
    if (this.audioPlayer) {
      this.audioPlayer.nativeElement.volume = this.volume; // Ajustar el volumen (escala de 0 a 1)
    }

    this.getRadioInfo(); // Hacemos la primera solicitud cuando el componente se inicializa
    this.suscribeToFirebase(); // Hacemos la solicitud para suscribirnos a firebase.
    // Hacemos la solicitud cada 30 segundos (30000 ms)
    this.updateSubscription = interval(30000).subscribe(() => {
      this.getRadioInfo();  // Repetir la solicitud cada 30 segundos
    });

  }

  async suscribeToFirebase() {

    await this._firebaseService.getItems('radio_info').subscribe({
      next: async (response_firebase: any) => {
        if (response_firebase[0].dj) {

          if (response_firebase[0].dj === 'AutoDJ') {
            this.djName = response_firebase[0].dj;
            this.djImage = 'https://www.habbo.com/habbo-imaging/avatarimage?figure=hr-5619-59-.hd-3096-10-.ch-3332-1424-89-.lg-3333-1430-.sh-3089-89-.he-1608-undefined-.fa-5467-undefined-.cc-4091-1340-&gender=M&direction=2&head_direction=2&action=,wlk,crr=61&gesture=sml&size=l';
            this.cdr.detectChanges();
          } else {
            await this._generalService.getHabboInfoByName(response_firebase[0].dj).subscribe({
              next: async (response_habbo_info: any) => {
                this.djName = response_firebase[0].dj;
                this.djImage = `https://www.habbo.com/habbo-imaging/avatarimage?figure=${response_habbo_info.figureString}&gender=M&direction=2&head_direction=2&action=,wlk,crr=61&gesture=sml&size=l`;
                this.cdr.detectChanges();
              }
            });
          }

        }
      },
      error: (err) => {
        console.log('error in suscribeToFirebase', err);
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
  }

  setVolume(event?: Event): void {
    if (this.audioPlayer) {
      // Ajusta el volumen en el reproductor de audio
      this.audioPlayer.nativeElement.volume = this.volume / 100;
    }
    // Guardar el volumen en localStorage
    localStorage.setItem('audioVolume', this.volume.toString());
  }

  getRadioInfo(): void {
    this._generalService.getRadioInfo().subscribe({
      next: async (response: any) => {
        const { ulistener, djusername, title } = response;
        this.radioObj = { listeners: ulistener, djusername, title };
      },
      error: (error) => {
        console.error('error getRadioInfo: ', error);
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