import { Component, OnDestroy} from "@angular/core";
import { Subscription } from "rxjs";
import { DataStorageService } from "../shared/data-storage.service";



@Component({
    selector : 'app-header' ,
    templateUrl : './header.component.html',
    styleUrls : ['./header.component.css']
})
export class HeaderComponent implements OnDestroy {

  constructor(private storageService:DataStorageService){}

    collapsed:boolean = true;
    subscription:Subscription
    onSaveData(){
      this.storageService.storeRecipe();
    }

    onFetchData(){
      this.subscription = this.storageService.fetchRecipe().subscribe();
    }

    ngOnDestroy(): void {
      this.subscription.unsubscribe();
    }

}
