import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CervezasServices } from '../services/cervezas.services';
import { Cerveza } from '../models/cerveza';
import { UsuarioServices } from '../services/usuario.services';
import { GLOBAL } from '../services/global';

@Component({
    selector: 'coches',
    templateUrl: '../views/editar-cerveza.html',
    providers: [CervezasServices]
})

export class EditarCervezaComponent implements OnInit {
    public cervezas: Cerveza[];
    public url = '';
    public href: string = "";
    public id: string;
    public cerveza: Cerveza;
    public identity;
    public token;
    public backend: string;

    constructor(private _usuarioService: UsuarioServices, private _cervezaServices: CervezasServices ,private router: Router) {
        this.identity = this._usuarioService.getIdentity();
        this.token = this._usuarioService.getToken();
        this.href = this.router.url;
        this.url = this.href.replace('/','');
        this.id = this.url.split('/')[1];
        this.backend = GLOBAL.url;
        this.cargarCerveza();
    }

    ngOnInit() {
    }

    cargarCerveza() {
        this._cervezaServices.getCerveza(this.id).subscribe(
            response => {
                if(!response.cerveza) {
                    alert('Error obteniendo el coche.');
                } else {
                    this.cerveza = new Cerveza(
                        response.cerveza[0]._id,
                        response.cerveza[0].nombre,
                        response.cerveza[0].origen,
                        response.cerveza[0].tipo,
                        response.cerveza[0].descripcion_corta,
                        response.cerveza[0].descripcion_larga,
                        response.cerveza[0].diabeticos,
                        response.cerveza[0].graduacion,
                        response.cerveza[0].imagen,
                        response.cerveza[0].link_compra
                    )
                }
            },
            error => {
                var body = JSON.parse(error._body);
                alert(body.message);
            }
        );
    }

    public onSubmit() {
        this._cervezaServices.actualizaCerveza(this.cerveza).subscribe(
            response => {
                    //console.log(response);
                    if(response.cerveza) {
                        if(this.filesToUpload) {
                            console.log(this.cerveza._id);
                            
                            console.log('justo antes del make file request');
                            this.makeFileRequest(this.backend+'subir-foto/'+this.cerveza._id, [], this.filesToUpload)
                                .then(
                                    (result: any) => {
                                        console.log(result);
                                        //this.cerveza.image = result.image;
                                        console.log('Coche listo');
                                        //console.log(this.coche);
                                        alert('Actualizado con éxito');
                                        this.ngOnInit();
                                    }
                                );
                        }

                        
                    }
                },
            error => {
                    alert('Ha ocurrido un error inesperado actualizando su vehículo.');
                }
            );
    }

    public filesToUpload: Array<File>;

    fileChangeEvent(fileInput: any){
        this.filesToUpload = <Array<File>>fileInput.target.files;
        console.log(this.filesToUpload);
    }

    makeFileRequest(backend: string, params: Array<string>, files: Array<File>) {
        var token = this.token;

        return new Promise(function(resolve, reject){
            console.log('Entra al primer return');
            var formData: any = new FormData();
            var xhr = new XMLHttpRequest();

            for(var i = 0; i < files.length; i++) {
                console.log('Entra al for. Vuelta: ' + i);
                formData.append('image', files[i], files[i].name);
            }

            console.log('Sale del for');

            xhr.onreadystatechange = function() {
                console.log('Entra en onreadystatechange');
                console.log(xhr.readyState);
                if(xhr.readyState == 4) {
                    console.log('Entra en readystate');
                    if(xhr.status == 200) {
                        console.log('Entra en status');
                        resolve(JSON.parse(xhr.response));
                    } else {
                        console.log('Hace el reject');
                        reject(xhr.response);
                    }
                    
                }
            }
            console.log('En el open');
            xhr.open('POST', backend, true);
            console.log('En el setRequestHeader');
            xhr.setRequestHeader('Authorization', token);
            console.log('Lo envia');
            xhr.send(formData);
        });
    }
}