import { BackendErrorInterface } from "../../../library/data/types/backendError.interface";
import { CurrentUserInterface } from "../../../library/data/types/currentUser.interface";

export interface AuthStateInterface {
    isSubmitting: boolean;
    currentUser: CurrentUserInterface | null | undefined;
    isLoading: boolean
    validationErrors: BackendErrorInterface | null
}