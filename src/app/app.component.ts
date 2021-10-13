import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'popjob';
  isntLog : any;
  status : any;
  statusCandidat: any;
  showDetailsCookies:boolean;
  showAuthorized:boolean;
  showRequire:boolean;
  acceptOrNot:boolean;
  constructor() {
    this.isntLog = false;
    console.log(this.isntLog)
    this.acceptOrNot=true;
    console.log(this.acceptOrNot)
    this.showDetailsCookies = true;
    this.showAuthorized = false;
    this.showRequire = false;
    this.status = localStorage.getItem('status');
    console.log(this.status)
    if((localStorage.getItem('status')) === "Candidat") {
      this.statusCandidat = true;
      console.log(this.statusCandidat)
    }
  }
  refuse() {
    this.acceptOrNot=false;
    /**En autorisant les cookies */
    /**
     * sauvegarder une page dans le localstorage avant de passer à la suivante et ensuite supprimer celle ci
     * Enregistrer si un utilisateur a oui ou non accepté le renouvellement de son abonnement 
        *  S'il n'a pas répondu, afficher la pop up à sa prochane connexion
     * Si un recruteur a engagé un candidat, créer une fonction pour enregistrer sa prochaine offre et la plaçer en page d'accueil
     * Envoyer les données au localhost:3030/
     */
  }
  accept() {
    this.acceptOrNot=false;
  }
  deconnect(){
    this.isntLog = true;
    localStorage.clear();
    }
    viewMoreOption() {
      this.showDetailsCookies = false;
      //this.acceptOrNot=false;
    }
    moreInfoAuthorized() {
      this.showAuthorized = true;
      this.showRequire = false;
    }
    moreInfoRequire() {
      this.showRequire = true;
      this.showAuthorized = false;
    }
  }
