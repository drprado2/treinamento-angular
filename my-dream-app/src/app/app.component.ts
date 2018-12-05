import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {IndexPageComponent} from "./pages/index-page/index-page.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private location : Location,
              private activeRoute : ActivatedRoute){}

  onDeactivate($event: any) {
    console.log('Deactive', $event)
  }

  onActivate($event: any) {
    console.log('Active', $event)
    if(!localStorage.getItem('jwt') && this.location.path() !== '/login')
    {
      this.location.go('/login');
    }
  }
}
