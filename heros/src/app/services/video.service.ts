import { Injectable } from '@angular/core';
import { Video } from '../models/video';
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
export class VideoService {

  private videosUrl: string;

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private configService: ConfigService) {
        this.videosUrl = this.configService.getAPIUrl() + "videos";
    }

  getVideo(id: number): Observable<Video> {
    const url = `${this.videosUrl}/${id}`;
    return this.http.get<Video>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Video>(`getVideo id=${id}`))
    );
  }

  /** Log a VideoService message with the MessageService */
  private log(message: string) {
    this.messageService.add('VideoService: ' + message);
  }

  /** POST: add a new hero to the server */
  addVideo (hero: Video): Observable<Video> {
    const url = `${this.videosUrl}`;//http://192.168.1.106/backend/hero';
    //httpOptions['X-CSRF-TOKEN'] = $('meta[name="csrf-token"]').attr('content');
    return this.http.post<Video>(url, hero, httpOptions).pipe(
      tap((hero: Video) => this.log(`added hero w/ id=${hero.id}`)),
      catchError(this.handleError<Video>('addVideo'))
    );
  }

  /** PUT: update the hero on the server */
  updateVideo (hero: Video): Observable<any> {
    const url = `${this.videosUrl}/${hero.id}`;
    return this.http.put(url, hero, httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateVideo'))
    );
  }

  getVideos(): Observable<Video[]> {
    this.messageService.add('VideoService: fetched videos');
    return this.http.get<Video[]>(this.videosUrl)
      .pipe(
         tap(videos => this.log(`fetched videos`)),
         catchError(this.handleError('getVideoes', []))
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
