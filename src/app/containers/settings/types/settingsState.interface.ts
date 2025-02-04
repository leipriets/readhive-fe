import { BackendErrorInterface } from "../../../library/data/types/backendError.interface";

export interface SettingsStateInterface {
    isSubmitting: boolean;
    validationErrors: BackendErrorInterface | null;
}