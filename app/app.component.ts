import { AfterViewChecked, Component, ViewChild, ViewChildren, AfterViewInit, QueryList, Renderer2, ElementRef } from '@angular/core';
import { TabComponent } from './tabs/tab/tab.component';
import { TabsComponent } from './tabs/tabs/tabs.component';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements AfterViewInit, AfterViewChecked {
  @ViewChild(TabsComponent, { static: false, read: ElementRef }) tabsElement: ElementRef;
  @ViewChildren(TabComponent) tabComponents: QueryList<TabComponent>;
  @ViewChildren(TabComponent, { read: ElementRef }) tabElements: QueryList<ElementRef>;
  public tabs = [ 1, 2 ];

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.renderer
      .addClass(this.tabElements.first.nativeElement, 'tabs__title--active');
    this.renderer
      .addClass(this.tabsElement.nativeElement, 'tabs__titles');
  }

  ngAfterViewChecked() {
    const first: ElementRef = this.tabElements.first;
    const last: ElementRef = this.tabElements.last;
  }

  public dec() {
    this.tabs = this.tabs.slice(0, -1);
  }

  public inc() {
    this.tabs = [ ...this.tabs, (this.tabs.length + 1) ];
  }
}
