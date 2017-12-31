import { Injectable } from '@angular/core';

import { Config } from '../services/Config.service';

@Injectable()
export class AuthService
{

    public constructor(protected config: Config){}

    public getAccessToken(){
      return 'test';
    }
}
