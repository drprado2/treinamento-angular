import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabComponent implements OnInit {

  @ViewChild('tab') tabTemplate;
  @Input() isActive : boolean = false;
  @Input() tabName: string = 'Tab Default';

  constructor() { }

  ngOnInit() {}
}
