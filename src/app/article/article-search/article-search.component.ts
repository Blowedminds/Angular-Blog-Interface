import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { ArticleRequestService }   from '../../request-services/article-request.service'

import { ApiService } from '../../api.service'
import { GlobalDataService } from '../../system/global-data/global-data.service'

import { Subscription } from 'rxjs'
import { Subject }           from 'rxjs/Subject';
import { Observable }        from 'rxjs/Observable';

@Component({
  selector: 'app-article-search',
  templateUrl: './article-search.component.html',
  styleUrls: ['./article-search.component.css']
})
export class ArticleSearchComponent implements OnInit {

  search_result: any

  constructor(
    private articleRequest: ArticleRequestService,
    private api: ApiService,
    private route: ActivatedRoute,
    private globalDataService: GlobalDataService
  ) { }

  ngOnInit() {
    let rq2 = this.route.params.switchMap( (params: Params) => this.articleRequest.getArticleSearch(params['q']))
                               .subscribe( response => this.search_result = response)
  }

}
