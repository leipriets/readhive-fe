export type NotificationMessagePart =
  | {type: 'activity'; value: string}
  | {type: 'title'; value: string}
  | {type: 'content'; value: string}
  | {type: 'user'; id: string; name: string}
  | {type: 'message'; value: string};
