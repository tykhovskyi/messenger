import { Injectable, EventEmitter } from '@angular/core';

import { Error } from './error.model';

@Injectable()
export class ErrorService {
  errorOccured = new EventEmitter<Error>();

  handleError(error: any) {
    const err = new Error(error.title, error.error.message);
    this.errorOccured.emit(err);
  }
}
