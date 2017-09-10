import { Component, OnInit } from '@angular/core';

import { PublicRequestService }  from '../request-services/public-request.service'

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.sass']
})
export class AboutMeComponent implements OnInit {

  data: any

  constructor(
    private publicRequest: PublicRequestService,
  ) { }

  ngOnInit() {

    this.publicRequest.getAboutMe().subscribe(response => this.data = response)
  }

}
