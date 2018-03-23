import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArticleCategoryComponent } from './components/article-category/article-category.component';
import { ArticleSearchComponent } from './components/article-search/article-search.component';
import { ArticleComponent } from './components/article/article.component';
import { NavigationComponent } from './components/navigation/navigation.component';

const routes: Routes = [
  { path: ":locale", component: NavigationComponent, children: [
      { path: "article/:slug", component: ArticleComponent },
      { path: "category/:category_slug", component: ArticleCategoryComponent },
      { path: "search", component: ArticleSearchComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ArticleRoutingModule { }
