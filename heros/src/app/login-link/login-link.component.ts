import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login-link',
  templateUrl: './login-link.component.html',
  styleUrls: ['./login-link.component.css']
})
export class LoginLinkComponent implements OnInit {

  user :User;

  constructor(
    private userService: UserService
  ) {  }



  ngOnInit() {
  }

}
