import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Familiar } from '../../modelos/familiar';
import { ServFamilia } from '../../servicios/familia';

@Component({
  selector: 'app-detalle-familia',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './detalle-familia.html',
  styleUrl: './detalle-familia.css',
})
export class DetalleFamilia implements OnInit {
  protected persona?: Familiar;

  constructor(
    private route: ActivatedRoute,
    private servicioFamilia: ServFamilia
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.persona = this.servicioFamilia.consultarFamiliarPorId(id);
  }
}
