import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model: any = {};
  loading = false;

  constructor(
      private router: Router,
      private userService: UserService,
      private messageService: MessageService
    ) { }

  register() {
      this.loading = true;
      this.userService.register(this.model)
          .subscribe(
              data => {
                  this.messageService.success('Registration successful');
                  this.router.navigate(['/']);
              },
              error => {
                  this.messageService.error(error);
                  this.loading = false;
              });
  }

  ngOnInit() {
  }

}
