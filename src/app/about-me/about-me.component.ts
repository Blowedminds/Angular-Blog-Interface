import { Component, OnInit } from '@angular/core';

import { PublicRequestService }  from '../request-services/public-request.service'

import { ApiService } from '../api.service'

import { Subscription } from 'rxjs'

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.sass']
})
export class AboutMeComponent implements OnInit {

  data: any

  subs = new Subscription()

  locale: string

  constructor(
    private publicRequest: PublicRequestService,
    private api: ApiService
  ) { }

  ngOnInit() {

    let rq1 = this.api.getLocale().subscribe(locale => {
      if(locale == 0) return
      this.locale = locale

      this.data = null

      let rq2 = this.publicRequest.getAboutMe().subscribe(response => this.data = response)

      this.subs.add(rq2)
    })

    this.subs.add(rq1)
  }

  ngOnDestroy()
  {
    this.subs.unsubscribe()
  }

}
