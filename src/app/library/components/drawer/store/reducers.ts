import { createFeature, createReducer, on } from "@ngrx/store";
import { drawerActions } from "./actions";
import { routerNavigatedAction } from "@ngrx/router-store";

const initialState: {isVisible: boolean} = {
    isVisible: false
};

const drawerFeature = createFeature({
    name: 'drawer',
    reducer: createReducer(
      initialState,
      on(drawerActions.toggleDrawerOpen, (state) => ({
        ...state,
        isVisible: true,
      })),
      on(drawerActions.toggleDrawerClose, (state) => ({
        ...state,
        isVisible: false,
      })),
      on(routerNavigatedAction, () => initialState)
    ),
  });

  export const {
    name: drawerFeatureKey,
    reducer: drawerReducer,
    selectIsVisible
  } = drawerFeature;