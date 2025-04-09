import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interfaces/user';
import { ErrorService } from 'src/app/services/error.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  loading: boolean = false;

  constructor(private toastr: ToastrService,
    private _userService: UserService,
    private router: Router,
    private _errorService: ErrorService) { }

  ngOnInit(): void {
  }

  login() {
    // Validamos que el usuario ingrese datos
    if (this.email === '' || this.password === '') {
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return;
    }

    // Creamos el body con el usuario para hacer el login
    const user: User = {
      email: this.email,
      password: this.password
    };

    this.loading = true;
    // En el componente de login (login.component.ts)
    // En el componente de login (login.component.ts)
    this._userService.login(user).subscribe({
      next: (response: any) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          console.log('Token almacenado:', localStorage.getItem('token')); // Verifica que el token se almacene
          this.router.navigate(['/home']);
        } else {
          this.toastr.error('Token no recibido', 'Error');
        }
      },
      error: (e: HttpErrorResponse) => {
        this._errorService.msjError(e);
        this.loading = false;
      }
    });

    this._userService.login(user).subscribe({
      next: (response: any) => {
        // Verifica que la respuesta tenga el token y lo almacena en el localStorage
        if (response.token) {
          localStorage.setItem('token', response.token);
          console.log('Token almacenado:', localStorage.getItem('token'));
          this.toastr.success('Bienvenido');
          this.router.navigate(['/home']); // Redirigimos a la página de inicio
        } else {
          this.toastr.error('Token no recibido', 'Error');
        }
      },
      error: (e: HttpErrorResponse) => {
        this._errorService.msjError(e); // Manejo de errores
        this.loading = false; // Detenemos el loading
      }
    });
  }
}
