import { Route } from "@angular/router";
import { SingleMasterPageComponent } from "./single-master-page.component";
import { LoginComponent } from "../../containers/auth/components/login/login.component";
import { RegisterComponent } from "../../containers/auth/components/register/register.component";

export const singlePageRoutes: Route[] = [
    {
        path: '',
        component: SingleMasterPageComponent,
        children: [
            {
                path: 'login',
                component: LoginComponent,
                loadChildren: () => import('../../containers/auth/auth.routes').then((m) => m.loginRoutes),
                
            },
            {
                path: 'register',
                component: RegisterComponent,
                loadChildren: () => import('../../containers/auth/auth.routes').then((m) => m.registerRoutes),
                
            },
        ]
    }
];