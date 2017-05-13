import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html'
})
export class MessageInputComponent implements OnInit {
  constructor() { }

  ngOnInit() { }

  onSave(value: string) {
    console.log(value);
  }
}