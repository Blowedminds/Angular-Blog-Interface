import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, NavigationEnd, Router } from '@angular/router';

import { PublicRequestService }  from './request-services/public-request.service'
import { ApiService } from './api.service'
import { ArticleRequestService }  from './request-services/article-request.service'
import { GlobalDataService }  from './system/global-data/global-data.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  menus: any

  languages: any

  locale: string

  constructor(
    private publicRequest: PublicRequestService,
    private api: ApiService,
    private articleRequest: ArticleRequestService,
    private globalDataService: GlobalDataService,
    private route: ActivatedRoute,
    private router: Router
  ){
    this.router.events.filter( e => e instanceof NavigationEnd).subscribe( e => {
      let locale = route.root.firstChild.snapshot.params['locale']

      if(this.locale != locale){

        api.setLocale(locale)

        let rq1 = articleRequest.getLatest().subscribe( response => {

          globalDataService.latestArticle = response

          rq1.unsubscribe()
        })

        let rq2 = articleRequest.getMostViewed().subscribe( response => {

          globalDataService.mostViewedArticle = response

          rq2.unsubscribe()
        })
      }
    })

  }

  ngOnInit() {

    this.api.getLocale().subscribe( locale => this.locale = locale)

    this.publicRequest.getMenus().subscribe(response => this.menus = response)
    this.publicRequest.getLanguages().subscribe(response => this.languages = response)
  }

  getLocale()
  {
    return this.locale
  }

  changeLocale(locale: string)
  {
    return this.api.changeLocale(locale)
  }
}
