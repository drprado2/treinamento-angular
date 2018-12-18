import {ActivatedRoute, Router} from "@angular/router";
import {Component, OnInit} from "@angular/core";
import { Location } from '@angular/common';

@Component({
  selector: 'app-router',
  templateUrl: './router.component.html',
  styleUrls: ['./router.component.scss']
})
export class RouterComponent implements OnInit {

  private isAuthenticated: boolean = !!localStorage.getItem('jwt');

  constructor(
    private location: Location,
    private activeRoute : ActivatedRoute,
    private router: Router){}

  ngOnInit() {
  }

  onActivate($event: any) {
    this.isAuthenticated = !!localStorage.getItem('jwt');
    if(!localStorage.getItem('jwt') && this.location.path() !== '/login'){
      this.router.navigate(['/login']);
    }
    if(localStorage.getItem('jwt') && this.location.path() === '/login'){
      this.router.navigate(['/dashboard']);
    }
  }
}
