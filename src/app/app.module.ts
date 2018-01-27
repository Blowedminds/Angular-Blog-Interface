import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing/app-routing.module';

import { AppComponent } from './app.component';

import { MainRequestService } from './request-services/main-request.service'
import { ArticleRequestService }  from './request-services/article-request.service'
import { PublicRequestService }  from './request-services/public-request.service'
import { ApiService } from './api.service';
import { GlobalDataService } from './system/global-data/global-data.service'

import { ArticleSingleComponent } from './article/article-single/article-single.component';
import { HomeComponent } from './home/home.component'

import {
  MatMenuModule,
  MatListModule,
  MatCardModule,
  MatTabsModule,
  MatInputModule,
  MatChipsModule,
  MatRadioModule,
  MatSelectModule,
  MatSliderModule,
  MatButtonModule,
  MatTooltipModule,
  MatSnackBarModule,
  MatSidenavModule,
  MatDatepickerModule,
  MatToolbarModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatProgressBarModule,
  MatCheckboxModule,
} from '@angular/material';
import { AboutMeComponent } from './about-me/about-me.component';
import { PageNotFoundComponent } from './system/page-not-found/page-not-found.component';
import { RedirectComponent } from './system/redirect/redirect.component';
import { ArticleCategoryComponent } from './article/article-category/article-category.component';
import { ArticleSearchComponent } from './article/article-search/article-search.component'

@NgModule({
  declarations: [
    AppComponent,
    ArticleSingleComponent,
    HomeComponent,
    AboutMeComponent,
    PageNotFoundComponent,
    RedirectComponent,
    ArticleCategoryComponent,
    ArticleSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatMenuModule,
    MatListModule,
    MatCardModule,
    MatTabsModule,
    MatInputModule,
    MatChipsModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatButtonModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatDatepickerModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatProgressBarModule,
    MatCheckboxModule,
  ],
  exports: [
    MatMenuModule,
    MatListModule,
    MatCardModule,
    MatTabsModule,
    MatInputModule,
    MatChipsModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatButtonModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatDatepickerModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatProgressBarModule,
    MatCheckboxModule,
  ],
  providers: [
    MainRequestService,
    ApiService,
    ArticleRequestService,
    PublicRequestService,
    GlobalDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
