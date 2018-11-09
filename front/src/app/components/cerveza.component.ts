import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CervezasServices } from '../services/cervezas.services';
import { Cerveza } from '../models/cerveza';
import { GLOBAL } from '../services/global';

@Component({
    selector: 'cervezas',
    templateUrl: '../views/cerveza.html',
    providers: [CervezasServices]
})

export class CervezaComponent implements OnInit {
    public cervezas: Cerveza;
    public url = '';
    public href: string = "";
    public id: string;
    public cerveza: Cerveza;
    public backend: string;

    constructor(private _cervezaServices: CervezasServices ,private router: Router) {
        this.backend = GLOBAL.url;
        this.href = this.router.url;
        this.url = this.href.replace('/','');
        this.id = this.url.split('/')[1];

        this.cerveza = new Cerveza('', '', '', '', '', '', false, 0, '', '');
    }

    ngOnInit() {
        this._cervezaServices.getCerveza(this.id).subscribe(
            response => {
                console.log(response);
                if(!response.cerveza) {
                    alert('Error obteniendo el coche.');
                } else {
                    this.cerveza = response.cerveza;
                }
            },
            error => {
                var body = JSON.parse(error._body);
                alert(body.message);
            }
        );
    }
}