import { Component, OnInit } from '@angular/core';

import timeago from 'timeago.js';

import { Subscription } from 'rxjs'

import { HomeRequestService } from '../../services/home-request.service';
import { HelpersService, CacheService } from '../../imports';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  most_viewed_articles: any

  articles: any

  latest_articles: any

  IMAGE_URL: any;

  THUMB_URL: any

  timeAgoInstance: any

  locale: string

  subs = new Subscription()

  categories: any

  get isPageReady()
  {
    return this.most_viewed_articles && this.articles && this.latest_articles && this.categories;
  }

  constructor(
    private homeRequestService: HomeRequestService,
    private cacheService: CacheService,
    private helpersService: HelpersService
  )
  {
    this.IMAGE_URL = this.homeRequestService.makeUrl('image.image');

    this.THUMB_URL = this.homeRequestService.makeUrl('image.thumb');

    let local_dict  = (number, index, total_sec) =>
    {
      return [
        ['şimdi', 'şimdi'],
        ['%s saniye önce', '%s saniye'],
        ['1 dakika önce', '1 dakika'],
        ['%s dakika önce', '%s dakika'],
        ['1 saat önce', '1 saat'],
        ['%s saat önce', '%s saat'],
        ['1 gün önce', '1 gün'],
        ['%s gün önce', '%s gün'],
        ['1 hafta önce', '1 hafta'],
        ['%s hafta önce', '%s hafta'],
        ['1 ay önce', '1 ay'],
        ['%s ay önce', '%s ay'],
        ['1 yıl önce', '1 yıl'],
        ['%s yıl önce', '%s yıl']
      ][index];
    }

    timeago.register('tr_TR', local_dict )

    this.timeAgoInstance = timeago(null, 'tr_TR')
  }

  ngOnInit() {

    let rq1 = this.helpersService.listenLocale().subscribe( locale => {

          if(locale == 0) return;

          if(this.locale != locale){

            this.locale = locale;

            this.updateAll();
          }
        });

    this.subs.add(rq1);
  }

  ngOnDestroy()
  {
    this.subs.unsubscribe()
  }

  timeAgoConvert(time: any)
  {
    return this.timeAgoInstance.format(time.slice(0, 19))
  }

  updateAll()
  {
    this.updateCategories();
    this.updateMostViewedArticles();
    this.updateArticlesAndLatestArticles();
  }

  updateCategories()
  {
    this.subs.add(this.cacheService.get('categories', this.homeRequestService.makeGetRequest('user.categories'))
                                .subscribe( response => this.categories = response));
  }

  updateMostViewedArticles()
  {
    this.most_viewed_articles = null

    this.subs.add(
      this.cacheService.get(`${this.locale}.most_viewed_articles`, this.homeRequestService.getMostViewedArticles())
                                .subscribe( response => this.most_viewed_articles = response)
    );
  }

  updateArticlesAndLatestArticles()
  {
    this.latest_articles = null

    this.subs.add(
      this.cacheService.get(`${this.locale}.latest_article`, this.homeRequestService.getLatestArticles())
                                .subscribe( response => this.divideArticlesToLatestArticles(response))
    );

  }

  divideArticlesToLatestArticles(articles: any)
  {
    if(typeof articles === "object"){

      let array = []

      let length = articles.length > 5 ? 5 : articles.length

      for(let i = 0; i < length; i++){
        if(typeof articles[i] !== "undefined")
          array.push(articles[i])
      }

      this.latest_articles = array

      this.articles = articles.slice(length, articles.length)
    }
  }

  findCategory(category: any)
  {
    if(!category)
      return;

    return this.categories.find( obj => obj.id === category.id).name
  }
}
