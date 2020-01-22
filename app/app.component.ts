import { AfterViewChecked, Component, ViewChild, ViewChildren, AfterViewInit, QueryList, Renderer2, ElementRef, HostListener, OnDestroy } from '@angular/core';
import { TabComponent } from './tabs/tab/tab.component';
import { TabsComponent } from './tabs/tabs/tabs.component';
import { filter, map, tap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

const ACTIVE_CLASS = 'tabs__title--active';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements AfterViewInit, OnDestroy {
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
  private ngOnDestroy$: Subject<void> = new Subject<void>();

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.selecteTabElement = this.tabElements.first.nativeElement;
    this.renderer
      .addClass(this.selecteTabElement, ACTIVE_CLASS);
    this.renderer
      .addClass(this.tabsElement.nativeElement, 'tabs__titles');
    this.tabElements.changes.pipe(
      tap((c) => console.log(c.length)),
      filter((changes: QueryList<ElementRef>) => {
        const selectedTabWasRemoved: boolean = (changes.length < this.selectedTab);
        const tabsArrayIsNotEmpty: boolean = !!changes.length;
        const singleTab: boolean = changes.length === 1;

        return (selectedTabWasRemoved && tabsArrayIsNotEmpty) || singleTab;
      }),
      map((changes: QueryList<ElementRef>) => changes.first && changes.first.nativeElement),
      takeUntil(this.ngOnDestroy$),
    ).subscribe((tab: HTMLElement) => this.changeSelectedTab(tab, 1));
  }

  ngOnDestroy() {
    this.ngOnDestroy$.next();
    this.ngOnDestroy$.complete();
  }

  public dec() {
    this.tabs = this.tabs.slice(0, -1);
  }

  public inc() {
    this.tabs = [ ...this.tabs, (this.tabs.length + 1) ];
  }

  private changeSelectedTab(tabElement: HTMLElement, numOfTab: number): void {
    this.renderer.removeClass(this.selecteTabElement, ACTIVE_CLASS);
    this.selectedTab = numOfTab;
    this.renderer.addClass(tabElement, ACTIVE_CLASS);
    this.selecteTabElement = tabElement;
    
  }
}
