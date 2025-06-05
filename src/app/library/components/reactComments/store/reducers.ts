import {createFeature, createReducer, on} from '@ngrx/store';
import {reactCommentsActions} from './actions';
import {routerNavigatedAction} from '@ngrx/router-store';

const initialState: {
    isLoading: boolean,
    error: any,
    data: any;
} = {
  isLoading: false,
  error: null,
  data: [],
};

const reactCommentFeature = createFeature({
  name: 'react comment',
  reducer: createReducer(
    initialState,
    on(reactCommentsActions.likeComment, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(reactCommentsActions.likeCommentSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      data: action,
    })),
    on(reactCommentsActions.likeCommentFailure, (state) => ({
      ...state,
      isLoading: false,
    })),

    on(reactCommentsActions.dislikeComment, (state) => ({
        ...state,
        isLoading: true,
      })),
      on(reactCommentsActions.dislikeCommentSuccess, (state, action) => ({
        ...state,
        isLoading: false,
        data: action,
      })),
      on(reactCommentsActions.dislikeCommentFailure, (state) => ({
        ...state,
        isLoading: false,
      })),

    on(routerNavigatedAction, () => initialState)
  ),
});

export const {
  name: reactCommentsFeatureKey,
  reducer: reactCommentReducer,
  selectIsLoading,
  selectError,
  selectData,
} = reactCommentFeature;
