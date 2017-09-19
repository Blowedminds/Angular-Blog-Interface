import { Injectable } from '@angular/core';
import { HttpHeaders }    from '@angular/common/http';

@Injectable()
export class MainRequestService {

  constructor() { }

  public mainDomain: string = "http://localhost:8000/";

  public apiDomain: string = "public/";

  public MAIN_API_URL = this.mainDomain + this.apiDomain

  public headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  });

  public handleError(error: any, router: any = null): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only

    let jsError = error.error

    return Promise.reject(error.message || error);
  }

}
