import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Router }            from '@angular/router';
import { Observable }     from 'rxjs';
import 'rxjs/Rx';

import { MainRequestService }   from './main-request.service'
import { ApiService }           from '../api.service'

@Injectable()
export class ArticleRequestService {

  public locale: string

  public ARTICLE_API_URL: string = "article/"

  public MAIN_PUBLIC_URL: string = this.main.mainDomain + this.main.apiDomain

  public IMAGE_URL = this.main.mainDomain + "image/"

  private headers = this.main.headers

  constructor(
    private http: HttpClient,
    private router: Router,
    private main: MainRequestService,
    public api: ApiService
  ) {
    api.getLocale().subscribe(locale => {
      if(locale == 0) return

      this.locale = locale
    })
   }

  getMostViewed(): Observable<any>
  {
    const url = this.makeRequestURL("most-viewed")

    return this.http
                    .get(url, { headers: this.headers })
                    //.map(response => response)
                    .catch(error => this.main.handleError(error))
  }

  getArticleSingle(slug: string, locale_id: string): Observable<any>
  {
    const url = this.MAIN_PUBLIC_URL + locale_id + "/" + this.ARTICLE_API_URL + "article-single/" + slug

    return this.http
                    .get(url, { headers: this.headers })
                    //.map(response => response)
                    .catch(error => this.main.handleError(error))
  }

  getLatest(): Observable<any>
  {
    const url = this.makeRequestURL("latest")

    return this.http
                    .get(url, { headers: this.headers })
                    //.map(response => response)
                    .catch(error => this.main.handleError(error))
  }

  getArticlesByCategory(category_slug: string): Observable<any>
  {
    const url = this.makeRequestURL("category/" + category_slug)

    return this.http
                    .get(url, { headers: this.headers })
                    //.map(response => response)
                    .catch(error => this.main.handleError(error))
  }

  getArticleSearch(query: string): Observable<any>
  {
    const url = this.makeRequestURL("search?q=" + query)

    return this.http
                    .get(url, { headers: this.headers})
                    .catch(error => this.main.handleError(error))
  }

  makeRequestURL(url: string)
  {
    return this.MAIN_PUBLIC_URL + this.locale + "/" + this.ARTICLE_API_URL + url
  }
}
