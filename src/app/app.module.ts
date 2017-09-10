import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing/app-routing.module';

import { AppComponent } from './app.component';

import { MainRequestService } from './request-services/main-request.service'
import { ArticleRequestService }  from './request-services/article-request.service'
import { PublicRequestService }  from './request-services/public-request.service'
import { ApiService } from './api.service';

import { ArticleSingleComponent } from './article/article-single/article-single.component';
import { HomeComponent } from './home/home.component'

import {
  MdMenuModule,
  MdListModule,
  MdCardModule,
  MdTabsModule,
  MdInputModule,
  MdChipsModule,
  MdRadioModule,
  MdSelectModule,
  MdSliderModule,
  MdButtonModule,
  MdTooltipModule,
  MdSnackBarModule,
  MdSidenavModule,
  MdDatepickerModule,
  MdToolbarModule,
  MdProgressSpinnerModule,
  MdDialogModule,
  MdProgressBarModule,
  MdCheckboxModule,
} from '@angular/material';
import { AboutMeComponent } from './about-me/about-me.component';
import { PageNotFoundComponent } from './system/page-not-found/page-not-found.component';
import { RedirectComponent } from './system/redirect/redirect.component'

@NgModule({
  declarations: [
    AppComponent,
    ArticleSingleComponent,
    HomeComponent,
    AboutMeComponent,
    PageNotFoundComponent,
    RedirectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
    MdMenuModule,
    MdListModule,
    MdCardModule,
    MdTabsModule,
    MdInputModule,
    MdChipsModule,
    MdRadioModule,
    MdSelectModule,
    MdSliderModule,
    MdButtonModule,
    MdTooltipModule,
    MdSnackBarModule,
    MdSidenavModule,
    MdDatepickerModule,
    MdToolbarModule,
    MdProgressSpinnerModule,
    MdDialogModule,
    MdProgressBarModule,
    MdCheckboxModule,
  ],
  exports: [
    MdMenuModule,
    MdListModule,
    MdCardModule,
    MdTabsModule,
    MdInputModule,
    MdChipsModule,
    MdRadioModule,
    MdSelectModule,
    MdSliderModule,
    MdButtonModule,
    MdTooltipModule,
    MdSnackBarModule,
    MdSidenavModule,
    MdDatepickerModule,
    MdToolbarModule,
    MdProgressSpinnerModule,
    MdDialogModule,
    MdProgressBarModule,
    MdCheckboxModule,
  ],
  providers: [
    MainRequestService,
    ApiService,
    ArticleRequestService,
    PublicRequestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
