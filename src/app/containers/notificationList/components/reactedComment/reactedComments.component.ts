import {Component, Input, OnInit} from '@angular/core';
import {NotificationMessagePart} from '../../../../library/data/types/notifMessagePart.interface';
import {NotifListData} from '../../../../library/data/types/notifList.interface';
import {CommonModule} from '@angular/common';
import {CapitalizeFirstPipe} from '../../../../library/pipes/capitalize-first.pipe';
import {NzIconModule} from 'ng-zorro-antd/icon';

@Component({
  selector: 'reacted-comments',
  templateUrl: './reactedComments.component.html',
  styleUrls: [],
  standalone: true,
  imports: [CommonModule, CapitalizeFirstPipe, NzIconModule],
})
export class ReactedCommentsComponent implements OnInit {
  @Input() notifData?: NotifListData;
  message = 'reacted to your comment.';
  formattedNotifData = [];
  commentReact: string | undefined = '';
  comment: string | undefined = '';

  ngOnInit(): void {
    this.handleNotifData();
  }

  handleNotifData() {
    const commentValue = this.extractComment(this.notifData!.message_parts);

    // extract comment
    this.comment = commentValue;

    // extract type of reacted comment
    const reactedCommentType = this.extractReactedCommentType(
      this.notifData!.message_parts
    );

    this.commentReact = reactedCommentType;
  }

  extractComment(messageParts: NotificationMessagePart[]) {
    const messageObj = messageParts.find((item) => item.type === 'title');
    let commentValue;
    if (messageObj && 'value' in messageObj) {
      commentValue = messageObj.value;
    }

    return commentValue;
  }

  extractReactedCommentType(messageParts: NotificationMessagePart[]) {
    const messageObj = messageParts.find((item) => item.type === 'content');
    let reactType;

    if (messageObj && 'value' in messageObj) {
      reactType = messageObj.value;
    }

    return reactType;
  }
}
