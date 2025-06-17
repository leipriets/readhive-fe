import {CommonModule} from '@angular/common';
import {Component, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {NewPostComponent} from '../../../library/components/newPost/newPost.component';
import {FeedTogglerComponent} from '../../../library/components/feedToggler/feedToggler.component';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FeedComponent} from '../../../library/components/feed/feed.component';
import {NzTagModule} from 'ng-zorro-antd/tag';
import {NzGridModule} from 'ng-zorro-antd/grid';
import {PopularTagsComponent} from '../../../library/components/popularTags/popularTags.component';

@Component({
  selector: 'app-tag-feed',
  templateUrl: './tagFeed.component.html',
  standalone: true,
  imports: [
    CommonModule,
    NzTagModule,
    NzGridModule,
    FeedComponent,
    PopularTagsComponent,
  ],
})
export class TagFeedComponent implements OnInit {
  @ViewChild(FeedComponent, {static: false}) feedComponent!: FeedComponent;

  apiUrl: string = '';
  tagName: string = '';

  constructor(private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.streamArticleApi();
  }

  streamArticleApi() {
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      this.apiUrl = `/articles?tag=${slug}`;

    });
  }
}
