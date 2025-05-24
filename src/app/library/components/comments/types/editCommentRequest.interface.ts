export interface EditCommentRequestInterface {
  comment: {
    commentId: string | number;
    body: string;
    slug: string;
  } 
}
