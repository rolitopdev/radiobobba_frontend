import { Component } from '@angular/core';
import { RadioPlayerComponent } from '../../components/radio-player/radio-player.component';
import { NgFor } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';

import { ChangeDetectionStrategy } from '@angular/core';
import { TuiSwipe } from '@taiga-ui/cdk';
import { TuiButton } from '@taiga-ui/core';
import { TuiPreview, TuiPreviewDialogDirective } from '@taiga-ui/kit';
import { PolymorpheusOutlet, PolymorpheusTemplate } from '@taiga-ui/polymorpheus';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RadioPlayerComponent, HeaderComponent, NgFor,
    PolymorpheusOutlet,
    PolymorpheusTemplate,
    TuiButton,
    TuiPreview,
    TuiPreviewDialogDirective,
    TuiSwipe,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class HomeComponent {

  protected open = true;
  protected index = 0;
  protected length = 1;
  protected titles = ['Flyer'];
  protected content = [
    'https://i.imgur.com/OOOocmq.png'
  ];

  public repeatedMessages: { id: number, message: string }[] = new Array(10)
    .fill('TOMORROWLAND TOUR RADIO ESTE 15-16 DE NOVIEMBRE, ¡NO TE LO PIERDAS! - X.COM/TomorrowHBB')
    .map((message, index) => ({ id: index, message }));

}