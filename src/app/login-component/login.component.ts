import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from '../services/authorization.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userData = {}
  constructor(private _auth: AuthorizationService, private _router:Router) { }
  ngOnInit() {
  }

  loginUser(){
    this._auth.loginUser(this.userData)
      .subscribe(
        res => {
          console.log(res)
          localStorage.setItem('token', res.token)
          this._router.navigate(['/admin'])
        },
        err => console.log(err)
      )
    }
  }