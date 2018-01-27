import { NgModule } from '@angular/core';
import { RouterModule, Routes }    from '@angular/router';

import { HomeComponent }  from '../home/home.component'
import { ArticleSingleComponent } from '../article/article-single/article-single.component'
import { ArticleCategoryComponent } from '../article/article-category/article-category.component'
import { ArticleSearchComponent } from '../article/article-search/article-search.component'
import { AboutMeComponent } from '../about-me/about-me.component'

import { PageNotFoundComponent }  from '../system/page-not-found/page-not-found.component'

import { RedirectComponent }  from '../system/redirect/redirect.component'

const routes: Routes = [
  { path: "", component: RedirectComponent },
  { path: ":locale", children : [
    { path: "", component: HomeComponent},
    { path: "article/:slug", component: ArticleSingleComponent },
    { path: "category/:category_slug", component: ArticleCategoryComponent },
    { path: "search", component: ArticleSearchComponent },
    { path: "about-dk", component: AboutMeComponent },
    { path: '**', component: PageNotFoundComponent }
  ]},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
