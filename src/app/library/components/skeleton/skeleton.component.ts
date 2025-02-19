import { Component } from "@angular/core";

import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';

@Component({
    selector: 'app-skeleton',
    templateUrl: './skeleton.component.html',
    standalone: true,
    imports: [NzSkeletonModule]
})
export class SkeletonComponent {

}