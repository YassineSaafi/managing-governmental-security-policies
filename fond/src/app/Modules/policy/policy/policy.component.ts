import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; // Importez les modules nécessaires pour les formulaires réactifs

import { Policy } from '../policy';
import { PolicyService } from '../policy.service';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css']
})
export class PolicyComponent implements OnInit {
  policies: Policy[] = [];
  isAdmin: boolean = true; // Mettez à true si l'utilisateur est un administrateur
  addPolicyForm: FormGroup; // Déclarez le formulaire réactif

  constructor(private fb: FormBuilder, private policyService: PolicyService) { // Injectez le FormBuilder dans le constructeur
    this.addPolicyForm = this.fb.group({ // Initialisez le formulaire réactif
      title: ['', Validators.required],
      content: ['', Validators.required],
      effectiveDate: ['', Validators.required],
      version: ['', Validators.required],
      status: [false]
    });
  }

  ngOnInit(): void {
    this.loadPolicies();
  }

  loadPolicies(): void {
    this.policyService.getAllPolicies().subscribe(policies => {
      this.policies = policies;
    });
  }

  deletePolicy(id: string): void {
    this.policyService.deletePolicy(id).subscribe(() => {
      // Rechargez la liste des politiques après la suppression
      this.loadPolicies();
    });
  }

  onSubmit(): void {
    if (this.addPolicyForm.valid) { // Vérifiez si le formulaire est valide
      // Créez un nouvel objet Policy à partir des valeurs du formulaire
      const newPolicy: Policy = {
        title: this.addPolicyForm.value.title,
        content: this.addPolicyForm.value.content,
        effectiveDate: this.addPolicyForm.value.effectiveDate,
        version: this.addPolicyForm.value.version,
        status: this.addPolicyForm.value.status
      };

      // Appelez la méthode addPolicy du service pour ajouter la nouvelle politique
      this.policyService.addPolicy(newPolicy).subscribe(() => {
        // Réinitialisez le formulaire après l'ajout
        this.addPolicyForm.reset();
        // Rechargez la liste des politiques après l'ajout
        this.loadPolicies();
      });
    } else {
      // Affichez un message d'erreur si le formulaire n'est pas valide
      console.error("Le formulaire n'est pas valide.");
    }
  }

  updatePolicy(id: string | undefined): void {
    if (!id) {
      console.error("L'ID de la politique est manquant.");
      return;
    }
  
    // Récupérez la politique à éditer en fonction de son ID
    const policyToUpdate = this.policies.find(policy => policy._id === id);
    if (policyToUpdate) {
      // Modifiez la politique (par exemple, en changeant son titre)
      policyToUpdate.title = 'Nouveau titre de politique';
      
      // Appelez la méthode updatePolicy du service pour mettre à jour la politique
      this.policyService.updatePolicy(policyToUpdate._id!, policyToUpdate).subscribe(updatedPolicy => {
        // La politique a été mise à jour avec succès
        console.log("Politique mise à jour avec succès : ", updatedPolicy);
        // Rechargez la liste des politiques après la mise à jour
        this.loadPolicies();
      });
    } else {
      console.error("La politique à mettre à jour n'a pas été trouvée.");
    }
  }
}
