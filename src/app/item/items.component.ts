import { Component, OnInit } from "@angular/core";
import { CollectionView } from "@nstudio/ui-collectionview";
import { Item } from "./item";
import { ItemService } from "./item.service";
import { createLayout } from "../config/collectionview-layout";
import { ObservableArray } from "@nativescript/core";

@Component({
  selector: "ns-items",
  templateUrl: "./items.component.html",
})
export class ItemsComponent implements OnInit {
  items: ObservableArray<Item>;
  collectionView: CollectionView;

  constructor(private itemService: ItemService) {
    CollectionView.registerLayoutStyle("swipe", {
      createLayout,
    });
  }

  ngOnInit(): void {
    this.items = new ObservableArray(this.itemService.getItems());
  }

  itemTap(args) {
    console.log("itemTap:", args.item);
  }

  loaded(args) {
    this.collectionView = args.object;
  }

  templateSelector = (item: any) => {
    return "default";
  };
}
