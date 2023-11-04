import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { GenericService } from "../services/generic.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private generic: GenericService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return next.handle(request).pipe(
      catchError((error: any) => {
        if (error instanceof HttpErrorResponse && (error.status === 0 || error.status === 503)) {
          this.generic.showError("Não foi possivel se conectar ao banco de dados. Entre em contato com os administradores do sistema.");
        }
        return throwError(error);
      })
    );
  }
}
