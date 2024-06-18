import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Modules/auth/auth.service';
import { Router } from '@angular/router';
import { UserResponseService } from '../../Modules/user-response/user-response.service';

@Component({
  selector: 'app-acceil',
  templateUrl: './acceil.component.html',
  styleUrls: ['./acceil.component.css']
})
export class AcceilComponent implements OnInit {
  isAuthenticated: boolean = false;
  unconfirmedResponsesCount: number = 0;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userResponseService: UserResponseService
  ) {}

  ngOnInit(): void {
    // Vérifiez si l'utilisateur est authentifié
    this.isAuthenticated = this.authService.isLoggedIn();

    // Chargez les réponses non confirmées
    if (this.isAuthenticated) {
      this.loadUnconfirmedResponsesCount();
    }
  }

  // Méthode pour charger le nombre de réponses non confirmées
  loadUnconfirmedResponsesCount() {
    this.userResponseService.getUnconfirmedResponses().subscribe(responses => {
      this.unconfirmedResponsesCount = responses.length;
    });
  }

  // Méthode pour se connecter
  login() {
    // Appelez la méthode login du service d'authentification avec les identifiants de l'utilisateur
    this.authService.login({ email: 'example@example.com', password: 'password' }).subscribe((user) => {
      this.isAuthenticated = true;
      // Redirigez l'utilisateur vers la page appropriée après la connexion
      this.router.navigate(['/dashboard']);
    });
  }

  // Méthode pour se déconnecter
  logout() {
    // Appelez la méthode logout du service d'authentification pour déconnecter l'utilisateur
    this.authService.logout();
    this.isAuthenticated = false;
    // Redirigez l'utilisateur vers la page d'accueil après la déconnexion
    this.router.navigate(['/']);
  }

}
