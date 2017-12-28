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

  public apiDomain: string = "public/";

  public MAIN_API_URL = this.mainDomain + this.apiDomain

  public headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  });

  public handleError(error: any, router: any = null): Promise<any> {
    console.error('An error occurred', error)

    let jsError = error.error

    if(typeof jsError.pop_up !== "undefined" && (jsError.pop_up || jsError.pop_up === "true"))
      swal(jsError.header, jsError.message, jsError.state)

    if(typeof jsError.link !== "undefined")
      switch(jsError.link){
        case "home":
          let rq1 = this.api.getLocale().subscribe( locale => {
            if(locale == 0) return

            this.api.navigate(["/" + locale])

            rq1.unsubscribe()
          })
          break
        default:
          break
      }

    return Promise.reject(error.message || error)
  }
  //
  // public articleNotFoundError(error: any, router: any = null): Promise<any>
  // {
  //   console.error('An error occurred', error)
  //
  //   let jsError = error.error
  //   if(typeof jsError.pop_up !== "undefined" && (jsError.pop_up || jsError.pop_up === "true"))
  //   swal(jsError.header, jsError.message, jsError.state)
  //
  //   return Promise.reject(error.message || error)
  // }

}
