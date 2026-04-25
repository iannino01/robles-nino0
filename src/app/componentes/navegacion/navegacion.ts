import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGoogle } from '../../servicios/auth-google';

@Component({
  selector: 'app-navegacion',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navegacion.html',
  styleUrl: './navegacion.css',
})
export class Navegacion {
  protected menuAbierto = false;

  constructor(protected authGoogle: AuthGoogle) {}

  protected alternarMenu(): void {
    this.menuAbierto = !this.menuAbierto;
  }

  protected cerrarMenu(): void {
    this.menuAbierto = false;
  }

  protected cerrarSesion(): void {
    this.authGoogle.logout();
    this.cerrarMenu();
  }
}
