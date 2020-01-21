import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabComponent } from './tab/tab.component';
import { TabTitleComponent } from './tab-title/tab-title.component';
import { TabContentComponent } from './tab-content/tab-content.component';
import { TabsComponent } from './tabs/tabs.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TabComponent, TabTitleComponent, TabContentComponent, TabsComponent],
  exports: [TabComponent, TabTitleComponent, TabContentComponent, TabsComponent]
})
export class TabsModule { }