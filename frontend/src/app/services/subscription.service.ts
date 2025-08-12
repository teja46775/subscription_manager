import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subscription, CreateSubscriptionRequest } from '../models/subscription.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private apiUrl = 'http://localhost:3000/api/subscriptions';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getSubscriptions(filters?: { status?: string; plan_name?: string }): Observable<Subscription[]> {
    let params = new HttpParams();
    if (filters?.status) {
      params = params.set('status', filters.status);
    }
    if (filters?.plan_name) {
      params = params.set('plan_name', filters.plan_name);
    }

    return this.http.get<Subscription[]>(this.apiUrl, {
      headers: this.getHeaders(),
      params
    });
  }

  createSubscription(subscription: CreateSubscriptionRequest): Observable<Subscription> {
    return this.http.post<Subscription>(this.apiUrl, subscription, {
      headers: this.getHeaders()
    });
  }

  updateSubscription(id: number, subscription: CreateSubscriptionRequest): Observable<Subscription> {
    return this.http.put<Subscription>(`${this.apiUrl}/${id}`, subscription, {
      headers: this.getHeaders()
    });
  }

  deleteSubscription(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }
}