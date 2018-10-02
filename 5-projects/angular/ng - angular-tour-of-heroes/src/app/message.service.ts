import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {

  constructor() { }

  messages: string[] = [];          //our array of messages

  add(message: string) {            //add a message to array
    this.messages.push(message);
  }

  clear() {                         //remove all messages
    this.messages = [];
  }
}



