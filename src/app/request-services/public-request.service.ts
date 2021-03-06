import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Router }            from '@angular/router';
import { Observable }     from 'rxjs';
import 'rxjs/Rx';

import { MainRequestService }   from './main-request.service'
import { ApiService }           from '../api.service'

@Injectable()
export class PublicRequestService {

  public locale: string

  constructor(
    private http: HttpClient,
    private router: Router,
    private main: MainRequestService,
    private api: ApiService
  ) {
    api.getLocale().subscribe(locale => this.locale = locale)
  }

  public API_URL: string = this.main.mainDomain + this.main.apiDomain

  public IMAGE_URL = this.main.mainDomain + "image/"

  private headers = this.main.headers

  getMenus(): Observable<any>
  {
    const url = this.makeRequestURL('menus')

    return this.http
                    .get(url, { headers: this.headers})
                    //.map(response => response)
                    .catch(error => this.main.handleError(error))
  }

  getLanguages(): Observable<any>
  {
    const url = this.makeRequestURL('languages')

    return this.http
                    .get(url, {headers: this.headers})
                    //.map(response => response)
                    .catch(error => this.main.handleError(error))
  }

  getCategories(): Observable<any>
  {
    const url = this.makeRequestURL("categories")

    return this.http
                    .get(url, { headers: this.headers})
                    //.map(response => response)
                    .catch(error => this.main.handleError(error))
  }

  getHomeData(): Observable<any>
  {
    const url = this.makeRequestURL('home-data')

    return this.http
                    .get(url, {headers: this.headers})
                    //.map(response => response)
                    .catch(error => this.main.handleError(error))
  }

  getAboutMe(): Observable<any>
  {
    const url = this.makeRequestURL('about-me')

    return this.http
                    .get(url, { headers: this.headers })
                    //.map(response => response)
                    .catch(error => this.main.handleError(error))
  }

  makeRequestURL(url: string)
  {
    return this.API_URL + this.locale + "/" + url
  }
}
