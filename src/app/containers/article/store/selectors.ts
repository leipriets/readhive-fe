import { createSelector } from '@ngrx/store';
import { ArticleStateInterface } from '../types/articleState.interface';

// Get the entire article state (from state.article)
export const selectArticleState = (state: any): ArticleStateInterface => state.article;

// Get the HTML content inside state.article.data.content
export const selectArticleContent = createSelector(
  selectArticleState,
  (articleState) => articleState.data?.body ?? ''
);