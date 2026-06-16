import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { App } from './app';
import { AppRoutingModule } from './app-routing-module';
import { ClientComponent } from './client-component/client-component';
import { HttpConfigInterceptor } from './core/interceptors';
import { FooterComponent } from './footer-component/footer-component';
import { HomeCalendarComponent } from './home-calendar-component/home-calendar-component';
import { HomeComponent } from './home-component/home-component';
import { IngressosComponent } from './ingressos-component/ingressos-component';
import { NavBarComponent } from './nav-bar-component/nav-bar-component';
import { JogadorComponent } from './product-component/product-component';

@NgModule({
  declarations: [
    App,
    JogadorComponent,
    IngressosComponent,
    HomeComponent,
    HomeCalendarComponent,
    FooterComponent,
    NavBarComponent,
    ClientComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, NgbModule, ReactiveFormsModule],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
  ],
  bootstrap: [App],
})
export class AppModule {}
