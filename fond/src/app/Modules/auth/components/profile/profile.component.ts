import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userProfile: any;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // Charge le profil de l'utilisateur lors de l'initialisation du composant
    this.loadProfile();
  }

  loadProfile(): void {
    // Appeler la méthode du service AuthService pour récupérer le profil de l'utilisateur
    this.authService.getProfile().subscribe(
      (profile: any) => {
        this.userProfile = profile;
      },
      (error: any) => {
        console.error('Erreur lors du chargement du profil :', error);
      }
    );
  }
}
