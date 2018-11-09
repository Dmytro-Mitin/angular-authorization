import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthorizationService } from './authorization.service';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private injector: Injector) { }

  intercept(req, next){
    let authService = this.injector.get(AuthorizationService)
    let tokenizedReq = req.clone({
      setHeaders: {
        Autorization: `Bearer ${authService.getToken()}`
      }
    })
    return next.handle(tokenizedReq)
  }
}

