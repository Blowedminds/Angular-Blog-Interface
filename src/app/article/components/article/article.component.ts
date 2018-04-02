import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { ArticleRequestService }  from '../../services/article-request.service'
import { HelpersService, CacheService }  from '../../imports'
import { environment } from '../../../../environments/environment';

import { Subscription } from 'rxjs'

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.sass']
})
export class ArticleComponent implements OnInit, OnDestroy {

  article: any;

  subs: Subscription = new Subscription();

  AUTHOR_IMAGE_URL: string;

  DISCUSS_URL: string;

  IMAGE_URL: string;

  locale: string;

  slug: string;

  get isPageReady()
  {
    return this.article;
  }

  constructor(
      private articleRequestService: ArticleRequestService,
      private cacheService: CacheService,
      private helpersService: HelpersService,
      private route: ActivatedRoute
  )
  {
      this.IMAGE_URL = articleRequestService.makeUrl('image.image');

      this.AUTHOR_IMAGE_URL = articleRequestService.makeUrl('public.image.author');

      this.DISCUSS_URL = environment.discussUrl;
  }

  ngOnInit() {

    let rq1 = this.helpersService.listenLocale().subscribe( locale => {

      if(!this.locale && locale != 0) {

        let rq2 = this.route.params.switchMap( (params: Params) => {

          this.article = null

          return this.articleRequestService.getArticle(params['slug'], params['locale'])
        }).subscribe( (response: any) => this.article = response);

        this.subs.add(rq2);
      }
    });

    this.subs.add(rq1);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
