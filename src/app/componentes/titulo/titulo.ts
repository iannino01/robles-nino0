import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-titulo',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './titulo.html',
  styleUrl: './titulo.css',
})
export class Titulo {
  protected readonly accesos = [
    { etiqueta: 'Familia', ruta: '/familia' },
    { etiqueta: 'Noticias', ruta: '/noticias' },
    { etiqueta: 'Proyecto', ruta: '/acercade' },
  ];

  protected rutaActual = '/';

  constructor(private router: Router) {
    this.rutaActual = this.router.url;

    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.rutaActual = event.urlAfterRedirects;
      });
  }

  protected get mostrarTitulo(): boolean {
    return this.rutaActual !== '/login';
  }

  protected get titulo(): string {
    if (this.rutaActual.startsWith('/familia')) {
      return 'Mapa familiar';
    }

    if (this.rutaActual.startsWith('/noticia/')) {
      return 'Detalle de noticia';
    }

    if (this.rutaActual.startsWith('/noticias')) {
      return 'Noticias y novedades';
    }

    if (this.rutaActual.startsWith('/acercade')) {
      return 'Proyecto y contexto';
    }

    if (this.rutaActual.startsWith('/sesion-iniciada')) {
      return 'Acceso confirmado';
    }

    return 'Portal familiar';
  }

  protected get descripcion(): string {
    if (this.rutaActual.startsWith('/familia')) {
      return 'Consulta integrantes, fechas importantes y relaciones de forma mas clara y ordenada.';
    }

    if (this.rutaActual.startsWith('/noticia/')) {
      return 'Revisa una noticia puntual con contexto y vuelve rapido a la lista principal.';
    }

    if (this.rutaActual.startsWith('/noticias')) {
      return 'Explora eventos recientes, logros y avisos relevantes de la familia.';
    }

    if (this.rutaActual.startsWith('/acercade')) {
      return 'Entiende el objetivo del proyecto, el origen de la informacion y como esta organizado.';
    }

    if (this.rutaActual.startsWith('/sesion-iniciada')) {
      return 'Desde aqui puedes saltar directo a las secciones principales sin perder tiempo.';
    }

    return 'Un punto de entrada simple para recorrer la informacion importante del sitio.';
  }
}
