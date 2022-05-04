import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import axios from "axios"; 
import * as FormData from 'form-data';
@Component({
  selector: 'app-space-employeur',
  templateUrl: './space-employeur.component.html',
  styleUrls: ['./space-employeur.component.scss']
})
export class SpaceEmployeurComponent implements OnInit {
  isClicked:boolean;
  infoUser: any;
  name:any;
  prenom:any;
  mail:any;
  profession:any;
  localisation:any;
  image:any;
  test:any;
  beginMonth:any;
  beginDay:any;
  EndMonth:any;
  EndDay:any;
  domaine:any;
  domaineSelect: boolean = false;
  id:any;
  dispoSelect:any;
  iduserProject:any;
  redirectProjects:any;
  userStatus:any;
  constructor() {
    this.isClicked = false;
    const status:any = localStorage.getItem('status');
    this.userStatus = JSON.parse(status);
    const token:any = localStorage.getItem('token');
    const monObjet : any = JSON.parse(token);
    let auth = 'bearer' + " " + monObjet.token;
    console.log(auth);
    axios.get("http://localhost:3000/api/profil/getInfo",{
        headers: {
            'Authorization': auth
        }
    })
    .then(response => {
        console.log(response.data);
        this.infoUser = response.data;
        for (let i of this.infoUser) {
          if(i.name != null) {
            this.name = i.name;
          }
          if(i.lastName != null) {
            this.prenom = i.lastName;
          }
          if(i.mail != null) {
            this.mail = i.mail;
          }
          if(i.profession != null) {
            this.profession = i.profession;
          }
          if(i.localisation != null) {
            this.localisation = i.localisation;
          }
          if(i.image != null) {
            this.image = i.image;
          }
          if(i.domaine != null) {
            this.domaine = i.domaine;
          }
          this.test = i.disponibilitesDe.split('-');
          if(i.disponibilitesDe != null) {
            this.beginMonth = this.test[1];
            this.beginDay = this.test[2];
          }
          i.disponibilitesA.split('-');
          this.EndMonth = i.disponibilitesA.split('-')[1];
          this.EndDay = i.disponibilitesA.split('-')[2];
          if(i.disponibilitesA != null) {
            this.EndMonth = i.disponibilitesA.split('-')[1];
            this.EndDay = i.disponibilitesA.split('-')[2];
          }
        }
        console.log(auth);
    })
    .catch( error => {
      console.log(error)
      console.error(error);
      
    });
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
          console.log(response.data);
          console.log(params)
      })
      .catch( error => {
        console.log(error)
      });
  }
  searchProfil() {
    let userIdProject:any;
  axios.get("http://localhost:3000/api/user/allUser")
  .then(response => {
      console.log(response.data);
      let tab = response.data;
      tab.forEach((element: { id: any; lastName: any; name: any; }) => {
        console.log(element)
        let id = element.id;
        let lastName = element.lastName;
        let name = element.name;
        console.log(this.redirectProjects)
        document.getElementById('users').innerHTML+=`
        <li>
          <a href="/projectsCandidat?${id}">${lastName} - ${name}</a>
        <li>
      `
      });
  })
  .catch( error => {
    console.log(error)
    console.error(error)
  });
}

  searchDispo() {
  this.dispoSelect = true;
  }
  saveDisponbilities(form:NgForm) {
    const params = new URLSearchParams();
    const start = form.value['trip-start'];
    const end = form.value['trip-end'];
    if (start != "") {
      params.append('start', start);
    }
    if (end != "") {
      params.append('end', end);
    }
    axios.post("http://localhost:3000/api/profil/dispoFilters", params)
      .then(response => {
          let begininMonth = response.data[0].disponibilitesDe.split('-')[1];
          let beginindDay = response.data[0].disponibilitesDe.split('-')[2];
          let endingMonth = response.data[0].disponibilitesDe.split('-')[1];
          let endingDay = response.data[0].disponibilitesDe.split('-')[2];
          let begininMonthFilter = start.split('-')[1];
          let begininDayFilter = start.split('-')[2];
          let endingMonthFilter = end.split('-')[1];
          let endingDayFilter = end.split('-')[1];
          if(
            (begininMonth <= begininMonthFilter)
            &&(beginindDay <= begininDayFilter)
            &&(endingMonth >= endingMonthFilter)
            &&(endingDay >= endingDayFilter)
          ){
            console.log(true);
          }
          else{
            console.log(false)
          }
      })
      .catch( error => {
        console.log(error)
      });
  }
}
