import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Router }            from '@angular/router';
import { Observable }     from 'rxjs';
import 'rxjs/Rx';

import { MainRequestService }   from './main-request.service'
import { ApiService }           from '../api.service'

@Injectable()
export class PublicRequestService {

  constructor(
    private http: Http,
    private router: Router,
    private main: MainRequestService,
    private api: ApiService
  ) { }

  public API_URL: string = this.main.mainDomain + this.main.apiDomain

  public IMAGE_URL = this.main.mainDomain + "image/"

  private headers = this.main.headers

  getLocale()
  {
    return this.api.getLocale()
  }

  setLocale(locale: string)
  {
    return this.api.setLocale(locale)
  }

  getMenus(): Observable<any>
  {
    const url = this.makeRequestURL('menus')

    return this.http
                    .get(url, { headers: this.headers})
                    .map(response => response.json())
                    .catch(error => this.main.handleError(error))
  }

  getLanguages(): Observable<any>
  {
    const url = this.makeRequestURL('languages')

    return this.http
                    .get(url, {headers: this.headers})
                    .map(response => response.json())
                    .catch(error => this.main.handleError(error))
  }

  getHomeData(): Observable<any>
  {
    const url = this.makeRequestURL('home-data')

    return this.http
                    .get(url, {headers: this.headers})
                    .map(response => response.json())
                    .catch(error => this.main.handleError(error))
  }

  getAboutMe(): Observable<any>
  {
    const url = this.makeRequestURL('about-me')

    return this.http
                    .get(url, { headers: this.headers })
                    .map(response => response.json())
                    .catch(error => this.main.handleError(error))
  }

  makeRequestURL(url: string)
  {
    return this.API_URL + this.getLocale() + "/" + url
  }
}
