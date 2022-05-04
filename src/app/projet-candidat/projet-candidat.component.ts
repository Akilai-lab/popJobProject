import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import axios from "axios"; 
import * as FormData from 'form-data';

@Component({
  selector: 'app-projet-candidat',
  templateUrl: './projet-candidat.component.html',
  styleUrls: ['./projet-candidat.component.scss']
})
export class ProjetCandidatComponent implements OnInit {
  isActive : boolean;
  active : boolean;
  activeLink:boolean;
  activeFile:boolean;
  isClicked:boolean;
  file:any;
  fileDetail:any;
  projectsList:any;
  userStatus:any;
  iduserProject:any;
  redirectProjects:any;
  activBloc: boolean;
  constructor() {
    var queryString =  window.
    location.search.slice(1,2);
    console.log(queryString)
    this.activBloc = false;
    this.isActive = false;
    this.isClicked = false;
    this.active = false;
    this.activeLink = false;
    this.activeFile = false;
    console.log(this.isActive)
    /***/
    const status:any = localStorage.getItem('status');
    this.userStatus = JSON.parse(status);
    /***/
      const token:any = localStorage.getItem('token');
      const monObjet : any = JSON.parse(token);
      let auth = 'bearer' + " " + monObjet.token;
      axios.get("http://localhost:3000/api/project/Projects", {
        headers: {
          'Authorization': auth
        }
      })
      .then(response => {
          console.log(response);
          this.projectsList = response.data;
          for(let i of response.data) {
            console.log(i)
          }
      })
      .catch( error => {
        console.log(error);
      });
      axios.get("http://localhost:3000/api/project/AllProjects")
      .then(projects => {
        console.log(projects.data)
        this.iduserProject = projects.data.userId;
        this.redirectProjects = projects.data;
        this.redirectProjects.forEach(element => {
          console.log(element.userId)
          console.log(queryString)
          if(queryString==element.userId) {
            console.log(this.redirectProjects);
            this.activBloc = true;
          }
        });
      })
      .catch(error=>{
        console.error(error)
      });
   }
  ngOnInit(): void {
    //router.get('/Projects', auth, multer, project.getProjects);
  }
  
  viewNav() {
    console.log(this.isClicked)
    this.isClicked = true;
  }
  add() {
    let store = localStorage.getItem('id');
    if(store){
      this.isActive = true;
      console.log(this.isActive)
    }
  }

  addImage() {
    this.activeLink = false;
    this.activeFile = false;
    this.active = true;
    let file = document.getElementById('file');
    let image = document.getElementById('imageDl');
    let lien = document.getElementById('lien');
    let imageIcone = document.getElementById('imageIcone');
    if(file != null && lien != null && image != null && imageIcone != null) {
      file.style.display="none";
      lien.style.display="none";
  
      image.style.display="flex";
      image.style.flexWrap="wrap";
      image.style.alignItems="center";
      image.style.marginBottom="2%";
  
      imageIcone.style.display="none";
    }
  }

  addLink() {
    this.activeFile = false;
    this.active = false;
    this.activeLink = true;
    let file = document.getElementById('file');
    let image = document.getElementById('imageDl');
    let lien = document.getElementById('lien');
    let lienIcone = document.getElementById('lienIcone');
    if(file != null && lien != null && image != null && lienIcone != null) {
      file.style.display="none";
      image.style.display="none";

      lien.style.display="flex";
      lien.style.flexWrap="wrap";
      lien.style.alignItems="center";
      lien.style.marginBottom="2%";

      lienIcone.style.display="none";
    }
  }
  addFile() {
    this.active = false;
    this.activeLink = false;
    this.activeFile = true;
    let file = document.getElementById('file');
    let image = document.getElementById('imageDl');
    let lien = document.getElementById('lien');
    let fichierIcone = document.getElementById('fichierIcone');
    if(file != null && lien != null && image != null && fichierIcone != null) {
      lien.style.display="none";
      image.style.display="none";
  
      file.style.display="flex";
      file.style.flexWrap="wrap";
      file.style.alignItems="center";
      file.style.marginBottom="2%";
  
      fichierIcone.style.display="none";
    }
  }

  return() {
    this.active = false;
    this.activeLink = false;
    this.activeFile = false;
    let file = document.getElementById('file');
    let image = document.getElementById('imageDl');
    let lien = document.getElementById('lien');
    let lienIcone = document.getElementById('lienIcone');
    let imageIcone = document.getElementById('imageIcone');
    let fileIcone = document.getElementById('fichierIcone');
    if(file != null && lien != null && image != null && fileIcone != null && imageIcone!= null && lienIcone != null) {
      lien.style.display="block";
      lienIcone.style.display="block";

      image.style.display="block";
      imageIcone.style.display="block";

      file.style.display="block";
      fileIcone.style.display="block";
    }
  }
  onFileAdded(event:Event){
    this.file = (event.target as HTMLInputElement).files[0];
    console.log(this.file)
    return this.file
  }
  onFilesAdded(event:Event){
    this.fileDetail = (event.target as HTMLInputElement).files[0];
    console.log(this.fileDetail)
    return this.fileDetail
  }
  addProject(form:NgForm) {
    let link = form.value['link'];
    let title = form.value['title'];
    let descript = form.value['descript'];

    console.log(link)
    console.log(title)
    console.log(descript)
    console.log(this.file)
    console.log(this.fileDetail)
    var formData = new FormData();
    if(link != undefined) {
      formData.append("link", link);
    }
    if(this.fileDetail != undefined) {
      formData.append("fichier", this.fileDetail);
    }
    if(this.file != undefined) {
      formData.append("image", this.file);
    }

    formData.append("title", title);
    formData.append("descript", descript);
    interface FormData {
      getAll(): string[]
    }
      const token:any = localStorage.getItem('token');
      const monObjet : any = JSON.parse(token);
      let auth = 'bearer' + " " + monObjet.token;
      console.log(auth);
      axios.post("http://localhost:3000/api/project/newProject", formData, {
          headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': auth
          }
      })
      .then(response => {
          console.log(response.data);
          console.log(auth);
      })
      .then(()=> {
        window.location.replace('/projectsCandidat');
      })
      .catch( error => {
        console.error()
      });
  }
}
