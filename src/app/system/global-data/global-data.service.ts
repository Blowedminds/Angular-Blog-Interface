import { Injectable } from '@angular/core';

import { Observable, BehaviorSubject }     from 'rxjs';

@Injectable()
export class GlobalDataService {

  most_viewed_article = new BehaviorSubject<any>(0)

  most_viewed_article_Obs = this.most_viewed_article.asObservable()

  latest_article = new BehaviorSubject<any>(0)

  latest_article_Obs = this.latest_article.asObservable()

  constructor() { }

  get mostViewedArticle()
  {
    return this.most_viewed_article_Obs
  }

  set mostViewedArticle(data: any)
  {
    this.most_viewed_article.next(data)
  }

  get latestArticle()
  {
    return this.latest_article_Obs
  }

  set latestArticle(data: any)
  {
    this.latest_article.next(data)
  }

}
