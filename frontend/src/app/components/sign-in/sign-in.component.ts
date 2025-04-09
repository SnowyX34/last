import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserSignIn } from 'src/app/interfaces/userSignin';
import { ErrorService } from 'src/app/services/error.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  user_name: string = '';
  user_secondName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  rol: 'admin' | 'usuario' | 'chofer' = 'usuario'; // Valor por defecto
  loading: boolean = false;

  constructor(
    private toastr: ToastrService,
    private _userService: UserService,
    private router: Router,
    private _errorService: ErrorService
  ) {}

  ngOnInit(): void {}

  addUser() {
    // Validamos que el usuario ingrese valores
    if (
      this.user_name.trim() === '' ||
      this.user_secondName.trim() === '' ||
      this.email.trim() === '' ||
      this.password.trim() === '' ||
      this.confirmPassword.trim() === ''
    ) {
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return;
    }

    // Validamos que las contraseñas coincidan
    if (this.password !== this.confirmPassword) {
      this.toastr.error('Las contraseñas ingresadas son distintas', 'Error');
      return;
    }

    // Creamos el objeto usuario
    const user: UserSignIn = {
      user_name: this.user_name,
      user_secondName: this.user_secondName,
      email: this.email,
      password: this.password,
      rol: this.rol
    };

    this.loading = true;
    this._userService.signIn(user).subscribe({
      next: () => {
        this.loading = false;
        this.toastr.success(`Usuario ${this.user_name} registrado con éxito`, 'Registro exitoso');
        this.router.navigate(['/login']);
      },
      error: (e: HttpErrorResponse) => {
        this.loading = false;
        this._errorService.msjError(e);
      }
    });
  }
}
