import { Component} from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";



@Component({
    selector : 'app-header' ,
    templateUrl : './header.component.html',
    styleUrls : ['./header.component.css']
})
export class HeaderComponent {

  constructor(private storageService:DataStorageService){}

    collapsed:boolean = true;
    onSaveData(){
      this.storageService.storeRecipe();
    }

    onFetchData(){
      this.storageService.fetchRecipe();
    }

}
