import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";

import { MessageService } from "./message.service";
import { Message } from "./message.model";

@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html'
})
export class MessageInputComponent implements OnInit {
  constructor(private messageService: MessageService) { }

  ngOnInit() { }

  onSubmit(form: NgForm) {
    const message = new Message(form.value.content, 'John');
    this.messageService.addMessage(message)
      .subscribe(
        data => console.log(data),
        error => console.error(error)
      );
    form.resetForm();
  }
}