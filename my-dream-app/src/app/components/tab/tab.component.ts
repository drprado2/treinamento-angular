import {Component, Input, OnInit, ViewChild, ViewContainerRef} from '@angular/core';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit {

  @ViewChild('tab') tabTemplate;
  @Input() isActive : boolean = false;
  @Input() tabName: string = 'Tab Default';

  constructor() { }

  ngOnInit() {}
}
