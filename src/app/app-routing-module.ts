import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClientComponent } from './client-component/client-component';
import { HomeComponent } from './home-component/home-component';
import { IngressosComponent } from './ingressos-component/ingressos-component';
import { JogadorComponent } from './product-component/product-component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'jogadores', component: JogadorComponent },
  { path: 'ingressos', component: IngressosComponent },
  { path: 'client', component: ClientComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
