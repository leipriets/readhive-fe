export interface EditCommentRequestInterface {
  comment: {
    commentId: number | string;
    body: string;
    slug: string;
  } 
}
