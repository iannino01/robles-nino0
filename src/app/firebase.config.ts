export const firebaseConfig = {
  apiKey: 'AIzaSyC_lhLk2OR9ml3eECbd16Lbe0TmoGtm7PE',
  authDomain: 'familia-robles-nino.firebaseapp.com',
  projectId: 'familia-robles-nino',
  storageBucket: 'familia-robles-nino.firebasestorage.app',
  messagingSenderId: '111081559581',
  appId: '1:111081559581:web:426e5bd9518237265c98f4',
};

export function firebaseEstaConfigurado(): boolean {
  return Object.values(firebaseConfig).every((valor) => valor.trim().length > 0);
}
