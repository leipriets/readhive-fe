import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { NzCardModule } from "ng-zorro-antd/card";
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzSkeletonModule } from "ng-zorro-antd/skeleton";

@Component({
    selector: 'app-skeleton-profile',
    templateUrl: './skeletonProfile.component.html',
    styleUrl: './skeletonProfile.component.css',
    standalone: true,
    imports: [CommonModule, NzSkeletonModule, NzGridModule, NzCardModule],
})
export class SkeletonProfileComponent {
    @Input() isLoading?: boolean;
}