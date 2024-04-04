import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationModule } from './navigation/navigation.module';
import { FooterModule } from './footer/footer.module';
import { DestaqueModule } from './destaque/destaque.module';
import { HomeModule } from './home/home.module';
import { ContentModule } from './content/content.module';
import { HttpClientModule } from '@angular/common/http'
import { ArticleApiService } from 'src/app/shared/services/article-api.service';
import { SharedModule } from './shared/shared.module';
import { AccountModule } from './account/account.module';
import { LocalStorageModule } from './local-storage/local-storage.module';
import { AboutUsModule } from './about-us/about-us.module';
import { AlertModule } from './alert/alert.module';
import { AlertService } from './alert/alert.service';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavigationModule,
    FooterModule,
    DestaqueModule,
    HomeModule,
    ContentModule,
    HttpClientModule,
    SharedModule,
    AccountModule,
    LocalStorageModule,
    AboutUsModule,
    AlertModule
  ],
  exports: [],
  providers: [ArticleApiService, AlertService],
  bootstrap: [AppComponent]
})
export class AppModule { }
