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

  getUser(id: number): Observable<User> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.get<User>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<User>(`getUser id=${id}`))
    );
  }

  /** Log a UserService message with the MessageService */
  private log(message: string) {
    this.messageService.add('UserService: ' + message);
  }

  /** POST: add a new hero to the server */
  addUser (hero: User): Observable<User> {
    const url = `${this.usersUrl}`;//http://192.168.1.106/backend/hero';
    //httpOptions['X-CSRF-TOKEN'] = $('meta[name="csrf-token"]').attr('content');
    return this.http.post<User>(url, hero, httpOptions).pipe(
      tap((hero: User) => this.log(`added hero w/ id=${hero.id}`)),
      catchError(this.handleError<User>('addUser'))
    );
  }

  /** PUT: update the hero on the server */
  updateUser (hero: User): Observable<any> {
    const url = `${this.usersUrl}/${hero.id}`;
    return this.http.put(url, hero, httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
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
