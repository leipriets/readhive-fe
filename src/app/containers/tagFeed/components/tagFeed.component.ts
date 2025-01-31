import {CommonModule} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {NewPostComponent} from '../../../library/components/newPost/newPost.component';
import {FeedTogglerComponent} from '../../../library/components/feedToggler/feedToggler.component';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FeedComponent} from '../../../library/components/feed/feed.component';
import {NzTagModule} from 'ng-zorro-antd/tag';

@Component({
  selector: 'app-tag-feed',
  templateUrl: './tagFeed.component.html',
  standalone: true,
  imports: [
    CommonModule,
    NzTagModule,
    NewPostComponent,
    FeedTogglerComponent,
    FeedComponent,
  ],
})
export class TagFeedComponent implements OnInit {
  apiUrl: string = '';
  tagName: string = '';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.tagName = params['slug'];
      this.apiUrl = `/articles?tag=${this.tagName}`;
    });
  }
}
