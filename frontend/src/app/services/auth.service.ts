import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3002/api'; // Cambia por tu backend

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password })
      .subscribe(response => {
        if (response.token) {
          localStorage.setItem('token', response.token); // Guardar token
          this.router.navigate(['/home']); // Redirigir a home
        } else {
        }
      }, error => {
        console.error('Error al iniciar sesión:', error);
      });
  }

  logOut() {
    localStorage.removeItem('token'); // Eliminar el token
    sessionStorage.clear(); // Limpiar datos de sesión
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token; // Verifica si hay token
  }
}
