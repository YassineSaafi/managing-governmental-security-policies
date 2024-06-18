import { Component, OnInit } from '@angular/core';
import { UserResponseService } from '../user-response.service';
import { UserResponse } from '../user-response';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {
  unconfirmedResponses: UserResponse[] = [];

  constructor(private userResponseService: UserResponseService) {}

  ngOnInit(): void {
    this.loadUnconfirmedResponses();
  }

  loadUnconfirmedResponses(): void {
    this.userResponseService.getUnconfirmedResponses().subscribe(
      responses => {
        this.unconfirmedResponses = responses;
      },
      error => {
        console.error("Erreur lors du chargement des réponses non confirmées :", error);
      }
    );
  }

  confirmResponse(response: UserResponse, confirmation: 'accepté' | 'refusé'): void {
    this.userResponseService.onConfirm(response, confirmation).subscribe(
      () => {
        response.confirmation = confirmation;
        this.unconfirmedResponses = this.unconfirmedResponses.filter(r => r.questionId !== response.questionId);
      },
      error => {
        console.error("Erreur lors de la confirmation de la réponse :", error);
      }
    );
  }
}
