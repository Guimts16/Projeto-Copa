import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TeamComponent } from './product-component/product-component';
import { ClientComponent } from './client-component/client-component';
import { HomeComponent } from './home-component/home-component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'times', component: TeamComponent },
  { path: 'client', component: ClientComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
