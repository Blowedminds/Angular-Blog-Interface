import { Component, OnInit } from '@angular/core';
import { Params, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.sass']
})
export class MainNavigationComponent implements OnInit {

  menus: any = [];

  languages: any;

  locale: string;

  mainRequestService: any;
  helpersService: any;
  cacheService: any;
  activatedRoute: any;
  router: any;

  get isPageReady()
  {
    return this.menus && this.languages && this.locale;
  }

  constructor() { }

  ngOnInit() { }

}
