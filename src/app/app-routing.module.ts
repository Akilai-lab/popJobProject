import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SpaceCandidatComponent } from './space-candidat/space-candidat.component';
import { SpaceEmployeurComponent } from './space-employeur/space-employeur.component';
import { ProfilComponent } from './profil/profil.component';
import { OfferEmployeurComponent } from './offer-employeur/offer-employeur.component';
import { ProjetCandidatComponent } from './projet-candidat/projet-candidat.component';
import { SuscribeAbonnementComponent } from './suscribe-abonnement/suscribe-abonnement.component';
import { SuscribeConnectionComponent } from './suscribe-connection/suscribe-connection.component';
import { PoliticComponent } from './politic/politic.component';
const routes: Routes = [
	{
		path: 'spaceCandidat',
		component: SpaceCandidatComponent
	},
	{
		path: 'spaceRecruteurs',
		component: 	SpaceEmployeurComponent
	},
	{
		path:'profil',
		component: ProfilComponent
	},
	{
		path:'offersRecruteurs',
		component: OfferEmployeurComponent
	},
	{
		path:'projectsCandidat',
		component: ProjetCandidatComponent
	},
	{
		path:'suscribeAbonnemrent',
		component: SuscribeAbonnementComponent
	},
	{
		path:'connection',
		component: SuscribeConnectionComponent
	},
	{
		path:'privacy',
		component: PoliticComponent
	},
	{
		path: '**',
		component: 	SpaceCandidatComponent
	}
];

@NgModule({
  declarations: [],
  imports: [CommonModule,RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
