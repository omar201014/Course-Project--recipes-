import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AlertComponent } from "./alert/alert.component";
import { DropdownDirectiveDirective } from "./dropdown.directive.directive";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";

@NgModule({
    declarations:[
        DropdownDirectiveDirective,
        LoadingSpinnerComponent,
        AlertComponent
    ],
    imports:[CommonModule],

    exports:[
        DropdownDirectiveDirective,
        LoadingSpinnerComponent,
        AlertComponent,
        CommonModule
    ]    
})

export class SharedModule {}