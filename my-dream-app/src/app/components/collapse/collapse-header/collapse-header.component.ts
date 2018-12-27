import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-collapse-header',
  templateUrl: './collapse-header.component.html',
  styleUrls: ['./collapse-header.component.scss']
})
export class CollapseHeaderComponent implements OnInit {

  @ViewChild('collapseHeader') template;

  constructor() { }

  ngOnInit() {
  }

}
