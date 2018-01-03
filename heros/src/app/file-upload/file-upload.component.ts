import { ElementRef,  ViewChild, Component, OnInit } from '@angular/core';
import { ConfigService } from '../services/config.service';
import { HeroService } from '../services/hero.service';
import { VideoService } from '../services/video.service';
import { UserService } from '../services/user.service';
import { Video } from '../models/video';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { Location } from '@angular/common';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  form: FormGroup;
  videos : Video[];
  loading: boolean = false;

  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(
    private configService: ConfigService,
    private heroService: HeroService,
    private userService: UserService,
    private videoService: VideoService,
    private location: Location,
    private http: HttpClient,private fb: FormBuilder
  ) {
      this.createForm();
  }

  ngOnInit() {
    this.getVideos();
  }

  getVideos(): void {
    this.videoService.getVideos()
      .subscribe(videos => this.videos = videos);
  }

  createForm() {
    this.form = this.fb.group({
      video: null
    });
  }

  onFileChange(event) {
    if(event.target.files.length > 0) {
      let file = event.target.files[0];
      this.form.get('video').setValue(file);
    }
  }

  private prepareSave(): any {
    let input = new FormData();
    input.append('user', "11");
    input.append('video', this.form.get('video').value);
    return input;
  }

  delete(video: Video): void {
    this.videos = this.videos.filter(h => h !== video);
    this.videoService.deleteHero(video).subscribe();
  }

  onSubmit() {
    const formModel = this.prepareSave();
    this.loading = true;

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/form-data' })
    };
    // In a real-world app you'd have a http request / service call here like
    // this.http.post('apiUrl', formModel)
    const url = this.configService.getAPIUrl() + 'videos'; //http://192.168.1.106/backend/video';
    //httpOptions['X-CSRF-TOKEN'] = $('meta[name="csrf-token"]').attr('content');

    let ret =  this.http.post(url, formModel).pipe(
      //tap((video: T) => this.log(`posted {data}`)),
      catchError(this.heroService.handleError('addHero'))
    ).subscribe(() => this.goBack());
  }

  goBack(): void{
    this.loading = false;
    this.location.back();
  }

  clearFile() {
    this.form.get('video').setValue(null);
    this.fileInput.nativeElement.value = '';
  }
}
