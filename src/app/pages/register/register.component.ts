import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registrationForm = new FormGroup(
    {
      nome: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        this.gmailValidator,
        this.onlyLettersBeforeAt,
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirmPassword: new FormControl('', Validators.required),
    },
    { validators: this.passwordsMatchValidator }
  );
  loading = false;
  submitted = false;
  error = '';
  success = false;

  constructor(private auth: AuthService, private router: Router) {}

  get nome() {
    return this.registrationForm.get('nome')!;
  }

  get email() {
    return this.registrationForm.get('email')!;
  }

  get password() {
    return this.registrationForm.get('password')!;
  }

  get confirmPassword() {
    return this.registrationForm.get('confirmPassword')!;
  }

  onSubmit() {
    this.submitted = true;

    if (this.registrationForm.invalid) {
      return;
    }

    const { nome, email, password } = this.registrationForm.value;

    if (this.auth.register(nome!, email!, password!)) {
      this.success = true;
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);
    } else {
      this.error = 'Email già registrata';
    }
  }

  passwordsMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return password === confirm ? null : { passwordsMismatch: true };
  }

  gmailValidator(control: AbstractControl): ValidationErrors | null {
    const email = control.value;
    if (email && !email.endsWith('@gmail.com')) {
      return { gmail: true };
    }
    return null;
  }

  onlyLettersBeforeAt(control: AbstractControl): ValidationErrors | null {
    const email = control.value;
    if (email) {
      const parts = email.split('@');
      if (parts.length > 1) {
        const localPart = parts[0];
        const onlyLettersBeforeAt = /^[a-zA-Z]+$/;
        if (!onlyLettersBeforeAt.test(localPart)) {
          return { onlyLetters: true };
        }
      }
    }
    return null;
  }
}
