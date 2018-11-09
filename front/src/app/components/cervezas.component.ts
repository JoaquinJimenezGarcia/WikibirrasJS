import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CervezasServices } from '../services/cervezas.services';
import { Cerveza } from '../models/cerveza';
import { GLOBAL } from '../services/global';

@Component({
    selector: 'cervezas',
    templateUrl: '../views/cervezas.html',
    providers: [CervezasServices]
})

export class CervezasComponent implements OnInit {
    public cervezas: Cerveza[];
    public backend: string;

    constructor(private _cervezaServices: CervezasServices ,private router: Router) {
        this.backend = GLOBAL.url;
    }

    ngOnInit() {
        this._cervezaServices.getCervezas().subscribe(
            response => {
                if(!response.cervezas) {
                    alert('Error obteniendo los coches.');
                } else {
                    this.cervezas = response.cervezas;
                }
            },
            error => {
                var body = JSON.parse(error._body);
                alert(body.message);
            }
        );
    }
}