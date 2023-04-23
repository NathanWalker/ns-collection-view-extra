import { Injectable } from "@angular/core";

import { Item } from "./item";

@Injectable({
  providedIn: "root",
})
export class ItemService {
  private items: Array<Item> = [
    { id: 1, name: "Ter Stegen", role: "Goalkeeper" },
    { id: 3, name: "Piqué", role: "Defender" },
    { id: 4, name: "I. Rakitic", role: "Midfielder" },
    { id: 5, name: "Sergio", role: "Midfielder" },
    { id: 6, name: "Denis Suárez", role: "Midfielder" },
    { id: 7, name: "Arda", role: "Midfielder" },
    { id: 8, name: "A. Iniesta", role: "Midfielder" },
    { id: 9, name: "Suárez", role: "Forward" },
    { id: 10, name: "Messi", role: "Forward" },
    { id: 11, name: "Neymar", role: "Forward" },
  ].map((i) => {
    return {
      ...i,
      subject: this.randomTitles(),
      body: this.randomBody(),
      date: this.randomDate(new Date(2012, 0, 1), new Date()),
    };
  }).sort((a,b) => {
    // @ts-ignore
    return b.date - a.date;
  });

  getItems(): Array<Item> {
    return this.items;
  }

  getItem(id: number): Item {
    return this.items.filter((item) => item.id === id)[0];
  }

  randomTitles() {
    const titles = [
      `NativeScript is amazing`,
      `Creative developer bliss`,
      `Liberating solutions`,
      `JS ecosystem no boundaries`,
      `Platform celebration`,
      `Come together`,
      `Angular, Ionic, Qwik, React, Solid, Svelte, Vue`,
    ];
    return titles[Math.floor(Math.random() * titles.length)];
  }

  randomBody() {
    const body = [
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
      `Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.`,
      `At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.`,
      `It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
    ];
    return body[Math.floor(Math.random() * body.length)];
  }

  randomDate(start, end) {
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
  }
}
