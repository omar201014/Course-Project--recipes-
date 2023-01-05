import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, take } from "rxjs/operators";
import { AuthServiceService } from "./auth-service.service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{

  constructor(private authService:AuthServiceService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    return this.authService.user.pipe(
      take(1) ,
      exhaustMap(user =>{
        if(!user){
          return next.handle(req)
        }else{
          const modifiedReqUrl = req.clone({
            params: new HttpParams().set('auth',user.token)
          });
          return next.handle(modifiedReqUrl);
        }
      })
    );
  }

}
