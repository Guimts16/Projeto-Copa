import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TelaInicial } from './pages/tela-inicial-component/tela-inicial';

const routes: Routes = [
  { path: '', redirectTo: 'tela-inicial', pathMatch: 'full' },
  { path: 'tela-inicial', component: TelaInicial },
  { path: '**', redirectTo: 'tela-inicial' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
