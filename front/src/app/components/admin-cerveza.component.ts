import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cerveza } from '../models/cerveza';
import { UsuarioServices } from '../services/usuario.services';
import { CervezasServices } from '../services/cervezas.services';

@Component({
    selector: 'admin-cervezas',
    templateUrl: '../views/admin-cerveza.html'
})

export class AdminCervezaComponent implements OnInit {
    public identity;
    public token;
    public cerveza: Cerveza;
    public alertCreation;

    constructor(private router: Router, private _usuarioService: UsuarioServices, private _cervezaServices: CervezasServices) {
        this.cerveza = new Cerveza('', '', '', '', '', '', false, 0, '', '');
    }

    ngOnInit() {
        this.identity = this._usuarioService.getIdentity();
        this.token = this._usuarioService.getToken();
    }

    public onSubmit() {
        this._cervezaServices.crear(this.cerveza)
            .subscribe(response => {
                console.log(response);
                let cerveza = response.cerveza;
                this.cerveza = cerveza;

                if (!cerveza._id) {
                    this.alertCreation = 'Error al añadir el coche';
                } else {
                    this.alertCreation = "Page created successfully";
                    this.cerveza = new Cerveza('', '', '', '', '', '', false, 0, '', '');
                    this.router.navigate(["/admin-login"]);
                }
            },
                error => {
                    console.log('Entra en el error');
                    this.alertCreation = <any>error;
                    console.log(error._body.message);

                    if (this.alertCreation != null) {
                        var body = JSON.parse(error._body);
                        this.alertCreation = body.message;
                    }

                }
            );
    }
}