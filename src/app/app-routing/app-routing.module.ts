import { NgModule } from '@angular/core';
import { RouterModule, Routes }    from '@angular/router';

import { HomeComponent }  from '../home/home.component'
import { ArticleSingleComponent } from '../article/article-single/article-single.component'
import { AboutMeComponent } from '../about-me/about-me.component'

import { PageNotFoundComponent }  from '../system/page-not-found/page-not-found.component'

import { RedirectComponent }  from '../system/redirect/redirect.component'

const routes: Routes = [
  { path: "", component: RedirectComponent },
  { path: ":locale", children : [
    { path: "", component: HomeComponent},
    { path: "article/:slug", component: ArticleSingleComponent },
    { path: "about-me", component: AboutMeComponent },
  ]},

  { path: '**', component: PageNotFoundComponent }

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
