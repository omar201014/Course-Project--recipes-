import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { authRes, AuthServiceService } from './auth-service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoggedin:boolean=true;
  isLoading:boolean=false;
  isError:string=null;
  constructor(private authService:AuthServiceService) { }

  ngOnInit(): void {
  }

  onSwitchMode(){
    this.isLoggedin = !this.isLoggedin;
  }


  onSubmit(formData:NgForm){
    // console.log(formData);
    if(!formData.valid){
      return;
    }
    const email = formData.value.email;
    const password = formData.value.password;

    let authObs:Observable<authRes>;

    if(this.isLoggedin){
        this.isLoading=true;
        authObs =this.authService.login(email,password)
    }else{
        this.isLoading=true;
        authObs = this.authService.signUp(email,password)
    }
    
    authObs.subscribe(resData =>{
      console.log(resData);
      this.isLoading=false;
    }, errorMsg =>{
      // console.log(errorMsg);
      this.isError=errorMsg;
      this.isLoading=false;
    })
    formData.reset();
  }

}
