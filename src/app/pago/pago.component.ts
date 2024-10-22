import { Component, OnInit } from '@angular/core';
import { PagoService } from './pago.service';
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { response } from 'express';

@Component({
  selector: 'app-pago',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './pago.component.html',
  styleUrl: './pago.component.css'
})
export class PagoComponent implements OnInit {
  pagos: any[] = [];
  nuevoPago = {
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
  }

  obtenerPagos() {
    this.http.get('http://localhost:8000/pagos').subscribe((response: any) => { this.pagos = response });
  }

  abrirFormularioPago() {
    this.mostrandoFormulario = true;
    this.nuevoPago = {
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
      this.mostrandoFormulario = false;
    })
  }

  actualizarPago() {
    if (this.pagoAEditar) {
      this.http.put(`http://localhost:8000/pagos/${this.pagoAEditar.id}`, this.pagoAEditar)
        .subscribe(() => {
          this.obtenerPagos();
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
