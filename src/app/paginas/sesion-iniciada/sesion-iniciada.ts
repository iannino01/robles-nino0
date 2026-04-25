import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGoogle } from '../../servicios/auth-google';

@Component({
  selector: 'app-sesion-iniciada',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sesion-iniciada.html',
  styleUrl: './sesion-iniciada.css',
})
export class SesionIniciada implements OnInit {
  protected perfil: ReturnType<AuthGoogle['getPerfil']> = null;

  constructor(
    private authGoogle: AuthGoogle,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.perfil = this.authGoogle.getPerfil();
  }

  protected irAFamilia(): void {
    void this.router.navigate(['familia']);
  }
}
