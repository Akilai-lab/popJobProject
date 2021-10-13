import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import axios from "axios"; 

import * as $ from 'jquery';
@Component({
  selector: 'app-suscribe-connection',
  templateUrl: './suscribe-connection.component.html',
  styleUrls: ['./suscribe-connection.component.scss']
})
export class SuscribeConnectionComponent implements OnInit {
  isClicked:boolean;
  userStatus:any;
  idUser:any;
  constructor() {
    this.isClicked = false;
    //on récupère le status du userId
    ///statusUser
   }

  ngOnInit(): void {
  }
  onSignup(form:NgForm) {
    const mail = form.value['mail'];
    const password= form.value['password'];
    console.log(mail);
    console.log(password);
    const params = new URLSearchParams();
      if (password != "") {
        params.append('password', password);
      }
      else {
        //ajouter text d'erreur
        console.log('error password')
      }
      if (mail != "") {
        params.append('email', mail);
      }
      else {
        console.log('error email')
      }
      console.log(params);
      if(
        (mail.value != "")
        && (password.value != "")
        ) {
        axios.post("http://localhost:3000/api/user/login", params)
        .then(function (response) {
          console.log(response.data);
          const token = JSON.stringify(response.data);
          console.log(token);
          localStorage.setItem('token',token);
          console.log(response.status);
          console.log(response.statusText);
          console.log(response.headers);
          console.log(response.config);
        })
        .then(()=>{
          const token:any = localStorage.getItem('token');
          const monObjet : any = JSON.parse(token);
          let auth = 'bearer' + " " + monObjet.token;
          axios.get("http://localhost:3000/api/user/statusUser",{
            headers: {
              'Authorization': auth
            }
          }
          )
          .then(user=>{
            console.log(user)
            this.idUser = JSON.stringify(user.data.id);
            console.log(this.idUser)
            this.userStatus = JSON.stringify(user.data.status);;
            console.log(this.userStatus);
            localStorage.setItem('id',this.idUser);
            localStorage.setItem('status',this.userStatus);
            console.log(this.userStatus = "Candidat")
            let test = this.userStatus = "Candidat";
            let scndtest = this.userStatus = "Recruteur";
            if(test) {
              window.location.replace('/spaceCandidat');
            }
            else{
              window.location.replace('/spaceRecruteurs');
            }
          })
          .catch(error => {
            console.log(error)
          })
        })
        .catch(function (error) {
          console.log(error);
        });
      }
  }
  onSignin(form:NgForm) {
    const nom = form.value['nom'];
    const prenom= form.value['prenom'];
    const mail = form.value['mail'];
    const password= form.value['password'];
    let valeur : any = $('input[name=choices]:checked').val();
    console.log(valeur)

    console.log(nom);
    console.log(prenom);
    console.log(mail);
    console.log(password);
    const params = new URLSearchParams();
    params.append('status', valeur);
      if (nom != "") {
        params.append('name', nom);
      }
      else {
        //ajouter text d'erreur
        console.log('error name')
      }
      if (prenom != "") {
        params.append('lastName', prenom);
      }
      else {
        //ajouter text d'erreur
        console.log('error userName')
      }
      if (password != "") {
        params.append('password', password);
      }
      else {
        //ajouter text d'erreur
        console.log('error password')
      }
      if (mail != "") {
        params.append('email', mail);
      }
      else {
        console.log('error email')
      }
      console.log(params);
      if(
        (mail.value != "")
        && (password.value != "")
        && (nom.value != "")
        && (prenom.value!="")
        ) {
        console.log(params);
        axios.post("http://localhost:3000/api/user/signup", params)
        .then(function (response) {
          console.log(response.data);
          console.log(response.status);
          console.log(response.statusText);
          console.log(response.headers);
          console.log(response.config);
        })
        .then(()=>{
          const token:any = localStorage.getItem('token');
          const monObjet : any = JSON.parse(token);
          let auth = 'bearer' + " " + monObjet.token;
          axios.get("http://localhost:3000/api/user/statusUser",{
            headers: {
              'Authorization': auth
            }
          }
          )
          .then(user=>{
            console.log(user)
            this.userStatus = user.data.status;
            console.log(this.userStatus)
            if(this.userStatus == 'Candidat') {
              window.location.replace('/spaceCandidat');
            }
            if(this.userStatus == 'Recruteur'){
              window.location.replace('/spaceRecruteurs');
            }
          })
          .catch(error => {
            console.log(error)
          })
        })
        .catch(function (error) {
          console.log(error);
        });
      }
  }
}