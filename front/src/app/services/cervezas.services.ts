import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';

@Injectable()
export class CervezasServices {
    public url: string;
    public identity;
    public token;

    constructor(private _http: Http) {
        this.url = GLOBAL.url;
    }

    crear(cerveza_a_insertar) {
        let json = JSON.stringify(cerveza_a_insertar);
        let params = json;
        let headers = new Headers({'Content-Type':'application/json',
        'Authorization': this.getToken()});

        return this._http.post(this.url+'agregar-cerveza', params, {headers: headers})
            .pipe(map(res => res.json()));
    }

    actualizaCerveza(cerveza_a_modificar) {
        var id = cerveza_a_modificar._id;
        let json = JSON.stringify(cerveza_a_modificar);
        let params = json;
        let headers = new Headers({'Content-Type':'application/json',
        'Authorization': this.getToken()});

        return this._http.put(this.url+'actualizar-cerveza/'+id, params, {headers: headers})
            .pipe(map(res => res.json()));
    }

    getCervezas() {
        let headers = new Headers({'Content-Type':'application/json'});
        let options = new RequestOptions({headers: headers})

        return this._http.get(this.url+'cervezas/', options)
            .pipe(map(res => res.json()));
    }

    getCerveza(id: string) {
        let headers = new Headers({'Content-Type':'application/json'});
        let options = new RequestOptions({headers: headers})

        return this._http.get(this.url+'cerveza/'+id, options)
            .pipe(map(res => res.json()));
    }

    borrarCerveza(id: string) {
        let headers = new Headers({'Content-Type':'application/json',
            'Authorization': this.getToken()})
        let options = new RequestOptions({headers: headers})

        return this._http.delete(this.url+'eliminar-cerveza/'+id, options)
            .pipe(map(res => res.json()))
    }

    getIdentity() {
        let identity = JSON.parse(localStorage.getItem('identity'));

        if(identity != 'undefined') {
            this.identity = identity;
        } else {
            this.identity = null;
        }

        return this.identity;
    }

    getToken() {
        let token = localStorage.getItem('token');

        if(token != 'undefined') {
            this.token = token;
        } else {
            this.token = null;
        }

        return this.token;
    }
}