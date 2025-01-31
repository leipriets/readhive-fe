import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { Store } from "@ngrx/store";
import { NzTabsModule } from "ng-zorro-antd/tabs";
import { selectCurrentUser } from "../../../containers/auth/store/reducers";
import { NzIconModule } from "ng-zorro-antd/icon";

@Component({
    selector: 'app-feed-toggler',
    templateUrl: './feedToggler.component.html',
    standalone: true,
    imports: [CommonModule, RouterLink, NzTabsModule, NzIconModule]
})
export class FeedTogglerComponent {
    @Input() tagName?: string = '';

    currentUser$ = this.store.select(selectCurrentUser);

    constructor(private store: Store) {

    }

}