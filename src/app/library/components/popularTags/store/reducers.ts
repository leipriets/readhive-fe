import {createFeature, createReducer, on} from '@ngrx/store';
import {popularTagActions} from './actions';
import { PopularTagStateInterface } from '../types/popularTagsState.interface';

const initialState: PopularTagStateInterface = {
  isLoading: false,
  error: null,
  data: [],
};

const popularTagsFeature = createFeature({
  name: 'popularTags',
  reducer: createReducer(
    initialState,
    on(popularTagActions.getPopularTags, (state) => ({...state, isLoading: true})),
    on(popularTagActions.getPopularTagsSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      data: action.popularTags,
    })),
    on(popularTagActions.getPopularTagsFailure, (state) => ({...state, isLoading: false}))
  ),
});

export const {
    name: popularTagsFeatureKey,
    reducer: popularTagsReducer,
    selectIsLoading,
    selectError,
    selectData: selectPopularTagsData
} = popularTagsFeature