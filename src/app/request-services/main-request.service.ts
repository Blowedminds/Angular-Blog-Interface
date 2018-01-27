import { Injectable } from '@angular/core';
import { HttpHeaders }    from '@angular/common/http';

import { ApiService } from '../api.service'

declare var swal: any

@Injectable()
export class MainRequestService {

  constructor(
    private api: ApiService
  ) { }

  public mainDomain: string = "http://localhost:8000/";

  public apiDomain: string = "reader/";

  public MAIN_API_URL = this.mainDomain + this.apiDomain

  public headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  });

  public handleError(error: any, router: any = null): Promise<any> {
    console.error('An error occurred', error)

    error = error.error

    if(typeof error.pop_up !== "undefined" && error.pop_up && error.pop_up === "true")
      swal(error.header, error.message, error.state)

    if(typeof error.redirect_link !== "undefined"){

      let rq1 = this.api.getLocale().subscribe( locale => {

        if(locale == 0) return

        this.api.navigate(["/" + locale + error.redirect_link])

      }).unsubscribe()

    }

    return Promise.reject(error.message || error)
  }

}
