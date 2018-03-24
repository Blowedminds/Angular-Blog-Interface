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

  get isPageReady()
  {
    return this.menus && this.languages && this.locale;
  }

  constructor() { }

  ngOnInit() { }

  toggle(dropdown: any)
  {
    dropdown.classList.toggle('is-active')
  }

}
