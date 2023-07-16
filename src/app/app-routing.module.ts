import { NgModule } from '@angular/core'
import { Routes } from '@angular/router'
import { NativeScriptRouterModule } from '@nativescript/angular'

import { ItemsComponent } from './item/items.component'
import { ItemDetailComponent } from './item/item-detail.component'
import { ItemColumnsComponent } from './item/item-columns.component'

const routes: Routes = [
  /**
   * You can comment/uncomment different landing pages to view
   */
  // View swipable setup
  // { path: '', redirectTo: '/items', pathMatch: 'full' },
  // View column/list setup
  { path: '', redirectTo: '/item-columns', pathMatch: 'full' },

  { path: 'items', component: ItemsComponent },
  { path: 'item/:id', component: ItemDetailComponent },
  { path: 'item-columns', component: ItemColumnsComponent },
]

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule],
})
export class AppRoutingModule {}
