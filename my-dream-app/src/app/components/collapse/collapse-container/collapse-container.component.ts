import { Component,
  OnInit,
  ContentChild,
  AfterViewInit,
  AfterContentInit,
  ViewChild,
  AfterViewChecked,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef} from '@angular/core';
import { CollapseHeaderComponent } from '../collapse-header/collapse-header.component';
import { CollapseContentComponent } from '../collapse-content/collapse-content.component';

@Component({
  selector: 'app-collapse-container',
  templateUrl: './collapse-container.component.html',
  styleUrls: ['./collapse-container.component.scss']
})
export class CollapseContainerComponent implements OnInit, AfterContentInit, AfterViewInit, AfterViewChecked {
  headerTemplate: any = '';
  contentTemplate: any = '';
  @ContentChild(CollapseHeaderComponent) collapseHeader: CollapseHeaderComponent;
  @ContentChild(CollapseContentComponent) collapseContent: CollapseContentComponent;
  @ViewChild('content') contentElement;
  @ViewChild('header') headerElement;
  @ViewChild('container') containerElement;
  containerHeight = 0;
  private headerHeight;
  private contentHeight;
  isOpen: Boolean = false;

  constructor() { }

  ngOnInit() {
       setTimeout(() => {
        this.containerElement.nativeElement.style.transition = 'height .33s ease-in-out';
       } , 300);
  }

  ngAfterContentInit(): void {
    this.headerTemplate = this.collapseHeader.template;
    this.contentTemplate = this.collapseContent.template;
  }

  ngAfterViewInit(): void {
     this.headerHeight = this.headerElement.nativeElement.clientHeight;
     this.contentHeight = this.contentElement.nativeElement.clientHeight;
     setTimeout(() => {
      this.containerHeight = this.headerHeight;
     } , 0);
  }
  ngAfterViewChecked(): void {
  }

  onHeaderClick() {
    this.isOpen = !this.isOpen;
    this.containerHeight =
      this.isOpen ? this.containerHeight + this.contentHeight : this.containerHeight - this.contentHeight;
  }
}
