import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { IndexPageComponent } from './pages/index-page/index-page.component';
import { HeaderComponent } from './components/header/header.component';
import { ContentComponent } from './components/content/content.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeroComponent } from './components/hero/hero.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexPageComponent,
    HeaderComponent,
    ContentComponent,
    FooterComponent,
    HeroComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
