import { Injectable } from '@angular/core';


@Injectable()
export class Config
{
  private isProduction = false;
  private devAPIClientSecret = "nmEGvk25tZptZgeNcSCjNNpsnxCqm7UAh9ZGJ5curkSfNPZ6yz";
  private apiGrantType = "password";

  getBaseUrl()
  {
    if (this.isProduction){
      return 'http://api.casingh.me/api';
    }else{
      return 'http://10.0.0.60/api';
    }
  }

  getAPIClientSecret()
  {
      if (this.isProduction)
      {
          return "TiHkCPB4dochEj8P5doU5Xi09owOpnGjINqLBrAI";
      }
      else
      {
          return this.devAPIClientSecret;
      }
  }

  getAPIGrantType()
  {
      return this.apiGrantType;
  }

}
