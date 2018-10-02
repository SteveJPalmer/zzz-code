import { Component, OnInit } from '@angular/core';

import { MessageService } from '../message.service'

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  // messageService property must be public as binding within template (Ng only binds to public component props)
  constructor(
    public messageService: MessageService
  ) { }

  ngOnInit() {
  }

}
