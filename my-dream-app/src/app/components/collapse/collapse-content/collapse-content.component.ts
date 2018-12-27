import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-collapse-content',
  templateUrl: './collapse-content.component.html',
  styleUrls: ['./collapse-content.component.scss']
})
export class CollapseContentComponent implements OnInit {

  @ViewChild('collapseContent') template;

  constructor() { }

  ngOnInit() {
  }
}
