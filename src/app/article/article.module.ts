import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { ArticleRoutingModule } from './article-routing.module';

import { ArticleComponent } from './components/article/article.component';
import { ArticleCategoryComponent } from './components/article-category/article-category.component';
import { ArticleSearchComponent } from './components/article-search/article-search.component';
import { NavigationComponent } from './components/navigation/navigation.component';

import { ArticleRequestService } from './services/article-request.service';

@NgModule({
  declarations: [
    ArticleComponent,
    ArticleCategoryComponent,
    ArticleSearchComponent,
    NavigationComponent,
  ],
  imports: [
    ArticleRoutingModule,
    CommonModule,
    CoreModule,
    SharedModule
  ],
  providers: [
    ArticleRequestService
  ]
})
export class ArticleModule { }
