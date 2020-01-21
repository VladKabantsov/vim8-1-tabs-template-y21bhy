import { Component, ElementRef, ViewChild, Input, OnInit } from '@angular/core';

@Component({
  selector: 'tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class TabComponent implements OnInit {
  @ViewChild('tab', { static: false, read: ElementRef }) tab;
  @Input() selectedTab: boolean;
  constructor() { }

  ngOnInit() {
    console.log(this.tab)
  }
}