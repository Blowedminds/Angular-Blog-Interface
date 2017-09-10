import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { ArticleRequestService }  from '../../request-services/article-request.service'
import { ApiService }  from '../../api.service'

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

  IMAGE_URL: any

  constructor(
    private articleRequest: ArticleRequestService,
    private route: ActivatedRoute,
    private api: ApiService
  ) {
    this.IMAGE_URL = articleRequest.IMAGE_URL + "image/"

  }

  getLocale()
  {
    return this.api.getLocale()
  }


  ngOnInit() {

    this.route.params.switchMap( (params: Params) => {
      this.data = null;
      return this.articleRequest.getArticleSingle(params['slug'])
    }).subscribe(response => {

      this.data = response

      this.available_languages = response.available_languages.filter( obj => obj.slug !== this.api.getLocale())
    })

    this.articleRequest.getMostViewed().subscribe(response => this.most_viewed = response)

    this.articleRequest.getLatest().subscribe(response => this.latest = response)

  }

  changeLocale(locale: string)
  {
    this.api.setLocale(locale)

    this.data = this.available_languages = null

    this.route.params.switchMap( (params: Params) => this.articleRequest.getArticleSingle(params['slug'])).subscribe(response => {

      this.data = response

      this.available_languages = response.available_languages.filter( obj => obj.slug !== this.api.getLocale())
    })
  }

}
