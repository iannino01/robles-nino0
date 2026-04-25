import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ServFamilia {

  constructor() { }

  
  arregloFamilia: any[] = [
  
    {
    id : 1,
    nombre : 'Ian David',
    apellido : 'Robles Nino',
    fecha_nac : '1/04/06',
    signo_zod : ''
    },

    {
    id : 2,
    nombre : 'Maria Victoria',
    apellido : 'Nino Herrera',
    fecha_nac : '27/12/74',
    signo_zod : ''
    },

    {
    id : 3,
    nombre : 'Daniel Isai',
    apellido : 'Robles Nino',
    fecha_nac : '28/11/04',
    signo_zod : ''
    },

    {
    id : 4,
    nombre : 'Monica Yaresy',
    apellido : 'Pachicano Nino',
    fecha_nac : '17/03/92',
    signo_zod : ''
    },
    
      {
    id : 5,
    nombre : 'Katia Gissell',
    apellido : 'Pachicano Nino',
    fecha_nac : '16/05/94',
    signo_zod : ''
    },


    {
    id : 6,
    nombre : 'Danisse',
    apellido : 'Pachicano Nino',
    fecha_nac : '14/07/06',
    signo_zod : ''
    },
    
  ];

consultarFamilia(){
  return this.arregloFamilia;
}

}

