import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {
  private apiUrl = 'http://localhost:3002/api/contacto';

  constructor(private http: HttpClient) {}

  enviarContacto(datos: { nombre: string; correo: string; mensaje: string }) {
    return this.http.post(this.apiUrl, datos);
  }
}
