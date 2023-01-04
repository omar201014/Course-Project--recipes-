import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


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

  constructor(private http:HttpClient) { }

  //sign up method //
  signUp(email:string , password:string){
    return this.http.post<authRes>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD4s2bDarbBuHUkmyjlI4QHKHZlAo6Qnl0',
      {
        email ,
        password,
        returnSecureToken:true
      }
    ).pipe(catchError(this.errorHanler))
  }

  //log in method//
  login(email:string ,password:string){
    return this.http.post<authRes>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD4s2bDarbBuHUkmyjlI4QHKHZlAo6Qnl0',
      {
        email ,
        password,
        returnSecureToken:true
      }
    ).pipe(catchError(this.errorHanler))
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

