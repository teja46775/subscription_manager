export interface Subscription {
  id: number;
  user_id: number;
  plan_name: string;
  status: 'active' | 'inactive' | 'cancelled';
  price: number;
  start_date: string;
  end_date?: string;
  created_at: string;
  user_email?: string;
}

export interface CreateSubscriptionRequest {
  plan_name: string;
  status?: string;
  price: number;
  end_date?: string;
}