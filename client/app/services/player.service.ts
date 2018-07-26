import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../shared/models/user.model';

@Injectable()
export class TeamService {

  constructor(private http: HttpClient) { }

  getMyTeam(userId): Observable<any> {
    return this.http.post('/api/team', {userId: userId});
  }
    getAllPlayers(): Observable<any[]> {
        return this.http.get<any[]>('/api/players');
    }

//   register(user: User): Observable<User> {
//     return this.http.post<User>('/api/user', user);
//   }
  
//   getUsers(): Observable<User[]> {
//     return this.http.get<User[]>('/api/users');
//   }

//   countUsers(): Observable<number> {
//     return this.http.get<number>('/api/users/count');
//   }

//   addUser(user: User): Observable<User> {
//     return this.http.post<User>('/api/user', user);
//   }

//   getUser(user: User): Observable<User> {
//     return this.http.get<User>(`/api/user/${user._id}`);
//   }

//   editUser(user: User): Observable<any> {
//     return this.http.put(`/api/user/${user._id}`, user, { responseType: 'text' });
//   }

//   deleteUser(user: User): Observable<any> {
//     return this.http.delete(`/api/user/${user._id}`, { responseType: 'text' });
//   }

}
