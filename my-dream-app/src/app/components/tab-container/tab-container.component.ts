import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChildren, OnChanges, OnInit,
  QueryList, SimpleChanges
} from '@angular/core';
import {TabComponent} from "../tab/tab.component";

@Component({
  selector: 'app-tab-container',
  templateUrl: './tab-container.component.html',
  styleUrls: ['./tab-container.component.scss']
})
export class TabContainerComponent implements OnInit, AfterContentInit {

  @ContentChildren(TabComponent) tabsComponent : QueryList<TabComponent>;
  private template : any = '';
  private tabs: TabComponent[] = [];

  constructor() { }

  ngOnInit() {

  }

  ngAfterContentInit(): void {
    this.setFirstTemplate();
    this.tabs = this.tabsComponent.toArray();
  }

  setFirstTemplate(){
    let tabActive = this.tabsComponent.find(t => t.isActive);
    if(!tabActive){
      tabActive = this.tabsComponent.first;
      tabActive.isActive = true;
    }
    this.template = tabActive.tabTemplate;
  }

  onTabClick(tab: TabComponent){
    this.tabs.forEach(t => t.isActive = false);
    tab.isActive = true;
    this.template = tab.tabTemplate;
  }

  resetTabs(){
    this.setFirstTemplate();
  }

  setTabActive(index: number) {
    this.tabs.forEach(t => t.isActive = false);
    this.tabs[index].isActive = true;
    this.template = this.tabs[index].tabTemplate;
  }
}
