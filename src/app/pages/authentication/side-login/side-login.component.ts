import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-side-login',
  standalone: true,
  imports: [
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './side-login.component.html',
})

export class AppSideLoginComponent {

  constructor(private router: Router, private _auth: AuthService) { }

  public radioName: string = this._auth.radioName;

  public form = new FormGroup({
    habboName: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required])
  });

  get f() {
    return this.form.controls;
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this._auth.login(this.form.getRawValue()).subscribe({
      next: async (response: any) => {
        console.log(response);
      }, error: (error) => {
        console.log('error', error);
      }
    })
    // // console.log(this.form.value);
    // this.router.navigate(['/']);
  }
}
