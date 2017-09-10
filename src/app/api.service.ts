import { Injectable } from '@angular/core';
import { ActivatedRoute, Params }  from '@angular/router';

import { Router }            from '@angular/router';

@Injectable()
export class ApiService {

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  getLocale()
  {
    let locale: string = localStorage.getItem('locale')

    if(!locale) locale = this.setLocale('tr')

    return locale
  }

  setLocale(locale: string)
  {
    localStorage.setItem('locale', locale)

    return locale
  }

  navigate(link: Array<any>)
  {
    return this.router.navigate(link);
  }
}
