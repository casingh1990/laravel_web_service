import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {
  messages: string[] = [];

  constructor() { }

  add(message: string){
    this.messages.push(message);
  }

  success(message: string){
    this.messages.push("<span class=\"alert-success\">" + message + "</span>");
  }
  error(message: string){
    this.messages.push("<span class=\"alert-error\">" + message + "</span>");
  }

  clear() {
    this.messages = [];
  }
}
