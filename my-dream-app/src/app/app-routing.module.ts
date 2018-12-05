import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IndexPageComponent} from "./pages/index-page/index-page.component";
import {HeroDetailComponent} from "./components/hero-detail/hero-detail.component";

const routes: Routes = [
  { path: 'home', component: IndexPageComponent },
  { path: 'teste', component: IndexPageComponent },
  { path: 'login', component: IndexPageComponent },
  { path: '', redirectTo: '/teste', pathMatch: 'full' },
  { path: '**',  component: HeroDetailComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
