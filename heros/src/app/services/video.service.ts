import { Injectable } from '@angular/core';
import { Video } from '../models/video';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from '../services/message.service';
import { UserService } from '../services/user.service';
import { ConfigService } from '../services/config.service';
import { catchError, map, tap } from 'rxjs/operators';
import { Location } from '@angular/common';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class VideoService {

  private videosUrl: string;

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private userService: UserService,
    private location: Location,
    private configService: ConfigService) {
        this.videosUrl = this.configService.getAPIUrl() + "videos";
    }

  getVideo(id: number): Observable<Video> {
    const url = `${this.videosUrl}/${id}`;
    return this.http.get<Video>(url).pipe(
      tap(_ => this.log(`fetched video id=${id}`)),
      catchError(this.handleError<Video>(`getVideo id=${id}`))
    );
  }

  /** Log a VideoService message with the MessageService */
  private log(message: string) {
    this.messageService.add('VideoService: ' + message);
  }

  /** POST: add a new video to the server */
  addVideo (video: Video): Observable<Video> {
    const url = `${this.videosUrl}`;//http://192.168.1.106/backend/video';
    //httpOptions['X-CSRF-TOKEN'] = $('meta[name="csrf-token"]').attr('content');
    //const httpOptions = this.getHeaders();
    return this.http.post<Video>(url, video).pipe(
      tap((video: Video) => this.log(`added video w/ id=${video.id}`)),
      catchError(this.handleError<Video>('addVideo'))
    );
  }

  /** PUT: update the video on the server */
  updateVideo (video: Video): Observable<any> {
    const url = `${this.videosUrl}/${video.id}`;
    const httpOptions = this.getHeaders();
    return this.http.put(url, video, httpOptions).pipe(
      tap(_ => this.log(`updated video id=${video.id}`)),
      catchError(this.handleError<any>('updateVideo'))
    );
  }

  /**
   * Call backend to delete video
   **/
  deleteVideo (video: Video| number): Observable<Video> {
    const id = typeof video === 'number' ? video : video.id;
    const url = `${this.videosUrl}/${id}`;

    return this.http.delete<Video>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted video id=${id}`)),
      catchError(this.handleError<Video>('deleteVideo'))
    );
  }



  getVideos(): Observable<Video[]> {
    const httpOptions = this.getHeaders();

    this.messageService.add('VideoService: fetched videos');

    let url = this.videosUrl;// + "?api_token=" + user.api_token;

    return this.http.get<Video[]>(url, httpOptions)
      .pipe(
         tap(videos => this.log(`fetched videos`)),
         catchError(this.handleError('getVideoes', []))
       );
  }

  public getHeaders(){
    let user = this.userService.getUser();

    let api_token = '';
    if (user){
      api_token = user.api_token;
    }

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',
    'Authorization' : 'Bearer ' + api_token })
    };
    return httpOptions;
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

      if (error.status === 401) {
          // 401 unauthorized response so log user out of client
          //this.location.path('/login');
          window.location.href = '/login';
      }

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
