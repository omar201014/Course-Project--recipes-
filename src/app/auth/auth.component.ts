import { NgForm } from '@angular/forms';
import { Component, OnDestroy, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { authRes, AuthServiceService } from './auth-service.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  encapsulation:ViewEncapsulation.None 
})
export class AuthComponent implements OnInit ,OnDestroy {

  isLoggedin:boolean=true;
  isLoading:boolean=false;
  isError:string=null;
  constructor(private authService:AuthServiceService ,private router:Router ,private renderer:Renderer2) { }

  ngOnInit(): void {
    this.renderer.addClass(document.body, 'card');
  }

  onSwitchMode(){
    this.isLoggedin = !this.isLoggedin;
  }

  closeTriggered(){
    this.isError=null;
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
      // console.log(resData);
      this.isLoading=false;
      this.router.navigate(['/recipes'])
    }, errorMsg =>{
      // console.log(errorMsg);
      this.isError=errorMsg;
      this.isLoading=false;
    })
    formData.reset();
  }
  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'card');
  }
}
