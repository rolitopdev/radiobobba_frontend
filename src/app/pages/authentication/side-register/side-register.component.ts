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
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-side-register',
  standalone: true,
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './side-register.component.html',
})
export class AppSideRegisterComponent {

  constructor(private router: Router, private _auth: AuthService) { }

  public radioName: string = this._auth.radioName;

  public form = new FormGroup({
    habboName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    birthDate: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    active: new FormControl(true)
  });

  get f() {
    return this.form.controls;
  }

  submit() {
    // console.log(this.form.value);
    this.router.navigate(['/']);
  }
}
