import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

  //switch out to global config
  config = {
    apiUrl: '/orderWebApi'
  };

    getAll() {
        return this.http.get<User[]>(`${this.config.apiUrl}/users`);
    }
}