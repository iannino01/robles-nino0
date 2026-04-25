import { Injectable, signal } from '@angular/core';
import { collection, doc, getDocs, getFirestore, orderBy, query, setDoc } from 'firebase/firestore';
import { getApp, getApps, initializeApp } from 'firebase/app';
import { Familiar } from '../modelos/familiar';
import { firebaseConfig, firebaseEstaConfigurado } from '../firebase.config';

type FamiliarNuevo = {
  apellido: string;
  descripcion: string;
  fechaNac: string;
  nombre: string;
  parentesco: string;
  signoZod: string;
};

@Injectable({
  providedIn: 'root',
})
export class ServFamilia {
  readonly familia = signal<Familiar[]>([]);
  readonly cargando = signal(false);
  readonly error = signal('');
  readonly backendDisponible = signal(firebaseEstaConfigurado());

  private readonly storageKey = 'roblesnino_familia_local';
  private firestore = this.backendDisponible()
    ? getFirestore(getApps().length ? getApp() : initializeApp(firebaseConfig))
    : null;

  async cargarFamilia(usuarioId: string): Promise<void> {
    if (!usuarioId) {
      this.familia.set([]);
      return;
    }

    this.cargando.set(true);
    this.error.set('');

    try {
      if (this.firestore) {
        await this.cargarDesdeFirestore(usuarioId);
      } else {
        this.cargarDesdeLocal(usuarioId);
      }
    } catch (error) {
      console.error('No se pudo cargar la familia.', error);
      this.error.set('No se pudo cargar la familia. Revisa tu configuracion de Cloud.');
      this.cargarDesdeLocal(usuarioId);
    } finally {
      this.cargando.set(false);
    }
  }

  async agregarFamiliar(usuarioId: string, familiar: FamiliarNuevo): Promise<void> {
    if (!usuarioId) {
      this.error.set('Primero necesitas iniciar sesion para agregar familiares.');
      return;
    }

    this.error.set('');

    const nuevoFamiliar: Familiar = {
      id: this.generarId(),
      nombre: familiar.nombre.trim(),
      apellido: familiar.apellido.trim(),
      fechaNac: familiar.fechaNac,
      signoZod: familiar.signoZod.trim(),
      parentesco: familiar.parentesco.trim(),
      descripcion: familiar.descripcion.trim(),
      creadoPor: usuarioId,
      creadoEn: new Date().toISOString(),
    };

    try {
      if (this.firestore) {
        const familiarRef = doc(this.firestore, 'usuarios', usuarioId, 'familiares', nuevoFamiliar.id);
        await setDoc(familiarRef, nuevoFamiliar);
      }

      this.guardarEnLocal(usuarioId, nuevoFamiliar);
      await this.cargarFamilia(usuarioId);
    } catch (error) {
      console.error('No se pudo guardar el familiar.', error);
      this.error.set('No se pudo guardar el familiar. Revisa tu configuracion de Cloud.');
    }
  }

  async actualizarFamiliar(usuarioId: string, familiar: Familiar): Promise<void> {
    if (!usuarioId) {
      this.error.set('Primero necesitas iniciar sesion para editar familiares.');
      return;
    }

    this.error.set('');

    try {
      if (this.firestore) {
        const familiarRef = doc(this.firestore, 'usuarios', usuarioId, 'familiares', familiar.id);
        await setDoc(familiarRef, familiar);
      }

      this.actualizarEnLocal(usuarioId, familiar);
      await this.cargarFamilia(usuarioId);
    } catch (error) {
      console.error('No se pudo actualizar el familiar.', error);
      this.error.set('No se pudo actualizar el familiar. Revisa tu configuracion de Cloud.');
    }
  }

  consultarFamiliarPorId(id: string): Familiar | undefined {
    return this.familia().find((persona) => persona.id === id);
  }

  private async cargarDesdeFirestore(usuarioId: string): Promise<void> {
    if (!this.firestore) {
      return;
    }

    const familiaresRef = collection(this.firestore, 'usuarios', usuarioId, 'familiares');
    const consulta = query(familiaresRef, orderBy('creadoEn', 'desc'));
    const snapshot = await getDocs(consulta);
    const familiares = snapshot.docs.map((doc) => doc.data() as Familiar);
    this.familia.set(familiares);

    if (familiares.length > 0) {
      localStorage.setItem(this.obtenerLlaveUsuario(usuarioId), JSON.stringify(familiares));
      return;
    }

    this.cargarDesdeLocal(usuarioId);
  }

  private cargarDesdeLocal(usuarioId: string): void {
    const datos = localStorage.getItem(this.obtenerLlaveUsuario(usuarioId));
    if (!datos) {
      this.familia.set([]);
      return;
    }

    try {
      this.familia.set(JSON.parse(datos) as Familiar[]);
    } catch {
      this.familia.set([]);
    }
  }

  private guardarEnLocal(usuarioId: string, nuevoFamiliar: Familiar): void {
    const actuales = this.leerLocales(usuarioId);
    const actualizados = [nuevoFamiliar, ...actuales];
    localStorage.setItem(this.obtenerLlaveUsuario(usuarioId), JSON.stringify(actualizados));
  }

  private actualizarEnLocal(usuarioId: string, familiarActualizado: Familiar): void {
    const actuales = this.leerLocales(usuarioId);
    const actualizados = actuales.map((persona) =>
      persona.id === familiarActualizado.id ? familiarActualizado : persona
    );
    localStorage.setItem(this.obtenerLlaveUsuario(usuarioId), JSON.stringify(actualizados));
  }

  private leerLocales(usuarioId: string): Familiar[] {
    const datos = localStorage.getItem(this.obtenerLlaveUsuario(usuarioId));
    if (!datos) {
      return [];
    }

    try {
      return JSON.parse(datos) as Familiar[];
    } catch {
      return [];
    }
  }

  private obtenerLlaveUsuario(usuarioId: string): string {
    return `${this.storageKey}:${usuarioId}`;
  }

  private generarId(): string {
    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }
}
