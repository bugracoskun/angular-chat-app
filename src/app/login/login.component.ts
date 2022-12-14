import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, Subject, take, takeUntil } from 'rxjs';
import axios from 'axios';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginValid: boolean = true;
  username: string = '';
  password: string = '';

  constructor(
    private router:Router
  ){}

  async userLogin() {
    this.router.navigate(['/main']);
    /* const config = {
      method: 'post',
      url: 'https://localhost:4242/login',
      data: {
        username: this.username,
        password: this.password
      }
    };

    let loginResult: any = await axios(config);
    if (loginResult.data.status == false) {
      alert("Hata Meydana Geldi");
      return;
    }

    if (loginResult.data.login) {
      alert("Giriş Başarılı");
    } else {
      alert("Giriş Bilgilerini Kontrol Ediniz");
    } */
  }


  ngOnInit(): void {

  }

}