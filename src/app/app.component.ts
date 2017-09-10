import { Component, OnInit } from '@angular/core';

import { PublicRequestService }  from './request-services/public-request.service'

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
  ){
      this.locale = publicRequest.getLocale()
  }

  ngOnInit() {

    this.publicRequest.getMenus().subscribe(response => this.menus = response)
    this.publicRequest.getLanguages().subscribe(response => this.languages = response)
  }

  getLocale()
  {
    return this.publicRequest.getLocale()
  }

  setLocale(locale: string)
  {
    window.location.reload()

    return this.publicRequest.setLocale(locale)
  }
}
