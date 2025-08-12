import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SubscriptionService } from '../../services/subscription.service';

@Component({
  selector: 'app-subscription-form',
  templateUrl: './subscription-form.component.html',
  styleUrls: ['./subscription-form.component.css']
})
export class SubscriptionFormComponent implements OnInit {
  subscriptionForm: FormGroup;
  isEditMode = false;
  subscriptionId: number | null = null;
  errorMessage = '';
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private subscriptionService: SubscriptionService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.subscriptionForm = this.fb.group({
      plan_name: ['', Validators.required],
      status: ['active', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      end_date: ['']
    });
  }

  ngOnInit(): void {
    this.subscriptionId = this.route.snapshot.params['id'];
    this.isEditMode = !!this.subscriptionId;
  }

  onSubmit(): void {
    if (this.subscriptionForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      const subscriptionData = this.subscriptionForm.value;

      const operation = this.isEditMode
        ? this.subscriptionService.updateSubscription(this.subscriptionId!, subscriptionData)
        : this.subscriptionService.createSubscription(subscriptionData);

      operation.subscribe({
        next: () => {
          this.router.navigate(['/subscriptions']);
        },
        error: (error) => {
          this.errorMessage = error.error?.error || 'Operation failed';
          this.isLoading = false;
        }
      });
    }
  }

  getFieldError(fieldName: string): string {
    const field = this.subscriptionForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) return `${fieldName} is required`;
      if (field.errors['min']) return `${fieldName} must be greater than 0`;
    }
    return '';
  }

  cancel(): void {
    this.router.navigate(['/subscriptions']);
  }
}