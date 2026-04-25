import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Familiar } from '../../modelos/familiar';
import { ServFamilia } from '../../servicios/familia';
import { AuthGoogle } from '../../servicios/auth-google';

@Component({
  selector: 'app-c-familia',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './c-familia.html',
  styleUrl: './c-familia.css',
})
export class CFamilia implements OnInit {
  protected familia: Familiar[] = [];
  protected nuevoIntegrante = {
    nombre: '',
    apellido: '',
    fechaNac: '',
    signoZod: '',
    parentesco: '',
    descripcion: '',
  };
  protected mensaje = '';
  protected integranteEnEdicion: Familiar | null = null;

  constructor(
    private servicioFamilia: ServFamilia,
    private router: Router,
    protected authGoogle: AuthGoogle
  ) {}

  async ngOnInit(): Promise<void> {
    await this.cargarFamilia();
  }

  protected async guardarIntegrante(): Promise<void> {
    const nombre = this.nuevoIntegrante.nombre.trim();
    const apellido = this.nuevoIntegrante.apellido.trim();
    const fechaNac = this.nuevoIntegrante.fechaNac.trim();

    if (!nombre || !apellido || !fechaNac) {
      this.mensaje = 'Completa nombre, apellido y fecha de nacimiento.';
      return;
    }

    const usuarioId = this.authGoogle.getIdentificadorUsuario();
    const datosFormulario = {
      ...this.nuevoIntegrante,
      nombre,
      apellido,
      fechaNac,
      parentesco: this.nuevoIntegrante.parentesco.trim(),
      descripcion: this.nuevoIntegrante.descripcion.trim(),
      signoZod: this.nuevoIntegrante.signoZod.trim(),
    };

    if (this.integranteEnEdicion) {
      await this.servicioFamilia.actualizarFamiliar(usuarioId, {
        ...this.integranteEnEdicion,
        ...datosFormulario,
      });
      this.mensaje = 'Integrante actualizado correctamente.';
    } else {
      await this.servicioFamilia.agregarFamiliar(usuarioId, datosFormulario);
      this.mensaje = 'Integrante guardado correctamente.';
    }

    if (this.servicioFamilia.error()) {
      this.mensaje = this.servicioFamilia.error();
      return;
    }

    await this.cargarFamilia();
    this.cancelarEdicion();
  }

  protected verDetalle(id: string): void {
    void this.router.navigate(['/familia', id]);
  }

  protected editarIntegrante(persona: Familiar, event: Event): void {
    event.stopPropagation();
    this.integranteEnEdicion = persona;
    this.nuevoIntegrante = {
      nombre: persona.nombre,
      apellido: persona.apellido,
      fechaNac: persona.fechaNac,
      signoZod: persona.signoZod,
      parentesco: persona.parentesco,
      descripcion: persona.descripcion,
    };
    this.mensaje = `Editando a ${persona.nombre} ${persona.apellido}.`;
  }

  protected cancelarEdicion(): void {
    this.integranteEnEdicion = null;
    this.nuevoIntegrante = {
      nombre: '',
      apellido: '',
      fechaNac: '',
      signoZod: '',
      parentesco: '',
      descripcion: '',
    };
  }

  private async cargarFamilia(): Promise<void> {
    await this.servicioFamilia.cargarFamilia(this.authGoogle.getIdentificadorUsuario());
    this.familia = this.servicioFamilia.familia();
  }
}
