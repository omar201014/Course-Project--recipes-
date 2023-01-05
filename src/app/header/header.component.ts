import { Component, OnDestroy, OnInit} from "@angular/core";
import { Subscription } from "rxjs";
import { AuthServiceService } from "../auth/auth-service.service";
import { DataStorageService } from "../shared/data-storage.service";



@Component({
    selector : 'app-header' ,
    templateUrl : './header.component.html',
    styleUrls : ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {

  constructor(private storageService:DataStorageService , private authService:AuthServiceService){}

    collapsed:boolean = true;
    isAuthenticated:boolean=false;
    subscription:Subscription;
    private userSub:Subscription;

    ngOnInit(): void {
      this.userSub = this.authService.user.subscribe(user =>{
        this.isAuthenticated = (!user)? false:true;
        // console.log(user);
        // console.log(this.isAuthenticated);
      })
    }
    onSaveData(){
      this.storageService.storeRecipe();
    }

    onFetchData(){
      this.subscription = this.storageService.fetchRecipe().subscribe();
    }

    onLogOut(){
      this.authService.logOut();
    }

    ngOnDestroy(): void {
      this.subscription.unsubscribe();
      this.userSub.unsubscribe();
    }

}
