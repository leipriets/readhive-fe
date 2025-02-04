import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FeedTogglerComponent } from "../../../library/components/feedToggler/feedToggler.component";
import { FeedComponent } from "../../../library/components/feed/feed.component";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzGridModule } from "ng-zorro-antd/grid";
import { PopularTagsComponent } from "../../../library/components/popularTags/popularTags.component";
import { NewPostComponent } from "../../../library/components/newPost/newPost.component";

@Component({
    selector: 'app-your-feed',
    templateUrl: './yourFeed.component.html',
    standalone: true,
    imports: [
        CommonModule,
        NzIconModule,
        NzButtonModule,
        NzGridModule,
        FeedTogglerComponent,
        FeedComponent,
        PopularTagsComponent,
        NewPostComponent
    ]
})
export class YourFeedComponent {
    apiUrl = '/articles/feed';
}