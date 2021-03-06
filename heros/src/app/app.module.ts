import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { HeroService } from './services/hero.service';
import { VideoService } from './services/video.service';
import { MessageService } from './services/message.service';
import { ConfigService } from './services/config.service';
import { UserService } from './services/user.service';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { LoginLinkComponent } from './login-link/login-link.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './_guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent,
    FileUploadComponent,
    LoginComponent,
    LoginLinkComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ HeroService, MessageService, VideoService, ConfigService, UserService, HttpClientModule, AuthGuard ],
  bootstrap: [AppComponent]
})
export class AppModule { }
