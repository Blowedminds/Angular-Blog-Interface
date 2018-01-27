import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { ArticleRequestService }  from '../../request-services/article-request.service'
import { ApiService }  from '../../api.service'
import { GlobalDataService }  from '../../system/global-data/global-data.service'

import { Subscription } from 'rxjs'

@Component({
  selector: 'app-article-single',
  templateUrl: './article-single.component.html',
  styleUrls: ['./article-single.component.sass']
})
export class ArticleSingleComponent implements OnInit {

  data: any;

  available_languages: any

  latest: any

  most_viewed: any

  AUTHOR_IMAGE_URL: string

  IMAGE_URL: string

  locale: string

  slug: string

  subs = new Subscription()

  constructor(
    private articleRequest: ArticleRequestService,
    private route: ActivatedRoute,
    private globalDataService: GlobalDataService,
    private api: ApiService
  ) {
    this.IMAGE_URL = articleRequest.IMAGE_URL + "image/"

    this.AUTHOR_IMAGE_URL = articleRequest.MAIN_URL + "images/author/"
  }

  ngOnInit() {

    let rq1 = this.api.getLocale().subscribe( locale => {
      if(locale == 0) return
      this.data = null
      this.most_viewed = null
      this.latest = null
      this.available_languages = null

      if(!this.locale){
        let rq2 = this.route.params.switchMap( (params: Params) => {
          this.data = null

          return this.articleRequest.getArticleSingle(params['slug'], params['locale'])
        }).subscribe( response => {
          this.data = response

          this.available_languages = response.available_languages.filter( obj => obj.slug !== locale)
        })
      }

      let rq3 = this.globalDataService.mostViewedArticle.subscribe(response => {
        this.most_viewed = response
        if(rq3) rq3.unsubscribe()
      })

      let rq4 = this.globalDataService.latestArticle.subscribe(response => {
        this.latest = response
        if(rq4) rq4.unsubscribe();
      })

      this.locale = locale

      this.subs.add(rq3); this.subs.add(rq4)
    })

    this.subs.add(rq1);
  }

  ngOnDestroy()
  {
    this.subs.unsubscribe()
  }

  changeLocale(locale: string)
  {
    return this.api.changeLocale(locale)
  }

}
