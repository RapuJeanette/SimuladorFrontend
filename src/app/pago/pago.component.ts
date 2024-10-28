import { Component, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-pago',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './pago.component.html',
  styleUrl: './pago.component.css'
})
export class PagoComponent implements OnInit {
  pagos: any[] = [];
  pacientes: any[] = [];
  usuarioSeleccionado: any;
  nuevoPago = {
    usuario_id:'',
    monto: 0,
    estado: '',
    fecha: new Date()
  };

  mostrandoFormulario = false;
  mostrandoFormularioEdicion = false;
  pagoAEditar: any = null;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.obtenerPagos();
    this.obtenerPacientes();
  }

  onUsuarioSeleccionado(usuarioId: string) {
    this.nuevoPago.usuario_id = usuarioId; // Asigna el usuario_id al nuevo pago
  }

  obtenerPagos() {
    this.http.get('http://localhost:8000/pagos').subscribe((response: any) => { this.pagos = response });
  }

  obtenerPacientes() {
    this.http.get('http://localhost:8000/pacientes/').subscribe((data: any) => {
        console.log('Datos recibidos:', data);  // Agrega esto para ver qué datos estás obteniendo
        this.pacientes = data;  // Almacena los pacientes en la variable
    }, error => {
        console.error('Error al obtener pacientes:', error);  // Manejo de errores
    });
}


  abrirFormularioPago() {
    this.mostrandoFormulario = true;
    this.nuevoPago = {
      usuario_id: '',
      monto: 0,
      estado: '',
      fecha: new Date()
    };
    this.mostrandoFormularioEdicion = false;
  }

  guardarPago() {
    this.http.post('http://localhost:8000/pagos', this.nuevoPago)
      .subscribe(() => {
        this.obtenerPagos();
        this.mostrandoFormulario = false;
      });
  }

  editarPago(id: string) {
    this.http.put(`http://127.0.0.1:8000/pagos/${id}`, this.nuevoPago)
    .subscribe(() => {
      this.obtenerPagos();
      this.obtenerPacientes();
      this.mostrandoFormulario = false;
    })
  }

  actualizarPago() {
    if (this.pagoAEditar) {
      this.http.put(`http://localhost:8000/pagos/${this.pagoAEditar.id}`, this.pagoAEditar)
        .subscribe(() => {
          this.obtenerPagos();
          this.obtenerPacientes();
          this.mostrandoFormularioEdicion = false;
        });
    }
  }

  abrirFormularioEdicion(id: string) {
    this.mostrandoFormularioEdicion = true;
    const pagoParaEditar = this.pagos.find(pago => pago.id === id);
    if (pagoParaEditar) {
      this.pagoAEditar = { ...pagoParaEditar }; // Copia los datos del pago a editar
    }
  }

  eliminarPago(id: string) {
    this.http.delete(`http://localhost:8000/pagos/${id}`).subscribe(() => {
      this.obtenerPagos();
    });
  }
}
