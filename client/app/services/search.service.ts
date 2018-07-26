import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../shared/models/user.model';

@Injectable()
export class SearchService {

  constructor(private http: HttpClient) { }

  getAnswer(query): Observable<any> {
      console.log('sdfsdf');
    return this.http.post('/api/search', {query: query});
  }

}
