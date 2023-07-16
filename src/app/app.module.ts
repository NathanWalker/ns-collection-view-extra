import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import {
  NativeScriptHttpClientModule,
  NativeScriptModule,
  registerElement,
} from "@nativescript/angular";
import { CollectionViewModule } from "@nstudio/ui-collectionview/angular";
import { FontIconModule, USE_STORE } from "nativescript-fonticon/angular";
import { ImageCacheItModule } from '@triniwiz/nativescript-image-cache-it/angular';
import { PullToRefresh } from '@nativescript-community/ui-pulltorefresh';
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ItemsComponent } from "./item/items.component";
import { ItemDetailComponent } from "./item/item-detail.component";
import { fontAwesome } from "./fontawesome";
import { ItemColumnsComponent } from "./item/item-columns.component";

registerElement('PullToRefresh', () => PullToRefresh);

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    NativeScriptModule,
    NativeScriptHttpClientModule,
    AppRoutingModule,
    FontIconModule.forRoot({}),
    CollectionViewModule,
    ImageCacheItModule,
  ],
  declarations: [
    AppComponent,
    ItemsComponent,
    ItemDetailComponent,
    ItemColumnsComponent,
  ],
  providers: [
    {
      provide: USE_STORE,
      useValue: {
        fa: fontAwesome,
      },
    },
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
