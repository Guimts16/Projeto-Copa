import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { provideHttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { App } from './app';
import { AppRoutingModule } from './app-routing-module';
import { AlbumComponent } from './pages/album-component/album';
import { CalendarioComponent } from './pages/calendario-component/calendario';
import { GruposComponent } from './pages/grupos-component/grupos';
import { TelaInicial } from './pages/tela-inicial-component/tela-inicial';
import { Footer } from './shared/footer/footer';
import { Navbar } from './shared/navbar/navbar';

@NgModule({
  declarations: [
    App,
    Navbar,
    Footer,
    TelaInicial,
    GruposComponent,
    CalendarioComponent,
    AlbumComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, NgbModule, ReactiveFormsModule, FormsModule],
  providers: [provideBrowserGlobalErrorListeners(), provideHttpClient()],
  bootstrap: [App],
})
export class AppModule {}
