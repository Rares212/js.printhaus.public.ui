import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor, HttpErrorResponse
} from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { TuiAlertService } from "@taiga-ui/core";
import { ALERT_TTL } from "../constants/notification.constants";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private alertService: TuiAlertService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
        catchError((error: HttpErrorResponse) => {
            this.alertService.open(error.message, {status: 'error', autoClose: ALERT_TTL});
            return throwError(() => error);
        }
    ));
  }
}
