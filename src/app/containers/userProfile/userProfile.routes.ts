import { Route } from "@angular/router";

import { UserProfileComponent } from "./components/userProfile.component";
import { UserProfileService } from "./services/userProfile.service";
import { userProfileFeatureKey, userProfileReducer } from "./store/reducers";
import * as userProfileEffects from './store/effects';


export const routes: Route[] = [
    {
        path: '',
        component: UserProfileComponent
    }
]