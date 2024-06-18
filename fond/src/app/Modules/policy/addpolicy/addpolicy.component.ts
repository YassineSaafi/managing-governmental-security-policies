import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PolicyService } from '../policy.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-policy',
  templateUrl: './addpolicy.component.html',
  styleUrls: ['./addpolicy.component.css']
})
export class AddPolicyComponent implements OnInit {
  addPolicyForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private policyService: PolicyService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.addPolicyForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      effectiveDate: ['', Validators.required],
      version: ['', Validators.required],
      status: ['active']
    });
  }

  onSubmit(): void {
    if (this.addPolicyForm.valid) {
      this.policyService.addPolicy(this.addPolicyForm.value)
        .subscribe(() => {
          // Rediriger vers la liste des politiques après l'ajout
          this.router.navigate(['/policies']);
        });
    }
  }
}
