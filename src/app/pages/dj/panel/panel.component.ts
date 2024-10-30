import { Component } from '@angular/core';
import { AppTopEmployeesComponent } from 'src/app/components/top-employees/top-employees.component';
import { AppUpcomingSchedulesComponent } from 'src/app/components/upcoming-schedules/upcoming-schedules.component';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [AppUpcomingSchedulesComponent, AppTopEmployeesComponent],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss'
})

export class PanelComponent {

}
