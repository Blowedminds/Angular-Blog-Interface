import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs'

import { HomeRequestService } from '../../services/home-request.service';
import { HelpersService, CacheService } from '../../imports';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit, OnDestroy {

  sections: any;

  IMAGE_URL: any;

  THUMB_URL: any;

  locale: string;

  subs: Subscription = new Subscription();

  get isPageReady()
  {
    return !!this.sections;
  }

  constructor(
    private homeRequestService: HomeRequestService,
    private cacheService: CacheService,
    private helpersService: HelpersService
  )
  {
    this.IMAGE_URL = this.homeRequestService.makeUrl('image.image');

    this.THUMB_URL = this.homeRequestService.makeUrl('image.thumb');
  }

  ngOnInit()
  {
    let rq1 = this.helpersService.listenLocale().subscribe( locale => {

      if(this.locale != locale && locale)
        this.updateContents(locale);
    });

    this.subs.add(rq1);
  }

  ngOnDestroy()
  {
    this.subs.unsubscribe();
  }

  updateContents(locale: string)
  {
    this.locale = locale;

    this.updateSections(locale);
  }

  updateSections(locale: string)
  {
    this.sections = null;

    let rq1 = this.cacheService.get(`${locale}.sections`, this.homeRequestService.getSections())
                                    .subscribe(response => this.sections = response);

    this.subs.add(rq1);
  }
}
