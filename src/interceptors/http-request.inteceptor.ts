import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export function addCompanyHeaderInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const user = JSON.parse(localStorage.getItem('accounting-user'));
  const companyId = user?.companyId;
  if (companyId) {
    req = req.clone({
      setHeaders: {
        companyId: companyId,
      },
    });
  }
  if (user && !companyId) {
    console.error('No companyId found in local storage');
    return next(null);
  }
  return next(req);
}
