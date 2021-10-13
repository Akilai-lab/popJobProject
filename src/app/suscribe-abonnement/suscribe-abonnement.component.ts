import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-suscribe-abonnement',
  templateUrl: './suscribe-abonnement.component.html',
  styleUrls: ['./suscribe-abonnement.component.scss']
})
export class SuscribeAbonnementComponent implements OnInit {
  isClicked:boolean;
  constructor() { 
    this.isClicked = false;
  }
  ngOnInit(): void {
  }
  viewNav() {
    console.log(this.isClicked)
    this.isClicked = true;
  }
  suscribeRecrut(form:NgForm) {
    const nom = form.value['nom'];
    const prenom= form.value['prenom'];
    const mail = form.value['mail'];
    const password= form.value['password'];
    console.log(nom);
    console.log(prenom);
    console.log(mail);
    console.log(password);
  }
  suscribeCandidat(form:NgForm) {
    const nom = form.value['nom'];
    const prenom= form.value['prenom'];
    const mail = form.value['mail'];
    const password= form.value['password'];
    console.log(nom);
    console.log(prenom);
    console.log(mail);
    console.log(password);
  }
}
