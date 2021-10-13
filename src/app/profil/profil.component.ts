import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import axios from "axios"; 
import * as FormData from 'form-data';
@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  beEdited : boolean;
  isClicked : boolean;
  fileDetail : any;
  infoUser: any;
  test: any;
  beginMonth : any;
  beginDay : any;
  EndMonth : any;
  EndDay : any;
  name:any;
  prenom: any;
  mail: any;
  profession:any;
  localisation:any;
  parcours:any;
  plateforme:any;
  image:any;
  constructor() { 
    this.beEdited = false;
    this.isClicked = false;
    console.log(this.isClicked)
    //router.get('/getInfo', auth, multer, profil.gettInfo);
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
        response.data.forEach(element => {
          console.log(element.id)
          if(element.id == localStorage.getItem('id')) {
            
            for (let i of this.infoUser) {
              if(i.name != null) {
                this.name = i.name;
              }else {
                this.name = 'votre nom'; 
              }
              if(i.lastName != null) {
                this.prenom = i.lastName;
              }else {
                this.prenom = 'votre prenom'; 
              }
              if(i.mail != null) {
                this.mail = i.mail;
              }else {
                this.mail = 'votre mail'; 
              }//
              if(i.profession != null) {
                this.profession = i.profession;
              }else {
                this.profession = 'votre profession'; 
              }
              if(i.localisation != null) {
                this.localisation = i.localisation;
              }else {
                this.localisation = 'votre localisation'; 
              }
              if(i.parcours != null) {
                this.parcours = i.parcours;
              }else {
                this.parcours = 'Parcours'; 
              }
              if(i.plateforme != null) {
                this.plateforme = i.plateforme;
              }else {
                this.plateforme = 'Lien de Plateforme'; 
              }
              if(i.image != null) {
                this.image = i.image;
              }
              this.test = i.disponibilitesDe.split('-');
              if(i.disponibilitesDe != null) {
                this.beginMonth = this.test[1];
                this.beginDay = this.test[2];
              }else {
                this.beginMonth = '0';
                this.beginDay = '0';
              }
              i.disponibilitesA.split('-');
              this.EndMonth = i.disponibilitesA.split('-')[1];
              this.EndDay = i.disponibilitesA.split('-')[2];
              if(i.disponibilitesA != null) {
                this.EndMonth = i.disponibilitesA.split('-')[1];
                this.EndDay = i.disponibilitesA.split('-')[2];
              }else {
                this.EndMonth = '0';
                this.EndDay = '0';
              }
            }
          }
          else {
            document.getElementById('attente').innerHTML+=`
            <img src="./../../assets/icones/AttenteEditerProfil.png" style="width: -webkit-fill-available;position: absolute;"/>
            `
          }
          console.log(auth);
        });
    })
    .catch( error => {
      console.log(error)
      console.error(error);
      
    });
  }
  ngOnInit(): void {
  }
  editProfil() {
    this.beEdited = true;

  }
  onFilesAdded(event:Event){
    this.fileDetail = (event.target as HTMLInputElement).files[0];
    console.log(this.fileDetail)
    return this.fileDetail
  }
  submitForm(form:NgForm) {
    const nom = form.value['nom'];
    const prenom = form.value['prenom'];
    const profession = form.value['profession'];
    const mail = form.value['mail'];
    const localisation = form.value['localisation'];
    const parcours = form.value['parcours'];
    const domaine = form.value['domaine']; // renvoi undefined
    const start = form.value['trip-start'];
    const end = form.value['trip-end'];
    const firstLink = form.value['linkOne'];
    const scndLink = form.value['linkTwo'];
    const phone = form.value['phone'];
    var formData = new FormData();
    console.log(domaine)
    if(this.fileDetail != undefined) {
      formData.append("image", this.fileDetail);
    }
    else {
      formData.append("image", this.image)
    }
    if(nom != "") {
      formData.append("nom", nom);
    }
    else {
      formData.append("nom", this.name)
    }
    if(prenom != "") {
      formData.append("prenom", prenom);
    }
    else {
      formData.append("prenom", this.prenom)
    }
    if(profession != "") {
      formData.append("profession", profession);
    }
    else {
      formData.append("profession", this.profession)
    }
    if(mail != undefined) {
      formData.append("mail", mail);
    }
    else {
      formData.append("mail", this.mail)
    }
    if(localisation != "") {
      formData.append("localisation", localisation);
    }
    else {
      formData.append("localisation", this.localisation);
    }
    if(parcours != "") {
      formData.append("parcours", parcours);
    }
    else {
      formData.append("parcours", this.parcours);
    }
    if(domaine != undefined) {
      formData.append("domaine", domaine);
    }
    /*else {
      formData.append("domaine", domaine);
    }*/
    if(start != undefined) {
      formData.append("start", start);
    }
    if(end != undefined) {
      formData.append("end", end);
    }
    if(firstLink != "") {
      formData.append("firstLink", firstLink);
    }
    if(scndLink != "") {
      formData.append("scndLink", scndLink);
    }
    if(phone != "") {
      formData.append("phone", phone);
    }
    interface FormData {
      getAll(): string[]
    }
      const token:any = localStorage.getItem('token');
      const monObjet : any = JSON.parse(token);
      let auth = 'bearer' + " " + monObjet.token;
      axios.put("http://localhost:3000/api/profil/", formData, {
          headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': auth
          }
      })
      .then(response => {
          console.log(response.data);
          console.log(auth);
          /*this.beEdited = false;
          console.log(this.beEdited);
          window.location.reload();*/
      })
      .catch( error => {
        console.log(error)
        console.error(error);
        
      });
  }
  viewNav() {
    console.log(this.isClicked)
    this.isClicked = true;
  }
}
