import {createFeature, createReducer, on} from '@ngrx/store';
import {articleActions} from './actions';
import {routerNavigatedAction} from '@ngrx/router-store';

import {ArticleStateInterface} from '../types/articleState.interface';

const initialState: ArticleStateInterface = {
  isSubmitting: false,
  isLoading: false,
  error: null,
  validationErrors: null,
  data: null,
};

const articleFeature = createFeature({
  name: 'article',
  reducer: createReducer(
    initialState,
    on(articleActions.createArticle, (state) => ({
      ...state,
      isSubmitting: true,
    })),
    on(articleActions.createArticleSuccess, (state, action) => ({
      ...state,
      isSubmitting: false,
    })),
    on(articleActions.createArticleFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    })),

    on(articleActions.getArticle, (state) => ({...state, isLoading: true})),
    on(articleActions.getArticleSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      data: action.article,
    })),
    on(articleActions.getArticleFailure, (state) => ({
      ...state,
      isLoading: false,
    })),
    on(articleActions.updateArticle, (state) => ({
      ...state,
      isSubmitting: true,
    })),
    on(articleActions.updateArticleSuccess, (state) => ({
      ...state,
      isSubmitting: false,
    })),
    on(articleActions.updateArticleFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    })),
    on(routerNavigatedAction, () => initialState)
  ),
});

export const {
  name: articleFeatureKey,
  reducer: articleReducer,
  selectIsSubmitting,
  selectIsLoading,
  selectError,
  selectValidationErrors,
  selectData: selectArticleData,
} = articleFeature;
