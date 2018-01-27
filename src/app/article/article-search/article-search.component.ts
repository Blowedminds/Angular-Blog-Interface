import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, NavigationEnd, Router  } from '@angular/router';
import { NgForm } from '@angular/forms'

import { ArticleRequestService }   from '../../request-services/article-request.service'

import { ApiService } from '../../api.service'
import { GlobalDataService } from '../../system/global-data/global-data.service'

import { Subscription, BehaviorSubject} from 'rxjs'

 @Component({
  selector: 'app-article-search',
  templateUrl: './article-search.component.html',
  styleUrls: ['./article-search.component.sass']
})
export class ArticleSearchComponent implements OnInit {

  search_results: any

  subs = new Subscription()

  query_param: BehaviorSubject<any> = new BehaviorSubject<any>("")

  query: string = ""

  locale: string = ""

  IMAGE_URL: string = "";

  constructor(
    private articleRequest: ArticleRequestService,
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private globalDataService: GlobalDataService
  ) {

    this.IMAGE_URL = this.articleRequest.IMAGE_URL + "image/"
  }

  ngOnInit() {

    let rq2 = this.api.getLocale().subscribe( locale => {
                this.locale = locale
                // this.locale = this.locale === "" ? locale : this.locale
                //
                // if(this.locale !== locale)
                //   this.search(this.query)
                //
                // this.locale = locale
              })

    let rq1 = this.route.queryParams
                .switchMap( (params: Params) => [params['q']])
                .subscribe( response => {
                                          this.search(response)

                                          this.query = response
                                        })

    this.subs.add(rq1); this.subs.add(rq2)
  }

  ngOnDestroy()
  {
    this.subs.unsubscribe()
  }

  search(query: string)
  {
    if(query === "") return

    this.search_results = null

    let rq1 = this.articleRequest.getArticleSearch(query).subscribe( response => {
                this.search_results = response
                rq1.unsubscribe()
              })
  }

  navigate(query: string)
  {
    this.api.navigate([this.articleRequest.locale + '/search'], { queryParams: { q: query}})
  }
}
