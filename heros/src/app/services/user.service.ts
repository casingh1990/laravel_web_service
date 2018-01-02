import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from '../services/message.service';
import { ConfigService } from '../services/config.service';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {

  private usersUrl: string;

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private configService: ConfigService) {
        this.usersUrl = this.configService.getAPIUrl() + "users";
    }

  getUser(){
    let data = JSON.parse(localStorage.getItem('currentUser'));

    if (data){
      return data.data;
    }
    else{
      return false;
    }
  }

  /** Log a UserService message with the MessageService */
  private log(message: string) {
    this.messageService.add('UserService: ' + message);
  }

  private handleLogin(user: User){
    // store user details and jwt token in local storage to keep user logged in between page refreshes
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.log(`logged in user w/ id=${user.data.id}`)
  }

  /** login user to server */
  login (user: string, password: string): Observable<User> {
    const url = this.configService.getAPIUrl() + "apilogin";
    let data = {email: user, password: password};
    return this.http.post<User>(url, data, httpOptions).pipe(
      tap(
        (user: User) => this.handleLogin(user)
      ),
      catchError(this.handleError<User>('addUser'))
    );
  }
  /*login(username: string, password: string) {
      const url = this.configService.getAPIUrl() + "apilogin";
      return this.http.post(url, { email: username, password: password })
          .map((response: Response) => {
              // login successful if there's a jwt token in the response
              let user = response.json();
              if (user && user.api_token) {
                  // store user details and jwt token in local storage to keep user logged in between page refreshes
                  localStorage.setItem('currentUser', JSON.stringify(user));
              }

              return user;
          });
  }*/

  /**
   * Log out user
   **/
  logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('currentUser');
  }

  /** PUT: update the user on the server */
  updateUser (user: User): Observable<any> {
    const url = `${this.usersUrl}/${user.id}`;
    return this.http.put(url, user, httpOptions).pipe(
      tap(_ => this.log(`updated user id=${user.id}`)),
      catchError(this.handleError<any>('updateUser'))
    );
  }

  getUsers(): Observable<User[]> {
    this.messageService.add('UserService: fetched users');
    return this.http.get<User[]>(this.usersUrl)
      .pipe(
         tap(users => this.log(`fetched users`)),
         catchError(this.handleError('getUseres', []))
       );
  }


  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  public handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
