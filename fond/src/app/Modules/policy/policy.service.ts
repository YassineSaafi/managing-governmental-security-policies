// policy.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Policy } from './policy';

@Injectable({
  providedIn: 'root'
})
export class PolicyService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  // Ajouter une nouvelle politique
  addPolicy(policy: Policy): Observable<Policy> {
    return this.http.post<Policy>(`${this.apiUrl}/policy/ajout`, policy);
  }

  // Récupérer toutes les politiques
  getAllPolicies(): Observable<Policy[]> {
    return this.http.get<Policy[]>(`${this.apiUrl}/policy/all`);
  }

  // Récupérer une politique par son ID
  getPolicyById(id: string): Observable<Policy> {
    return this.http.get<Policy>(`${this.apiUrl}/policy/byid/${id}`);
  }

  // Mettre à jour une politique
  updatePolicy(id: string, policy: Policy): Observable<Policy> {
    return this.http.put<Policy>(`${this.apiUrl}/policy/update/${id}`, policy);
  }

  // Supprimer une politique
  deletePolicy(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/policy/delete/${id}`);
  }
}
