import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../services/authorization.service';

@Component({
  selector: 'app-admin-component',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  users = [];
  name;
  position;
  imgurl;

  constructor(private _auth: AuthorizationService) { }

  ngOnInit() {
    this.getAllUser();
  }

  getAllUser(){
    this._auth.getUsers().subscribe(users =>{
      console.log(users);
      this.users = users;
  })
  }
  deleteUser(id) {
    this._auth.deleteUser(id)
      .subscribe(res => { 
        console.log(res);
        }, (err) => {
          console.log(err);
        }
      );
  }

  addUser(){
    this._auth.addUser(this.name, this.position, this.imgurl)
    .subscribe(res => { 
    }, (err) => {
      console.log(err);
    }
  );
  } 
}

