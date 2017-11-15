import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { ArticleRequestService }   from '../../request-services/article-request.service'

import { ApiService } from '../../api.service'
import { GlobalDataService } from '../../system/global-data/global-data.service'

import { Subscription } from 'rxjs'

@Component({
  selector: 'app-article-category',
  templateUrl: './article-category.component.html',
  styleUrls: ['./article-category.component.css']
})
export class ArticleCategoryComponent implements OnInit {

  articles: any

  locale: string

  subs = new Subscription()

  category: any

  category_slug: string

  constructor(
    private articleRequest: ArticleRequestService,
    private route: ActivatedRoute,
    private api: ApiService,
    private globalDataService: GlobalDataService
  ) { }

  ngOnInit() {

    let rq1 = this.api.getLocale().subscribe( locale => {

       if(this.locale != locale)
         this.articles = null

       this.locale = locale

       let rq2 = this.route.params.switchMap( (param : Params) => {

                  this.category_slug = param['category_slug']

                  let rq3 = this.globalDataService.categories.subscribe( categories =>
                    this.category = categories ? categories.find( obj => obj.slug === param['category_slug']) : null
                  )

                  this.subs.add(rq3)

                  return this.articleRequest.getArticlesByCategory(param['category_slug'])
                })
                 .subscribe( response => this.articles = response )

       this.subs.add(rq2)
     })

     this.subs.add(rq1)
  }

  ngOnDestroy(){
    this.subs.unsubscribe()
  }

}
