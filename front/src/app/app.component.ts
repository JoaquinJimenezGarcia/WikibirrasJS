import { Component, OnInit } from '@angular/core';
import { Cerveza } from './models/cerveza';
import { CervezasServices } from './services/cervezas.services';
import { UsuarioServices } from './services/usuario.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [CervezasServices, UsuarioServices]
})

export class AppComponent implements OnInit {
  title = 'Destacados';

  constructor(private router: Router) {
  }

  ngOnInit() {
    
  }
}
