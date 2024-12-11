import { Component } from '@angular/core';
import { RadioPlayerComponent } from '../../components/radio-player/radio-player.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RadioPlayerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {

  public repeatedMessages: { id: number, message: string }[] = [];


  ngOnInit(): void {
    this.repeatedMessages = new Array(20)
      .fill('TOMORROWLAND TOUR RADIO, ¡NO TE LO PIERDAS! - X.COM/TomorrowHBB')
      .map((message, index) => ({ id: index, message }));
  }

}
