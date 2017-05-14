import { Component, OnInit } from '@angular/core';

import { MessageService } from "./message.service";
import { Message } from "./message.model";

@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html',
  providers: [MessageService]
})
export class MessageInputComponent implements OnInit {
  constructor(private messageService: MessageService) { }

  ngOnInit() { }

  onSave(value: string) {
    const message = new Message(value, 'John');
    this.messageService.addMessage(message);
  }
}