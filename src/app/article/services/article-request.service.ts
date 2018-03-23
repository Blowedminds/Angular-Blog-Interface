import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable }     from 'rxjs';

import { MainRequestService, HelpersService, RoutingListService } from '../imports';

@Injectable()
export class ArticleRequestService extends MainRequestService{

  constructor(
    http: HttpClient,
    helpersService: HelpersService,
    routingListService: RoutingListService
  )
  {
    super(http, helpersService, routingListService)
  }

  getMostViewed(): Observable<any>
  {
    const url = this.makeUrl("most-viewed")

    return this.http
                    .get(url, this.options)
                    .catch(error => this.handleError(error))
  }

  getArticle(slug: string, locale_id: string): Observable<any>
  {
    const url = this.makeUrl("article.article", slug)

    return this.http
                    .get(url, this.options)
                    .catch(error => this.handleError(error))
  }

  getLatest(): Observable<any>
  {
    const url =  this.makeUrl("latest")

    return this.http
                    .get(url, this.options)
                    .catch(error => this.handleError(error))
  }

  getArticlesByCategory(category_slug: string): Observable<any>
  {
    const url = this.makeUrl("category/", category_slug)

    return this.http
                    .get(url, this.options)
                    .catch(error => this.handleError(error))
  }

  getArticleSearch(query: string): Observable<any>
  {
    const url = this.makeUrl("search", `?q=${query}`)

    return this.http
                    .get(url, this.options)
                    .catch(error => this.handleError(error))
  }
}
