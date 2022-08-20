import { Component, OnInit } from '@angular/core';
import axios from 'axios';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  users: Array<any> = []
  messages: Array<any> = []
  selectedUser: any = {
    displayName: "",
    name: ""
  }

  async getUsers() {
    const config: object = {
      method: 'get',
      url: 'https://localhost:4242/getUsers/' + localStorage.getItem('nexttoken')
    };

    let getUsers: any = await axios(config);
    if (!getUsers.data.status) {
      alert("Hata Meydana Geldi");
    } else {
      this.users = getUsers.data.data;
    }

  }

  selectUser(user: any) {
    for (let i = 0; i < this.users.length; i++) {
      let activeuser = this.users[i];
      if (user.id == activeuser.id) {
        activeuser.activeClass = 'active';
        this.selectedUser = activeuser;
        console.log(this.selectedUser);
      } else {
        activeuser.activeClass = "";
      }
    }
    this.getMessages(user.token);
  }

  async getMessages(token: string) {
    const config: object = {
      method: 'get',
      url: 'https://localhost:4242/getMessages/' + token + '/' + localStorage.getItem('nexttoken')
    };
    let messages: any = await axios(config);
    this.messages = messages.data.data.reverse();
  }

  timestampToDate(timestamp: number) {
    let date = new Date(timestamp * 1000);
    // Hours part from the timestamp
    let hours = date.getHours();
    // Minutes part from the timestamp
    let minutes = "0" + date.getMinutes();

    // Will display time in 10:30:23 format
    let formattedTime = hours + ':' + minutes.substr(-2);

    return formattedTime
  }

  ngOnInit(): void {
    this.getUsers();
  }

}
