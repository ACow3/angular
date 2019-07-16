import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class HttpService {

  constructor(private _http: HttpClient) {
    // this.getTasks();
  }

  // Remove the lines of code where we make the variable 'tempObservable' and subscribe to it.
  getTasks() {
    return this._http.get('/tasks');
  }
}   