import { AfterViewChecked, Component, ViewChild, ViewChildren, AfterViewInit, QueryList, Renderer2, ElementRef, HostListener } from '@angular/core';
import { TabComponent } from './tabs/tab/tab.component';
import { TabsComponent } from './tabs/tabs/tabs.component';
import { filter, map } from 'rxjs/operators';

const ACTIVE_CLASS = 'tabs__title--active';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements AfterViewInit, AfterViewChecked {
  @ViewChild(TabsComponent, { static: false, read: ElementRef }) tabsElement: ElementRef;
  @ViewChildren(TabComponent, { read: ElementRef }) tabElements: QueryList<ElementRef>;

  @HostListener('click', ['$event.target']) selectTab(element: HTMLElement) {
    if ((element && element.tagName).toLocaleLowerCase() === 'tab-title') {
      const numOfTab: number = Number(element.firstElementChild && element.firstElementChild.innerHTML);
      this.changeSelectedTab(element.parentElement, numOfTab);
    } 
  }

  public tabs = [ 1, 2 ];
  public selectedTab: number = 1;
  
  private selecteTabElement: HTMLElement;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.selecteTabElement = this.tabElements.first.nativeElement;
    this.renderer
      .addClass(this.selecteTabElement, ACTIVE_CLASS);
    this.renderer
      .addClass(this.tabsElement.nativeElement, 'tabs__titles');
    this.tabElements.changes.pipe(
      filter((changes: QueryList<ElementRef>) => changes.length < this.selectedTab),
      map((changes: QueryList<ElementRef>) => changes.first),
    ).subscribe((tab: HTMLElement) => this.changeSelectedTab(tab, 1));
  }

  ngAfterViewChecked() {
    // const first: ElementRef = this.tabElements.first;
    // const last: ElementRef = this.tabElements.last;
  }

  public dec() {
    this.tabs = this.tabs.slice(0, -1);
  }

  public inc() {
    this.tabs = [ ...this.tabs, (this.tabs.length + 1) ];
  }

  private changeSelectedTab(tabElement: HTMLElement, numOfTab: number): void {
    this.renderer.removeClass(this.selecteTabElement, ACTIVE_CLASS);
    this.renderer.addClass(tabElement, ACTIVE_CLASS);
    this.selecteTabElement = tabElement;
    this.selectedTab = numOfTab;
  }
}
