export interface Unit {
    id_vehiculo?: number; // Opcional porque es auto-incremental
    placa: string;
    modelo: string;
    id_chofer: number;
    estado: 'disponible' | 'en uso' | 'mantenimiento';
}
