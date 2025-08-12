import { Component, OnInit } from '@angular/core';
import { Subscription } from '../../models/subscription.model';
import { SubscriptionService } from '../../services/subscription.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subscription-list',
  templateUrl: './subscription-list.component.html',
  styleUrls: ['./subscription-list.component.css']
})
export class SubscriptionListComponent implements OnInit {
  subscriptions: Subscription[] = [];
  filteredSubscriptions: Subscription[] = [];
  statusFilter = '';
  planFilter = '';
  errorMessage = '';
  isLoading = false;

  constructor(
    private subscriptionService: SubscriptionService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadSubscriptions();
  }

  loadSubscriptions(): void {
    this.isLoading = true;
    this.subscriptionService.getSubscriptions().subscribe({
      next: (data) => {
        this.subscriptions = data;
        this.applyFilters();
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = error.error?.error || 'Failed to load subscriptions';
        this.isLoading = false;
      }
    });
  }

  applyFilters(): void {
    this.filteredSubscriptions = this.subscriptions.filter(sub => {
      const statusMatch = !this.statusFilter || sub.status === this.statusFilter;
      const planMatch = !this.planFilter || sub.plan_name.toLowerCase().includes(this.planFilter.toLowerCase());
      return statusMatch && planMatch;
    });
  }

  onStatusFilterChange(): void {
    this.applyFilters();
  }

  onPlanFilterChange(): void {
    this.applyFilters();
  }

  deleteSubscription(id: number): void {
    if (confirm('Are you sure you want to delete this subscription?')) {
      this.subscriptionService.deleteSubscription(id).subscribe({
        next: () => {
          this.loadSubscriptions();
        },
        error: (error) => {
          this.errorMessage = error.error?.error || 'Failed to delete subscription';
        }
      });
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}