import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from "@angular/forms";

import { MessageService } from "./message.service";
import { Message } from "./message.model";

@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html'
})
export class MessageInputComponent implements OnInit, OnDestroy {
  message: Message;

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.messageService.messageIsEdit.subscribe(
      (message: Message) => this.message = message
    );
  }

  ngOnDestroy() {
    this.messageService.messageIsEdit.unsubscribe();
  }

  onSubmit(form: NgForm) {
    if (this.message) {
      // Edit
      this.message.content = form.value.content;
      this.messageService.updateMessage(this.message)
        .subscribe(
          result => console.log(result),
          error => console.error(error)
        );
      this.message = null;
    } else {
      // Create
      const message = new Message(form.value.content, 'John');
      this.messageService.addMessage(message)
        .subscribe(
          data => console.log(data),
          error => console.error(error)
        );
    }
    form.resetForm();
  }

  onClear(form: NgForm) {
    this.message = null;
    form.resetForm();
  }
}