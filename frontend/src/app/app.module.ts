import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { AppComponent } from './app.component';

import { Config } from './services/Config.service';
import { DataManager } from './services/DataManager.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule
  ],
  providers: [
    Config,
    DataManager,
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
