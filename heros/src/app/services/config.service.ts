import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {

  api_url: string = "http://192.168.1.106/backend/api/";

  constructor() { }

  public getAPIUrl(): string{
    return this.api_url;
  }
}
