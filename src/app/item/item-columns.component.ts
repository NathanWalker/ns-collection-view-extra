import { Component, OnInit, inject } from "@angular/core";
import { ItemsComponent } from "./items.component";
import { Subject, debounceTime, filter } from "rxjs";
import {
  CoreTypes,
  GridLayout,
  ObservableArray,
  TextField,
} from "@nativescript/core";
import { HttpClient } from "@angular/common/http";
import { Item } from "./item";
import { CollectionView } from "@nstudio/ui-collectionview";
import { applyEffects } from "../config/collectionview-layout";
import { PullToRefresh } from "@nativescript-community/ui-pulltorefresh";

@Component({
  selector: "ns-item-columns",
  templateUrl: "./item-columns.component.html",
})
export class ItemColumnsComponent implements OnInit {
  items = new ObservableArray<Item>([]);
  collectionView: CollectionView;
  colWidth = "50%";
  rowHeight = "28%";
  inputChange$: Subject<string> = new Subject();
  textField: TextField;
  searchContainer: GridLayout;
  http = inject(HttpClient);
  offset = 0;
  limit = 20;
  hasQuery = false;
  hasMore = true;
  loadingData = false;
  allPhotos: Array<Item>;

  constructor() {
    this.inputChange$
      .pipe(
        debounceTime(200),
        filter(() => !!this.textField)
      )
      .subscribe(this.search.bind(this));
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.loadingData = true;
    return new Promise<void>((resolve) => {
      this.http
        .get(
          `https://api.slingacademy.com/v1/sample-data/photos?offset=${this.offset}&limit=${this.limit}`
        )
        .subscribe((res: { photos: Array<Item> }) => {
          this.loadingData = false;
          if (res.photos.length) {
            if (this.offset === 0) {
              this.allPhotos = res.photos;
              this.items.splice(0, this.items.length, ...res.photos);
            } else {
              this.allPhotos.push(...res.photos);
              this.items.push(...res.photos);
            }
          } else {
            this.hasMore = false;
          }
          resolve();
        });
    });
  }

  search() {
    if (this.textField) {
      this.hasQuery = this.textField.text.length > 0;
      if (!this.textField.text) {
        // reset to all
        this.items.splice(0, this.items.length, ...this.allPhotos);
      } else {
        const query = (this.textField.text || "").toLowerCase();
        this.items.splice(
          0,
          this.items.length,
          ...this.allPhotos.filter(
            (p) => p.title.toLowerCase().indexOf(query) > -1
          )
        );
      }
    }
  }

  setViewMode(colWidth: string, rowHeight: string) {
    this.collectionView
      .animate({
        opacity: 0,
        duration: 150,
      })
      .then(() => {
        this.colWidth = colWidth;
        this.rowHeight = rowHeight;
        if (this.collectionView) {
          this.collectionView.visibility = CoreTypes.Visibility.collapse;
          setTimeout(() => {
            this.collectionView.visibility = CoreTypes.Visibility.visible;
            this.collectionView
              .animate({
                opacity: 1,
                duration: 150,
              })
              .then(() => {});
          }, 1);
        }
      });
  }

  loadedTextField(args) {
    this.textField = args.object;
  }

  loadedSearchContainer(args) {
    this.searchContainer = args.object;
  }

  itemTap(args) {
    console.log("itemTap:", args.item);
  }

  clear() {
    if (this.textField) {
      this.textField.text = "";
    }
  }

  loadMoreItems() {
    // only when no active query
    if (!this.hasQuery && !this.loadingData && this.hasMore) {
      this.offset = this.offset + this.limit;
      this.loadData();
    }
  }

  refreshList(args) {
    if (!this.hasQuery && !this.loadingData) {
      const pullToRefresh = args.object as PullToRefresh;
      this.offset = 0;
      this.loadData().then(() => {
        pullToRefresh.refreshing = false;
      });
    }
  }

  loadedCollectionView(args) {
    this.collectionView = args.object;
    applyEffects(this.collectionView);
  }

  templateSelector = () => {
    switch (this.colWidth) {
      case "100%":
        return "1x1";
      case "50%":
        return "2x2";
      case "33.33%":
        return "3x3";
    }
  };
}
