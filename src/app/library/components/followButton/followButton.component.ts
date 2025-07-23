import {CommonModule} from '@angular/common';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Store} from '@ngrx/store';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {followUserActions} from './store/actions';
import {userProfileActions} from '../../../containers/userProfile/store/actions';

@Component({
  selector: 'app-follow-button',
  templateUrl: './followButton.component.html',
  standalone: true,
  imports: [CommonModule, NzButtonModule, NzIconModule],
})
export class FollowButtonComponent implements OnInit {
  @Input() isFollowing: boolean | undefined = false;
  @Input() username: string | undefined = '';
  @Output() followSubmit = new EventEmitter<{
    isFollowing: boolean;
    username: string;
  }>();

  constructor(private store: Store) {}

  ngOnInit(): void {}

  handleFollow() {
    const followValues = {
      isFollowing: this.isFollowing ?? false,
      username: this.username ?? '',
    };

    this.store.dispatch(
      followUserActions.followUser(followValues)
    );

    this.followSubmit.emit(followValues);

    this.isFollowing = !followValues.isFollowing;
  }
}
