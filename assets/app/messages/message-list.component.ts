import { Component, OnInit } from '@angular/core';

import { Message } from "./message.model";

@Component({
  selector: 'app-message-list',
  template: `
    <div class="col-md-8 col-md-offset-2">
      <app-message 
        [msg]="message" 
        (editClicked)="message.content = $event"
        *ngFor="let message of messages"></app-message>
    </div>
  `
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [
    new Message('Some message', 'John'),
    new Message('Something else', 'John'),
    new Message('3rd message', 'Bob')
  ];

  constructor() { }

  ngOnInit() { }
}