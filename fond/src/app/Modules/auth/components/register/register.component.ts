import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errorMessage!: string;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    this.registerForm = this.formBuilder.group({
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.errorMessage = '';
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const { nom, email, password, role } = this.registerForm.value;
      this.authService.register({ nom, email, password, role }).subscribe(
        () => {
          // Rediriger vers la page de connexion après l'enregistrement réussi
        },
        error => {
          this.errorMessage = 'Erreur lors de l\'enregistrement : ' + error.message;
        }
      );
    } else {
      this.errorMessage = 'Veuillez remplir correctement tous les champs.';
    }
  }
}
