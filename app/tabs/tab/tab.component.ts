import { Component, ElementRef, ViewChild, Input } from '@angular/core';

@Component({
  selector: 'tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class TabComponent {
  @ViewChild('tab', { static: true, read: ElementRef }) tab;
  @Input() selectedTab: boolean;
  constructor() { }
}