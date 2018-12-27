import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ContentComponent } from './components/content/content.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeroComponent } from './components/hero/hero.component';
import { HeroDetailComponent } from './components/hero-detail/hero-detail.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { HeroGridPageComponent } from './pages/hero-grid-page/hero-grid-page.component';
import { HeroDetailPageComponent } from './pages/hero-detail-page/hero-detail-page.component';
import { ContratarHeroPageComponent } from './pages/contratar-hero-page/contratar-hero-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { FullBackgroundImageComponent } from './components/full-background-image/full-background-image.component';
import { TabContainerComponent } from './components/tab-container/tab-container.component';
import { TabComponent } from './components/tab/tab.component';
import { ChameleonDirective } from './chameleon.directive';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { ShowErrorsInputComponent } from './components/show-errors-input/show-errors-input.component';
import { FullBackgroundVideoComponent } from './components/full-background-video/full-background-video.component';
import { InputValidationComponent } from './components/input-validation/input-validation.component';
import { LoaderComponent } from './components/loader/loader.component';
import {RouterComponent} from './components/router/router.component';
import { ModalComponent } from './components/modal/modal.component';
import { SideNavMenuComponent } from './components/side-nav-menu/side-nav-menu.component';
import { AppWrapperComponent } from './components/app-wrapper/app-wrapper.component';
import { CollapseContainerComponent } from './components/collapse/collapse-container/collapse-container.component';
import { CollapseHeaderComponent } from './components/collapse/collapse-header/collapse-header.component';
import { CollapseContentComponent } from './components/collapse/collapse-content/collapse-content.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContentComponent,
    FooterComponent,
    HeroComponent,
    HeroDetailComponent,
    LoginPageComponent,
    HeroGridPageComponent,
    HeroDetailPageComponent,
    ContratarHeroPageComponent,
    NotFoundPageComponent,
    FullBackgroundImageComponent,
    TabContainerComponent,
    TabComponent,
    DashboardPageComponent,
    ChameleonDirective,
    LoginFormComponent,
    ShowErrorsInputComponent,
    FullBackgroundVideoComponent,
    InputValidationComponent,
    LoaderComponent,
    RouterComponent,
    ModalComponent,
    SideNavMenuComponent,
    AppWrapperComponent,
    CollapseContainerComponent,
    CollapseHeaderComponent,
    CollapseContentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
