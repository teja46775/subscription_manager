import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SubscriptionListComponent } from './components/subscription-list/subscription-list.component';
import { SubscriptionFormComponent } from './components/subscription-form/subscription-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'subscriptions', component: SubscriptionListComponent },
  { path: 'subscription/new', component: SubscriptionFormComponent },
  { path: 'subscription/edit/:id', component: SubscriptionFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }