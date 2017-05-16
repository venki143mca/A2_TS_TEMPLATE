import { Component } from '@angular/core';

import { HackerNewsService } from './app.service';

@Component({
  selector: 'hacker-component',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class HackerNewsComponent {
  news = {};
  constructor(private HackerNewsService: HackerNewsService) {
    this.HackerNewsService.getNews().subscribe(data => this.news = data);
  }

    getLatestNews() {
      this.HackerNewsService.getNews().subscribe(data => this.news = data);
    }
}
