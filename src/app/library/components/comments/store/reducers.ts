import {createFeature, createReducer, on} from '@ngrx/store';
import {commentsActions} from './actions';
import { routerNavigatedAction } from '@ngrx/router-store';
import { CommentsStateInterface } from '../types/commentsState.interface';

const initialState: CommentsStateInterface = {
  isLoading: false,
  error: null,
  comments: [],
  updatedComment: null
//   articlesCount: 0,
//   allDataLoaded: false
};

const commentsFeature = createFeature({
  name: 'comments',
  reducer: createReducer(
    initialState,
    on(commentsActions.getComment, (state) => ({...state, isLoading: true})),
    on(commentsActions.getCommentSuccess, (state, {data}) => ({
      ...state,
      isLoading: false,
      comments: [...data],
    //   articlesCount: feed.articlesCount,
    //   allDataLoaded: isLastPage
    })),
    on(commentsActions.getCommentSuccessPagination, (state, {data}) => ({
        ...state,
        isLoading: false,
      comments: [...state.comments, ...data],

      //   articlesCount: feed.articlesCount,
      //   allDataLoaded: isLastPage
      })),
    on(commentsActions.getCommentFailure, (state) => ({...state, isLoading: false})),

    on(commentsActions.updateCommentArticle, (state) => ({...state, isLoading: true})),
    on(commentsActions.updateCommentArticleSuccess, (state, {comment}) => ({
      ...state,
      isLoading: false,
      updatedComment: comment
    })),
    on(commentsActions.updateCommentArticleFailure, (state) => ({...state, isLoading: false})),


    on(routerNavigatedAction, () => initialState),
  ),
});

export const {
    name: commentsFeatureKey,
    reducer: commentsReducer,
    selectIsLoading,
    selectError,
    selectComments: selectCommentsData,
    selectUpdatedComment,
    // selectArticlesCount,
    // selectAllDataLoaded
} = commentsFeature