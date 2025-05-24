import {createFeature, createReducer, on} from '@ngrx/store';
import {feedActions} from './actions';
import { routerNavigatedAction } from '@ngrx/router-store';
import { FeedStateInterface } from '../types/feedState.interface';

const initialState: FeedStateInterface = {
  isLoading: false,
  error: null,
  articles: [],
  articlesCount: 0,
  allDataLoaded: false
};

const feedFeature = createFeature({
  name: 'feed',
  reducer: createReducer(
    initialState,
    on(feedActions.getFeed, (state) => ({...state, isLoading: true})),
    on(feedActions.getFeedSuccess, (state, {feed, isLastPage}) => ({
      ...state,
      isLoading: false,
      articles: [...state.articles, ...feed.articles],
      articlesCount: feed.articlesCount,
      allDataLoaded: isLastPage
    })),
    on(feedActions.getFeedFailure, (state) => ({...state, isLoading: false})),
    on(routerNavigatedAction, () => initialState),
  ),
});

export const {
    name: feedFeatureKey,
    reducer: feedReducer,
    selectIsLoading,
    selectError,
    selectArticles: selectArticlesData,
    selectArticlesCount,
    selectAllDataLoaded
} = feedFeature