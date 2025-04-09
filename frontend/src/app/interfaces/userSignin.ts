export interface UserSignIn {
    user_id?: number; // Opcional porque lo genera la BD
    user_name: string;
    user_secondName: string;
    email: string;
    password: string;
    rol: 'admin' | 'usuario' | 'chofer';
  }
  