import { Routes } from '@angular/router';
import { CFamilia } from './paginas/c-familia/c-familia';
import { Acercade } from './paginas/acercade/acercade';
import { Noticias } from './paginas/noticias/noticias';
import { Noticia } from './paginas/noticia/noticia';
import { Login } from './componentes/login/login';
import { SesionIniciada } from './paginas/sesion-iniciada/sesion-iniciada';
import { authGuard } from './guards/auth.guard';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'sesion-iniciada', component: SesionIniciada, canActivate: [authGuard] },
  { path: 'familia', component: CFamilia, canActivate: [authGuard] },
  { path: 'acercade', component: Acercade, canActivate: [authGuard] },
  { path: 'noticias', component: Noticias, canActivate: [authGuard] },
  { path: 'noticia/:id', component: Noticia, canActivate: [authGuard] },
  { path: '**', redirectTo: 'login' }
];
