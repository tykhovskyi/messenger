import { Component, Input } from "@angular/core";

import { Message } from "./message.model";
import { MessageService } from "./message.service";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styles: [`
    .author {
      display: inline-block;
      font-style: italic;
      font-size: 12px;
      width: 80%;
    }
    .config {
      display: inline-block;
      text-align: right;
      font-size: 12px;
      width: 19%;
    }
    .config a { padding-left: 10px; }
  `]
})
export class MessageComponent {
  @Input() msg: Message;

  constructor(private messageService: MessageService) {}

  onEdit() {
    this.messageService.editMessage(this.msg);
  }

  updateMessage(message: Message) {

  }

  onDelete() {
    this.messageService.deleteMessage(this.msg)
      .subscribe(
        result => console.log(result)
      );
  }

  belongsToUser() {
    return localStorage.getItem('userId') === this.msg.userId;
  }
}