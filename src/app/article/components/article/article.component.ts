import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { ArticleRequestService }  from '../../services/article-request.service'
import { HelpersService, CacheService }  from '../../imports'
import { environment } from '../../../../environments/environment';

import { Subscription } from 'rxjs'

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.sass']
})
export class ArticleComponent implements OnInit {

  article: any;

  available_languages: any

  latest_articles: any

  most_viewed_articles: any

  AUTHOR_IMAGE_URL: string

  DISCUSS_URL: string

  IMAGE_URL: string

  locale: string

  slug: string

  subs = new Subscription()

  get isPageReady()
  {
    return this.article && this.latest_articles && this.most_viewed_articles && this.locale;
  }

  constructor(
    private articleRequestService: ArticleRequestService,
    private cacheService: CacheService,
    private helpersService: HelpersService,
    private route: ActivatedRoute
  )
  {
    this.IMAGE_URL = articleRequestService.makeUrl('image.image');

    this.AUTHOR_IMAGE_URL = articleRequestService.makeUrl('public.image.author');

    this.DISCUSS_URL = environment.discussUrl;
  }

  ngOnInit() {

    let rq1 = this.helpersService.listenLocale().subscribe( locale => {

      if(locale == 0) return;

      this.resetData();

      if(!this.locale) {

        let rq2 = this.route.params.switchMap( (params: Params) => {

          this.article = null

          return this.articleRequestService.getArticle(params['slug'], params['locale'])
        }).subscribe( (response: any) => {
          this.article = response

          this.available_languages = response.available_languages.filter( obj => obj.slug !== locale)
        });

        this.subs.add(rq2);
      }

      this.updateMostViewedArticles();

      this.updateArticlesAndLatestArticles();

      this.locale = locale;
    })

    this.subs.add(rq1);
  }

  ngOnDestroy()
  {
    this.subs.unsubscribe()
  }

  changeLocale(locale: string)
  {
    return this.helpersService.changeLocale(locale)
  }

  updateMostViewedArticles()
  {
    this.most_viewed_articles = null

    this.subs.add(
      this.cacheService.get(`${this.locale}.most_viewed_articles`, this.articleRequestService.makeGetRequest('article.most-viewed'))
                                .subscribe( response => this.most_viewed_articles = response)
    );
  }

  updateArticlesAndLatestArticles()
  {
    this.latest_articles = null

    this.subs.add(
      this.cacheService.get(`${this.locale}.latest_article`, this.articleRequestService.makeGetRequest('article.latest'))
                                .subscribe( response => this.latest_articles = response)
    );

  }

  resetData()
  {
    this.article = null
    this.most_viewed_articles = null
    this.latest_articles = null
    this.available_languages = null
  }
}
