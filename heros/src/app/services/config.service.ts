import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {

  api_url: string = "http://10.0.0.60/backend/api/";

  constructor() { }

  public getAPIUrl(): string{
    return this.api_url;
  }
}
