import { Injectable, signal } from '@angular/core';
import {
  GoogleAuthProvider,
  User,
  browserLocalPersistence,
  getAuth,
  setPersistence,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { getApp, getApps, initializeApp } from 'firebase/app';
import { firebaseConfig, firebaseEstaConfigurado } from '../firebase.config';

type PerfilGoogle = {
  email?: string;
  family_name?: string;
  given_name?: string;
  name?: string;
  picture?: string;
  sub?: string;
};

@Injectable({
  providedIn: 'root',
})
export class AuthGoogle {
  readonly perfil = signal<PerfilGoogle | null>(null);
  readonly autenticado = signal(false);
  readonly inicializado = signal(false);
  readonly error = signal('');
  readonly uid = signal('');
  readonly backendDisponible = signal(firebaseEstaConfigurado());

  private readonly perfilStorageKey = 'roblesnino_google_profile';
  private readonly uidStorageKey = 'roblesnino_auth_uid';
  private firebaseAuth = this.backendDisponible()
    ? getAuth(getApps().length ? getApp() : initializeApp(firebaseConfig))
    : null;

  constructor() {
    this.restaurarSesion();
    void this.prepararPersistenciaFirebase();
  }

  async login(): Promise<void> {
    this.error.set('');

    if (!this.firebaseAuth) {
      this.error.set('Firebase aun no esta configurado. Revisa la configuracion del proyecto.');
      this.inicializado.set(true);
      return;
    }

    try {
      const proveedor = new GoogleAuthProvider();
      proveedor.setCustomParameters({ prompt: 'select_account' });
      const respuesta = await signInWithPopup(this.firebaseAuth, proveedor);
      this.guardarSesionDesdeUsuario(respuesta.user);
    } catch (error) {
      console.error('No fue posible iniciar sesion con Google.', error);
      this.error.set('No fue posible iniciar sesion con Google. Revisa la configuracion de Firebase.');
      this.limpiarSesion();
    } finally {
      this.inicializado.set(true);
    }
  }

  logout(): void {
    void this.cerrarSesionFirebase();
  }

  getPerfil(): PerfilGoogle | null {
    return this.perfil();
  }

  iniciarSesionDemo(email: string): void {
    const perfilDemo: PerfilGoogle = {
      email,
      given_name: email.split('@')[0] || 'Usuario',
      name: email.split('@')[0] || 'Usuario',
      sub: email,
    };

    this.guardarSesion(perfilDemo, email);
    this.error.set('');
    this.inicializado.set(true);
  }

  getIdentificadorUsuario(): string {
    return this.uid() || this.perfil()?.sub || this.perfil()?.email || '';
  }

  private guardarSesionDesdeUsuario(usuario: User): void {
    const [givenName = '', ...restoNombre] = (usuario.displayName || '').split(' ');
    const perfil: PerfilGoogle = {
      email: usuario.email || '',
      given_name: givenName,
      family_name: restoNombre.join(' '),
      name: usuario.displayName || usuario.email || 'Usuario',
      picture: usuario.photoURL || '',
      sub: usuario.uid,
    };

    this.guardarSesion(perfil, usuario.uid);
  }

  private guardarSesion(perfil: PerfilGoogle, uid: string): void {
    localStorage.setItem(this.perfilStorageKey, JSON.stringify(perfil));
    localStorage.setItem(this.uidStorageKey, uid || perfil.sub || perfil.email || '');
    this.perfil.set(perfil);
    this.autenticado.set(true);
    this.uid.set(uid || perfil.sub || perfil.email || '');
  }

  private limpiarSesion(): void {
    localStorage.removeItem(this.perfilStorageKey);
    localStorage.removeItem(this.uidStorageKey);
    this.perfil.set(null);
    this.autenticado.set(false);
    this.uid.set('');
  }

  private restaurarSesion(): void {
    const perfilGuardado = localStorage.getItem(this.perfilStorageKey);
    const uidGuardado = localStorage.getItem(this.uidStorageKey);

    if (!perfilGuardado) {
      this.inicializado.set(true);
      return;
    }

    try {
      const perfil = JSON.parse(perfilGuardado) as PerfilGoogle;
      this.perfil.set(perfil);
      this.autenticado.set(true);
      this.uid.set(uidGuardado || perfil.sub || perfil.email || '');
    } catch {
      this.limpiarSesion();
    } finally {
      this.inicializado.set(true);
    }
  }

  private async prepararPersistenciaFirebase(): Promise<void> {
    if (!this.firebaseAuth) {
      this.inicializado.set(true);
      return;
    }

    try {
      await setPersistence(this.firebaseAuth, browserLocalPersistence);

      if (this.firebaseAuth.currentUser) {
        this.guardarSesionDesdeUsuario(this.firebaseAuth.currentUser);
      }
    } catch (error) {
      console.error('No se pudo preparar la persistencia de Firebase.', error);
    } finally {
      this.inicializado.set(true);
    }
  }

  private async cerrarSesionFirebase(): Promise<void> {
    try {
      if (this.firebaseAuth) {
        await signOut(this.firebaseAuth);
      }
    } catch (error) {
      console.error('No se pudo cerrar la sesion de Firebase.', error);
    } finally {
      this.limpiarSesion();
      this.inicializado.set(true);
    }
  }
}
