import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Importez le service Router
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage!: string;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { // Injectez le service Router
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.errorMessage = '';
  }

  onSubmit(): void {
    this.authService.login(this.loginForm.value).subscribe(user => {
      if (user && user.token) {
        console.log('connexion établie, auth token:', user.token);
        this.router.navigate(['/dashboard']); // Redirigez l'utilisateur après la connexion
      }
    }, error => {
      console.error('Erreur de connexion:', error);
    });
  }
}
