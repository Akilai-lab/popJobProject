import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import axios from "axios"; 
import { param } from 'jquery';

@Component({
  selector: 'app-space-candidat',
  templateUrl: './space-candidat.component.html',
  styleUrls: ['./space-candidat.component.scss']
})
export class SpaceCandidatComponent implements OnInit {
  isClicked: boolean;
  domaineSelect:any;
  chooseType:any;
  arrayDomaine:any;
  offerOne:any;
  offerTwo:any;
  offerThree:any;
  userStatus:any;
  constructor() {
    this.isClicked = false;
    this.offerOne = 'A venir';
    this.offerTwo = 'A venir';
    this.offerThree = 'A venir';
    const status:any = localStorage.getItem('status');
    this.userStatus = JSON.parse(status);
    console.log(this.userStatus)
  }
  ngOnInit(): void {
  }
  accesPage(){
    window.location.pathname = '/aboutAndSign';
  }
  viewNav() {
    console.log(this.isClicked)
    this.isClicked = true;
  }
  searchDomaines() {
    /** On va faire une recherche dans la bdd où le profil des candidats est 'Candidat' et selon le type de domaine **/
    this.domaineSelect = true;
    }
    saveDomaines(form:NgForm) {
      const params = new URLSearchParams();
      const domaine = form.value['domaine']; 
      console.log(domaine)
      if (domaine != "") {
        params.append('domaine', domaine);
      }
      params.append('status', this.userStatus)
      axios.post("http://localhost:3000/api/profil/domaine", params)
        .then(response => {
          console.log('response')
            console.log(response.data);
            console.log(params);

        })
        .catch( error => {
          console.log(error)
        });
    }
    typeOffer() {
      //On va faire 
      this.chooseType = true;
    }
    findType(form:NgForm) {
      const params = new URLSearchParams();
      const cdi = form.value['cdi']; 
      const cdd = form.value['cdd']; 
      const interim = form.value['interim']; 
      const alternance = form.value['alternance']; 

      if (cdi != "") {
        let type = 'cdi';
        params.append('typeContrat', type);//renvoi true ou false
      }
      if (cdd != "") {
        let type = 'cdd';
        params.append('typeContrat', type);
      }
      if (interim != "") {
        let type = 'interim';
        params.append('typeContrat', type);
      }
      if (alternance != "") {
        let type = 'alternance';
        params.append('typeContrat', type);
      }
      axios.post("http://localhost:3000/api/offer/typeEmploi", params)
        .then(response => {
            console.log(response.data);
            console.log(params)
            this.offerOne = 'A venir';
            this.offerTwo = 'A venir';
            this.offerThree = 'A venir';
            if(response.data[0].title!=undefined) {
              this.offerOne = response.data[0].title;
            }
            if(response.data[1].title!=undefined) {
              this.offerTwo = response.data[1].title;
            }
            if(response.data[1].title!=undefined) {
              this.offerTwo = response.data[2].title;
            }
        })
        .catch( error => {
          console.log(error)
        });
    }
    lastOffers() {
      console.log('test')
      axios.get("http://localhost:3000/api/offer/AllOffers")
      .then(response => {
          console.log(response.data);
          //créer une méthode qui va récupérer les 3 derniers offres d'emplois
          const reversed = response.data.reverse();
          console.log(reversed)
          const threeLasts = [response.data[0], response.data[1],response.data[2]]
          console.log(threeLasts);
          this.offerOne = 'A venir';
          this.offerTwo = 'A venir';
          this.offerThree = 'A venir';
          if(threeLasts[0].title!=undefined) {
            this.offerOne = threeLasts[0].title;
          }
          if(threeLasts[1].title!=undefined) {
            this.offerTwo = threeLasts[1].title;
          }
          if(threeLasts[2].title!=undefined) {
            this.offerTwo = threeLasts[2].title;
          }
            this.offerOne = threeLasts[0].title;
            this.offerTwo = threeLasts[1].title;
            this.offerThree = threeLasts[2].title;
            console.log(threeLasts[0]);
            console.log(threeLasts[1]);
            console.log(threeLasts[2]);
          
      })
      .catch( error => {
        console.log(error)
        console.error(error)
      });
    }
}
