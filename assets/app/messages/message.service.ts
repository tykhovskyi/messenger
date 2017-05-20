import { Injectable, EventEmitter } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs/Observable";

import { Message } from "./message.model";
import { ErrorService } from "../errors/error.service";

@Injectable()
export class MessageService {
  private messageUrl = 'http://localhost:3000/message';
  private messages: Message[] = [];
  messageIsEdit = new EventEmitter<Message>();

  constructor(private http: Http, private errorService: ErrorService) {}

  addMessage(message: Message) {
    const body = JSON.stringify(message);
    const headers = new Headers({'Content-Type': 'application/json'});
    const url = this.messageUrl + this.getToken();

    return this.http.post(url, body, {headers: headers})
      .map((responce: Response) => {
        const result = responce.json();
        const msg = new Message(
          result.obj.content, result.obj.user.firstName, result.obj._id, result.obj.user._id);
        this.messages.push(msg);

        return msg;
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  getMessages() {
    return this.http.get(this.messageUrl)
      .map((response: Response) => {
        const messages = response.json().obj;
        let transformedMessages: Message[] = [];

        for (let msg of messages) {
          transformedMessages.push(
            new Message(msg.content, msg.user.firstName, msg._id, msg.user._id));
        }
        this.messages = transformedMessages;

        return transformedMessages;
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  editMessage(message: Message) {
    this.messageIsEdit.emit(message);
  }

  updateMessage(message: Message) {
    const body = JSON.stringify(message);
    const headers = new Headers({'Content-Type': 'application/json'});
    const url = this.messageUrl +'/' + message.messageId + this.getToken();

    return this.http.patch(url, body, {headers: headers})
      .map((responce: Response) => responce.json())
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  deleteMessage(message: Message) {
    this.messages.splice(this.messages.indexOf(message), 1);
    const url = this.messageUrl +'/' + message.messageId + this.getToken();

    return this.http.delete(url)
      .map((responce: Response) => responce.json())
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  private getToken() {    
    const item = localStorage.getItem('token');
    return item ? '?token=' + item : '';
  }
}