import { Component, OnInit } from '@angular/core';

import timeago from 'timeago.js';

import { PublicRequestService }  from '../request-services/public-request.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  data: any;

  IMAGE_URL: any;

  timeAgoInstance: any

  constructor(
    private publicRequest: PublicRequestService,
  ) {
    this.IMAGE_URL = this.publicRequest.IMAGE_URL + "image/"

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
  }


  ngOnInit() {

    this.publicRequest.getHomeData().subscribe(response => this.data = response)
  }

  timeAgoConvert(time: any)
  {
    return this.timeAgoInstance.format(time.slice(0, 19))
  }

}
