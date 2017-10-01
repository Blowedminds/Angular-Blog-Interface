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

      if(this.locale != locale || (typeof this.locale === "undefined" && typeof locale === "undefined")){

        api.setLocale(locale)


      }
    })

  }

  ngOnInit() {

    this.api.getLocale().subscribe( locale => {
      if(locale == 0) return

      let rq1 = this.publicRequest.getMenus().subscribe(response => {
        this.menus = response

        rq1.unsubscribe()
      })

      let rq3 = this.articleRequest.getLatest().subscribe( response => {

        this.globalDataService.latestArticle = response

        rq3.unsubscribe()
      })

      let rq2 = this.articleRequest.getMostViewed().subscribe( response => {

        this.globalDataService.mostViewedArticle = response

        rq2.unsubscribe()
      })

      let rq4 = this.publicRequest.getCategories().subscribe( response => {

        this.globalDataService.categories = response

        rq4.unsubscribe()
      })

      this.locale = locale
    })


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
