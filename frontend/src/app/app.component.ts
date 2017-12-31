import { Component, Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { DataManager } from './services/DataManager.service';

@Injectable()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private _http: Http){}
    private headers = new Headers({'Content-type': 'application/json'});
    title = 'Angular Laravel Demo';
    onSubmit(form: Ngform): Promise <any>{
      return this._http.post('http://10.0.0.60/bakend/api/items', JSON.stringify(form.value), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
    }
    private handleError(error: any): Promise<any>{
      console.error('An error occurred', error);
      return Promise.reject(error.message || error);
    }
}
