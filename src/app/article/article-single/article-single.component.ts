import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { ArticleRequestService }  from '../../request-services/article-request.service'
import { ApiService }  from '../../api.service'

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

  IMAGE_URL: any

  locale: string

  slug: string

  subs = new Subscription()

  i = 0

  constructor(
    private articleRequest: ArticleRequestService,
    private route: ActivatedRoute,
    private api: ApiService
  ) {
    this.IMAGE_URL = articleRequest.IMAGE_URL + "image/"

  }

  ngOnInit() {


    let rq1 = this.api.getLocale().subscribe( locale => {

      this.data = null
      this.most_viewed = null
      this.latest = null

      if(!this.locale){
        let rq2 = this.route.params.switchMap( (params: Params) => {
          this.data = null
          console.log(params['locale'], 'test')
          return this.articleRequest.getArticleSingle(params['slug'], params['locale'])
        }).subscribe( response => {
          this.data = response

          this.available_languages = response.available_languages.filter( obj => obj.slug !== locale)
        })
      }

      /*let rq2 = this.route.params.switchMap( (params: Params) => {
        //if(this.slug == params['slug']) return ['observable'];

        this.data = null
        this.i += 1

        console.log('count', this.i)
        this.slug = params['slug']

        return this.articleRequest.getArticleSingle(params['slug'])
      }).subscribe( response => {
        console.log(response, 1)
        if(response == 'observable'){

          console.log('observable', 2)

        }else{

          console.log('switchMap', 3)
          this.data = response

          this.available_languages = response.available_languages.filter( obj => obj.slug !== locale)
        }
      })
*/
        //this.subs.add(rq2)

      let rq3 = this.articleRequest.getMostViewed().subscribe(response => {
        this.most_viewed = response
        rq3.unsubscribe()
      })

      let rq4 = this.articleRequest.getLatest().subscribe(response => {
        this.latest = response
        rq4.unsubscribe();
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
