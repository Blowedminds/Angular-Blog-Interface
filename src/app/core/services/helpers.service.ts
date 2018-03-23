import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, BehaviorSubject }     from 'rxjs';

@Injectable()
export class HelpersService {

  public locale = new BehaviorSubject<any>(0)

  constructor(private router: Router) { }

  getLocale()
  {
    return this.locale.getValue();
  }

  listenLocale()
  {
    return this.locale.asObservable();
  }

  setLocale(locale: string)
  {
    if(!locale) {
      this.changeLocale('tr')

      return console.error('Locale is not defined')
    }

    this.locale.next(locale)

    return locale
  }

  changeLocale(locale)
  {
    let url : string = this.router.url

    url = url.slice(3)

    this.router.navigateByUrl(locale + url)
  }

  navigate(link: Array<any>, options: any = {})
  {
    return this.router.navigate(link, options);
  }
  
  navigateByUrl(link: string)
  {
    return this.router.navigateByUrl(link);
  }
}
