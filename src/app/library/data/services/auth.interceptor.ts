import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { PersistenceService } from "./persitence.service";

export const authInterceptor: HttpInterceptorFn = (request, next) => {
    const persistenceService = inject(PersistenceService);
    const token = persistenceService.get('BVaccessToken');
    request = request.clone({
        setHeaders: {
            Authorization: token ? `Token ${token}` : ''
        }
    });

    return next(request);
}