import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { NotifListData } from "../../../../library/data/types/notifList.interface";
import { CapitalizeFirstPipe } from "../../../../library/pipes/capitalize-first.pipe";

@Component({
    selector: 'followed-profile',
    templateUrl: './followedProfile.component.html',
    standalone: true,
    imports: [
        CommonModule,
        CapitalizeFirstPipe
    ]
})
export class FollowedProfileComponent {
    @Input() notifData?: NotifListData;

    message = 'started following you.'

}