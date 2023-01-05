import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError , BehaviorSubject } from 'rxjs';
import { catchError , tap } from 'rxjs/operators';
import { Users } from './user.model';


export interface authRes {
  email:string;
  refreshToken:string;
  expiresIn:string;
  localId:string;
  idToken:string;
  registered?:boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  user = new BehaviorSubject<Users>(null);  //to store authenticated users//

  constructor(private http:HttpClient , private router:Router) { }

  //sign up method //
  signUp(email:string , password:string){
    return this.http.post<authRes>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD4s2bDarbBuHUkmyjlI4QHKHZlAo6Qnl0',
      {
        email ,
        password,
        returnSecureToken:true
      }
    ).pipe(catchError(this.errorHanler) ,tap(resData =>{
      this.authHandler(resData.email, resData.localId,resData.idToken, +resData.expiresIn);
    }))
  }

  //log in method//
  login(email:string ,password:string){
    return this.http.post<authRes>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD4s2bDarbBuHUkmyjlI4QHKHZlAo6Qnl0',
      {
        email ,
        password,
        returnSecureToken:true
      }
    ).pipe(catchError(this.errorHanler),tap(resData =>{
      this.authHandler(resData.email, resData.localId,resData.idToken, +resData.expiresIn);
    }))
  }

  //logout method//
  logOut(){
    this.user.next(null);
    this.router.navigate(['/auth']);

  }

  //Authentication Handeling//
  private authHandler(email:string ,userId:string ,token:string, expiresIn:number){
      const expirationDate =new Date(new Date().getTime()+ expiresIn * 1000);
      const user = new Users(
        email ,
        userId ,
        token,
        expirationDate
        );
      this.user.next(user);
  }

  //Error Handeling//
  private errorHanler(errorRes :HttpErrorResponse){
    let errorMsg = 'an Unknown error occured'
        if(!errorRes.error || !errorRes.error.error){
          return throwError(errorMsg);
        }
        switch(errorRes.error.error.message){
          case 'EMAIL_EXISTS':
            errorMsg = 'The email address is already in use by another account';
            break;
          case 'OPERATION_NOT_ALLOWED':
            errorMsg = 'Password sign-in is disabled for this project'
            break;
          case 'OO_MANY_ATTEMPTS_TRY_LATER':
            errorMsg = 'We have blocked all requests from this device due to unusual activity. Try again later'
            break;
            case 'EMAIL_NOT_FOUND':
              errorMsg = 'There is no user record corresponding , check youe credentials and try again.';
              break;
            case 'INVALID_PASSWORD':
              errorMsg ='Inavalid password , check youe credentials and try again.';
              break;
            case 'USER_DISABLED':
              errorMsg = 'The user account has been disabled by an administrator';
        }
        return throwError(errorMsg);
  }
}

