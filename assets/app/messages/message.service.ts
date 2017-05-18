import { Injectable, EventEmitter } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs/Observable";

import { Message } from "./message.model";

@Injectable()
export class MessageService {
  private messageUrl = 'http://localhost:3000/message/';
  private messages: Message[] = [];
  messageIsEdit = new EventEmitter<Message>();

  constructor(private http: Http) {}

  addMessage(message: Message) {
    const body = JSON.stringify(message);
    const headers = new Headers({'Content-Type': 'application/json'});

    return this.http.post(this.messageUrl + this.getToken(), body, {headers: headers})
      .map((responce: Response) => {
        const result = responce.json();
        const msg = new Message(result.obj.content, 'Dummy', result.obj._id, null);
        this.messages.push(msg);

        return msg;
      })
      .catch((error: Response) => Observable.throw(error.json()));
  }

  getMessages() {
    return this.http.get(this.messageUrl)
      .map((response: Response) => {
        const messages = response.json().obj;
        let transformedMessages: Message[] = [];

        for (let msg of messages) {
          transformedMessages.push(new Message(msg.content, 'Dummy', msg._id, null));
        }
        this.messages = transformedMessages;

        return transformedMessages;
      })
      .catch((error: Response) => Observable.throw(error.json()));
  }

  editMessage(message: Message) {
    this.messageIsEdit.emit(message);
  }

  updateMessage(message: Message) {
    const body = JSON.stringify(message);
    const headers = new Headers({'Content-Type': 'application/json'});

    return this.http.patch(this.messageUrl + message.messageId + this.getToken(), body, {headers: headers})
      .map((responce: Response) => responce.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }

  deleteMessage(message: Message) {
    this.messages.splice(this.messages.indexOf(message), 1);
    return this.http.delete(this.messageUrl + message.messageId + this.getToken())
      .map((responce: Response) => responce.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }

  private getToken() {    
    const item = localStorage.getItem('token');
    return item ? '?token=' + item : '';
  }
}