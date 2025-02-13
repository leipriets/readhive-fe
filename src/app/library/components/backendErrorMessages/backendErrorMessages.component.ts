import { Component, Input } from "@angular/core";
import { BackendErrorInterface } from "../../data/types/backendError.interface";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'app-backend-error-messages',
    templateUrl: './backendErrorMessages.component.html',
    standalone: true,
    imports: [CommonModule]
})
export class BackendErrorMessages {
    @Input() backendErrors: BackendErrorInterface = {}

    errorMessages: string[] = [];

    ngOnInit(): void {
        this.errorMessages = Object.keys(this.backendErrors).map((name: string) => {
            const messages = this.backendErrors[name].join(' ');
            return `${messages}`;
        });
    }

}