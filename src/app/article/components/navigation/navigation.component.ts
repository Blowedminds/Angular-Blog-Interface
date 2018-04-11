import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params, NavigationEnd } from '@angular/router';

import { MainNavigationComponent, MainRequestService, CacheService, HelpersService } from '../../imports';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navigation',
  templateUrl: '../../../shared/components/main-navigation/main-navigation.component.html',
  styleUrls: ['../../../shared/components/main-navigation/main-navigation.component.sass']
})
export class NavigationComponent extends MainNavigationComponent {

  constructor(
    private mainRequestService: MainRequestService,
    private helpersService: HelpersService,
    private cacheService: CacheService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    super();

    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(e => {

      const locale = this.activatedRoute.root.firstChild.snapshot.params['locale'];

      if (this.locale !== locale || (typeof this.locale === 'undefined' && typeof locale === 'undefined')) {

        this.helpersService.setLocale(locale);
      }

    });
  }

  ngOnInit() {

    this.helpersService.listenLocale().subscribe(locale => {

      if (!locale) {

        return;
      }

      this.cacheService.get(`${locale}.menus`, this.mainRequestService.makeGetRequest('user.menus'))
        .subscribe(response => this.menus = response);

      this.locale = locale;
    });


    this.cacheService.get('languages', this.mainRequestService.makeGetRequest('user.languages'))
      .subscribe(response => {

        if (!response.find(language => language.slug === this.locale)) {
          this.helpersService.setLocale(response[0].slug);
        }

        this.languages = response;

      });
  }

  changeLocale(locale: string) {
    return this.helpersService.changeLocale(locale);
  }

  localizedUrl(url: string) {
    return '/' + this.helpersService.getLocale() + url;
  }

  search(query) {
    this.helpersService.navigate([this.helpersService.getLocale() + '/search'], {
      queryParams: {
        'q': query
      }
    });
  }
}
