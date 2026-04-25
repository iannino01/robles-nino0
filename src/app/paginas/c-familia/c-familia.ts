import { Component, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
  protected readonly familia = computed(() => this.servicioFamilia.familia());
  protected readonly cargando = computed(() => this.servicioFamilia.cargando());
  protected readonly error = computed(() => this.servicioFamilia.error());
  protected readonly backendDisponible = computed(() => this.servicioFamilia.backendDisponible());
  protected readonly guardando = signal(false);
  protected familiarNuevo = {
    nombre: '',
    apellido: '',
    fechaNac: '',
    signoZod: '',
  };

  constructor(
    private servicioFamilia: ServFamilia,
    protected authGoogle: AuthGoogle
  ) {}

  async ngOnInit(): Promise<void> {
    await this.servicioFamilia.cargarFamilia(this.authGoogle.getIdentificadorUsuario());
  }

  protected async agregarFamiliar(): Promise<void> {
    this.guardando.set(true);
    await this.servicioFamilia.agregarFamiliar(this.authGoogle.getIdentificadorUsuario(), this.familiarNuevo);
    this.familiarNuevo = {
      nombre: '',
      apellido: '',
      fechaNac: '',
      signoZod: '',
    };
    this.guardando.set(false);
  }
}
