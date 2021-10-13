import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import axios from "axios"; 
import * as FormData from 'form-data';
import * as $ from 'jquery';
@Component({
  selector: 'app-offer-employeur',
  templateUrl: './offer-employeur.component.html',
  styleUrls: ['./offer-employeur.component.scss']
})
export class OfferEmployeurComponent implements OnInit {
  isActive : boolean;
  isClicked : boolean;
  offersList : any;
  userStatus: any;
  /**
   * Recruteur
   * mail : recruteur@gmail.fr
   * mdp: Recruteur1987
   */
  constructor() {
    this.isActive = false;
    this.isClicked = false;
    console.log(this.isActive)
    /***/
    const status:any = localStorage.getItem('status');
    this.userStatus = JSON.parse(status);
    console.log(this.userStatus)
    /***/
    const token:any = localStorage.getItem('token');
    const monObjet : any = JSON.parse(token);
    let auth = 'bearer' + " " + monObjet.token;
    axios.get("http://localhost:3000/api/offer/Offers",{
      headers: {
        'Authorization': auth
      }
    })
    .then(response => {
        console.log(response);
        this.offersList = response.data;
        for(let i of response.data) {
          console.log(i)
        }
    })
    .catch( error => {
      console.log(error);
    });
   }
  ngOnInit(): void {
  }
  add() {
    this.isActive = true;
    console.log(this.isActive)
  }
  viewNav() {
    console.log(this.isClicked)
    this.isClicked = true;
  }
  onSignin(form:NgForm) {
    let valeur : any = $('input[name=typeEmploi]:checked').val();
    console.log(valeur)
    const title = form.value['title'];
    const story= form.value['story'];
    /** */
    console.log(story)
    console.log(title)
    console.log(valeur)
    var formData = new FormData();
    formData.append("title", title);
    formData.append("descript", story);
    formData.append("typeContrat", valeur);
    interface FormData {
      getAll(): string[]
    }
      const token:any = localStorage.getItem('token');
      const monObjet : any = JSON.parse(token);
      let auth = 'bearer' + " " + monObjet.token;
      console.log(auth);
      axios.post("http://localhost:3000/api/offer/newOffer", formData, {
          headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': auth
          }
      })
      .then(response => {
        console.log(formData);
        console.log('test')
          console.log(response.data);
          console.log(auth);
      })
      /*.then(()=> {
        window.location.replace('/offersRecruteurs');
      })*/
      .catch( error => {
        console.error()
      });
  }
}
