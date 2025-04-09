import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReportService } from 'src/app/services/report.service';
import { Router } from '@angular/router';
import { jwtDecode} from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent {
  reporteForm: FormGroup;
  isLoading: boolean = false;

  constructor(private toastr: ToastrService, private fb: FormBuilder, private reportService: ReportService, private router: Router) {
    this.reporteForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      correo: ['', [Validators.required, Validators.email]],
      fecha: ['', [Validators.required]],
      hora: ['', [Validators.required]],
      ruta: ['', [Validators.required]],
      categoria: ['', [Validators.required]],
      descripcion: ['', [Validators.required]]
    });
  }

  enviarQueja() {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        console.error('El token ha expirado');
        alert('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.');
        this.router.navigate(['/login']);
        return;
      }
    } else {
      alert('Por favor, inicia sesión nuevamente.');
      return;
    }

    if (this.reporteForm.valid) {
      this.isLoading = true;
      console.log('Datos del formulario:', this.reporteForm.value);

      this.reportService.enviarReporte(this.reporteForm.value).subscribe({
        next: (response) => {
          console.log('Respuesta del servidor:', response);
          this.toastr.success('Su reporte ha sido enviado exitosamente');
          this.reporteForm.reset();
        },
        error: (err) => {
          console.error('Error al enviar la queja:', err);
          this.toastr.error('Has superado el limite de quejas en el dia', 'Error');
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    } else {
      console.warn('Formulario inválido:', this.reporteForm.errors);
      alert('Por favor, llena todos los campos correctamente.');
    }
  }
}
