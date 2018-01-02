import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HEROES } from './mock-heroes';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from '../services/message.service';
import { ConfigService } from '../services/config.service';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class DataService {

  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private configService: ConfigService) {
        this.apiUrl = this.configService.getAPIUrl();
    }

  setAPIUrl(url: string){
    this.apiUrl = this.configService.getAPIUrl() + url;
  }


    // Log a TService message with the MessageService
    private log(message: string) {
      this.messageService.add('TService: ' + message);
    }

  /*getHero(id: number): Observable<Hero> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched T id=${id}`)),
      catchError(this.handleError<T>(`getT id=${id}`))
    );
  }


  // PUT: update the hero on the server
  updateHero (hero: Hero): Observable<any> {
    const url = `${this.apiUrl}/${hero.id}`;
    return this.http.put(url, hero, httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  getHeroes(): Observable<Hero[]> {
    this.messageService.add('HeroService: fetched heroes');
    return this.http.get<Hero[]>(this.apiUrl)
      .pipe(
         tap(heroes => this.log(`fetched heroes`)),
         catchError(this.handleError('getHeroes', []))
       );
  }
  */

  // POST: add a new T to the server
  post<T> (data: T): Observable<T> {
    const url = `${this.apiUrl}`;//http://192.168.1.106/backend/hero';
    //httpOptions['X-CSRF-TOKEN'] = $('meta[name="csrf-token"]').attr('content');
    return this.http.post<T>(url, data, httpOptions).pipe(
      tap((hero: T) => this.log(`posted {data}`)),
      catchError(this.handleError<T>('addHero'))
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
