import { Injectable } from '@angular/core';

import { Observable, BehaviorSubject }     from 'rxjs';

@Injectable()
export class GlobalDataService {

  _most_viewed_article = new BehaviorSubject<any>(0)

  most_viewed_article_Obs = this._most_viewed_article.asObservable()

  _latest_article = new BehaviorSubject<any>(0)

  latest_article_Obs = this._latest_article.asObservable()

  _categories = new BehaviorSubject<any>(0)

  categories_Obs = this._categories.asObservable()

  constructor() { }

  get mostViewedArticle()
  {
    return this.most_viewed_article_Obs
  }

  set mostViewedArticle(data: any)
  {
    this._most_viewed_article.next(data)
  }

  get latestArticle()
  {
    return this.latest_article_Obs
  }

  set latestArticle(data: any)
  {
    this._latest_article.next(data)
  }

  get categories()
  {
    return this.categories_Obs
  }

  set categories(data: any)
  {
    this._categories.next(data)
  }
}
