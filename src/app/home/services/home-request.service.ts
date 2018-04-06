import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable }     from 'rxjs';

import { MainRequestService, HelpersService, RoutingListService } from '../imports';

@Injectable()
export class HomeRequestService extends MainRequestService {

  constructor(
    http: HttpClient,
    helpersService: HelpersService,
    routingListService: RoutingListService
  )
  {
    super(http, helpersService, routingListService)
  }

  getSections(): Observable<any>
  {
    return this.makeGetRequest('article.sections');
  }

  // getMostViewedArticles(): Observable<any>
  // {
  //   const url = this.makeUrl('article.most-viewed')
  //
  //   return this.http
  //               .get(url, this.options)
  //               .catch(error => this.handleError(error));
  // }
  //
  // getLatestArticles(): Observable<any>
  // {
  //   const url = this.makeUrl('article.latest')
  //
  //   return this.http
  //               .get(url, this.options)
  //               .catch(error => this.handleError(error));
  // }
}
