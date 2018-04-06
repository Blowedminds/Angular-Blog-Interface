import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { HelpersService } from './helpers.service';
import { RoutingListService } from './routing-list.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class MainRequestService {

  public MAIN_URI: string = environment.apiUrl;

  get options()
  {
    return this._options;
  }

  private _options: any = {
    headers:  new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      // 'X-Socket-ID': ''
    })
  }

  constructor(
    protected http: HttpClient,
    protected helpersService: HelpersService,
    protected routingListService: RoutingListService
  ) { }

  makeGetRequest(key: string, _url?: string): Observable<any>
  {
    const url = this.makeUrl(key, _url)

    return this.http
                .get(url, this.options)
                .pipe(catchError(error => this.handleError(error)));
  }

  makeUrl(key: string, url?: string): string
  {
    let route = this.routingListService.getUrl(key);

    route = route.replace('{}', this.helpersService.getLocale());

    return this.MAIN_URI + route + (url || '');
  }

  protected handleError(error: any, router: any = null): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only

    switch (error.status){
      case 401:
        this.helpersService.navigate(['login']);
        break;
      case 421:
        this.helpersService.navigate([error.link]);
        break;
    }
    return Promise.reject(error.message || error);
  }
}
