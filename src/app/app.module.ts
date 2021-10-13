import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProfilComponent } from './profil/profil.component';
import { SpaceCandidatComponent } from './space-candidat/space-candidat.component';
import { SpaceEmployeurComponent } from './space-employeur/space-employeur.component';
import { OfferEmployeurComponent } from './offer-employeur/offer-employeur.component';
import { ProjetCandidatComponent } from './projet-candidat/projet-candidat.component';
import { SuscribeAbonnementComponent } from './suscribe-abonnement/suscribe-abonnement.component';
import { SuscribeConnectionComponent } from './suscribe-connection/suscribe-connection.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PoliticComponent } from './politic/politic.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfilComponent,
    SpaceCandidatComponent,
    SpaceEmployeurComponent,
    OfferEmployeurComponent,
    ProjetCandidatComponent,
    SuscribeAbonnementComponent,
    SuscribeConnectionComponent,
    PoliticComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
