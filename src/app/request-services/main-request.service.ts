import { Injectable } from '@angular/core';
import { Headers }    from '@angular/http';
import { ApiService } from '../api.service'

@Injectable()
export class MainRequestService {

  constructor(private api: ApiService) { }

  public mainDomain: string = "http://localhost:8000/";

  public apiDomain: string = "public/";

  public MAIN_API_URL = this.mainDomain + this.apiDomain

  public headers = new Headers({
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  });

  public handleError(error: any, router: any = null): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only

    let jsError = error.json()

    return Promise.reject(error.message || error);
  }

}
