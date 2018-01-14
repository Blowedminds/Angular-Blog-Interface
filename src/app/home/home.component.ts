import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';

import timeago from 'timeago.js';

import { PublicRequestService }  from '../request-services/public-request.service'
import { ApiService } from '../api.service'
import { GlobalDataService }  from '../system/global-data/global-data.service'

import { Subscription } from 'rxjs'

declare var tns: any

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  most_viewed_article: any

  articles: any

  latest_articles: any

  IMAGE_URL: any;

  THUMB_URL: any

  timeAgoInstance: any

  locale: string

  subs = new Subscription()

  slider: any

  categories: any

  @ViewChildren('sliderRun') slider_run: QueryList<any>;

  constructor(
    private publicRequest: PublicRequestService,
    private globalDataService: GlobalDataService,
    private api: ApiService
  ) {
    this.IMAGE_URL = this.publicRequest.IMAGE_URL + "image/"

    this.THUMB_URL = this.publicRequest.IMAGE_URL + "thumb/"

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

    let rq1 = globalDataService.mostViewedArticle.subscribe( data => this.most_viewed_article = data)

    let rq2 = globalDataService.latestArticle.subscribe( data => {

      if(typeof data === "object"){

        let array = []

        let length = data.length > 5 ? 5 : data.length

        for(let i = 0; i < length; i++){
          if(typeof data[i] !== "undefined")
            array.push(data[i])
        }

        this.latest_articles = array

        this.articles = data.slice(length, data.length)
      }
    })

    let rq3 = globalDataService.categories.subscribe( data => this.categories = data)

    this.subs.add(rq1); this.subs.add(rq2); this.subs.add(rq3)
  }


  ngOnInit()
  {

    let rq1 = this.api.getLocale().subscribe( locale => {

      if(locale == 0) return

      if((this.locale != locale) && (this.locale)){

        this.most_viewed_article = null

        this.latest_articles = null

        this.slider = null
      }

      this.locale = locale

    })

    this.subs.add(rq1)
  }

  ngAfterViewInit()
  {

  }

  ngOnDestroy()
  {
    this.subs.unsubscribe()
  }

  timeAgoConvert(time: any)
  {
    return this.timeAgoInstance.format(time.slice(0, 19))
  }

  runSlider()
  {
    this.slider = tns({
                  container: '.tiny-slider',
                  items: 1,
                  slideBy: 1,
                  autoplay: true,
                  mouseDrag: true,
                  loop: false,
                  autoplayButtonOutput: false,
                  nav: false,
                  navContainer: false,
                  controlsContainer: false,
                  controls: false,
                  edgePadding: 350
                });
  }

  findCategory(category: any)
  {
    if(!category)
      return;

    return this.categories.find( obj => obj.id === category.id).name
  }

}
