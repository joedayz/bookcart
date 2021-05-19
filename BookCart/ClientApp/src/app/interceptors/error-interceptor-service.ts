import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {AuthenticationService} from "../services/authentication.service";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {


  constructor(
    private authService: AuthenticationService,
    private router: Router,
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401) {
        this.authService.logout();
        if (!request.url.includes('login')) {
          location.reload();
        }
      } else if (err.status === 404) {
        this.router.navigate(['not-found']);
      }
      const error = err.error.message || err.statusText;
      return throwError(error);
    }));
  }




}
