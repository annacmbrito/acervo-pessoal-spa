import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SpinnerComponent } from '../../components/spinner/spinner.component';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    SpinnerComponent,
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {

  public form: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
  ) {}

  public signIn(): void {
    if(this.form.valid) {
      this.form.disable();
      this.authService.signIn(this.form.value).subscribe({
        next: () => this.router.navigate(["/livros"]),
        error: () => this.toastrService.error('Credenciais inválidas!'),
      }).add(() => {
        this.form.enable();
        this.form.setValue({
          email: '',
          password: '',
        });
      });
    }
  }
}
