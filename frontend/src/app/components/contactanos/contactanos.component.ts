import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contactanos',
  templateUrl: './contactanos.component.html',
  styleUrls: ['./contactanos.component.css']
})
export class ContactoComponent {
  nombre: string = '';
  correo: string = '';
  mensaje: string = '';
  mensajeRespuesta: string = '';
  error: string = '';

  constructor(private http: HttpClient) {}

  enviarFormulario() {
    const data = { nombre: this.nombre, correo: this.correo, mensaje: this.mensaje };

    this.http.post('http://localhost:3002/api/contacto/enviar', data).subscribe({
      next: (response: any) => {
        this.mensajeRespuesta = response.message;
        this.error = '';
      },
      error: (err) => {
        this.error = "Error al enviar el correo.";
        this.mensajeRespuesta = '';
      }
    });
  }
}
