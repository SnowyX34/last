import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/reports';
  }

  private getToken(): string | null {
    const token = localStorage.getItem('token');
    return token;
  }

  enviarReporte(reporte: any): Observable<any> {
    const token = this.getToken();
    if (!token) {
      return throwError('Token no encontrado');
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });

    const url = `${this.myAppUrl}${this.myApiUrl}`;

    return this.http.post<any>(url, reporte, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Error:', error.error.message);
    } else {
    }
    return throwError('Ocurrió un error al enviar el reporte. Por favor, inténtalo de nuevo.');
  }
}
