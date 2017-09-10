import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Router }            from '@angular/router';
import { Observable }     from 'rxjs';
import 'rxjs/Rx';

import { MainRequestService }   from './main-request.service'
import { ApiService }           from '../api.service'

@Injectable()
export class ArticleRequestService {

  constructor(
    private http: Http,
    private router: Router,
    private main: MainRequestService,
    public api: ApiService
  ) { }

  public API_URL: string = "article/"

  public IMAGE_URL = this.main.mainDomain + "image/"

  private headers = this.main.headers

  getMostViewed(): Observable<any>
  {
    const url = this.makeRequestURL("most-viewed")

    return this.http
                    .get(url, { headers: this.headers })
                    .map(response => response.json())
                    .catch(error => this.main.handleError(error))
  }

  getArticleSingle(slug: string): Observable<any>
  {
    const url = this.makeRequestURL("article-single/" + slug)

    return this.http
                    .get(url, { headers: this.headers })
                    .map(response => response.json())
                    .catch(error => this.main.handleError(error))
  }

  getLatest(): Observable<any>
  {
    const url = this.makeRequestURL("latest")

    return this.http
                    .get(url, { headers: this.headers })
                    .map(response => response.json())
                    .catch(error => this.main.handleError(error))
  }

  makeRequestURL(url: string)
  {
    return this.main.MAIN_API_URL + this.api.getLocale() + "/" + this.API_URL + url
  }
}
