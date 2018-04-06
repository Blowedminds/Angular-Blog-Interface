import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { ArticleRequestService }   from '../../services/article-request.service'

import { HelpersService, CacheService } from '../../imports'

import { Subscription } from 'rxjs'
import { switchMap } from 'rxjs/operators';

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
    private articleRequestService: ArticleRequestService,
    private route: ActivatedRoute,
    private helpersService: HelpersService,
    private cacheService: CacheService
  ) { }

  ngOnInit() {

    let rq1 = this.helpersService.listenLocale().subscribe( locale => {

       if(this.locale != locale)
         this.articles = null

       this.locale = locale

       let rq2 = this.route.params.pipe(switchMap( (param : Params) => {

          this.category_slug = param['category_slug']

          let rq3 = this.cacheService.get('categories', this.articleRequestService.makeGetRequest('user.categories'))
            .subscribe( categories =>
              this.category = categories ? categories.find( obj => obj.slug === param['category_slug']) : null
            )

          this.subs.add(rq3)

          return this.articleRequestService.getArticlesByCategory(param['category_slug'])
        }))
         .subscribe( response => this.articles = response )

       this.subs.add(rq2)
     })

     this.subs.add(rq1)
  }

  ngOnDestroy(){
    this.subs.unsubscribe()
  }

}
