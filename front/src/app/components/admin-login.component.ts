import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario';
import { Cerveza } from '../models/cerveza';
import { UsuarioServices } from '../services/usuario.services';
import { CervezasServices } from '../services/cervezas.services';

@Component({
  selector: 'admin-login',
  templateUrl: '../views/admin-login.html',
  providers: [UsuarioServices]
})

export class AdminLoginComponent implements OnInit {
  public usuario: Usuario;
  public cervezas: Cerveza[];
  public cerveza : Cerveza;
  public identity;
  public token;
  public errorMessage;

  constructor(private _cervezaServices: CervezasServices, private _usuarioService: UsuarioServices, private router: Router) {
    this.usuario = new Usuario('', '', '', '');
    this.cerveza =  new Cerveza('', '', '','','','', false, 0, '', '');
  }

  ngOnInit() {
    this.identity = this._usuarioService.getIdentity();
    this.token = this._usuarioService.getToken();

    this._cervezaServices.getCervezas().subscribe(
      response => {
        if (!response.cervezas) {
          alert('Error obteniendo los coches.');
        } else {
          this.cervezas = response.cervezas;
          console.log(this.cervezas);
        }
      },
      error => {
        var body = JSON.parse(error._body);
        alert(body.message);
      }
    );
  }

  public onSubmit() {
    console.log('entra al boton');
    this._usuarioService.signup(this.usuario)
      .subscribe(response => {
        console.log('entra al subscribe');
        let identity = response.user;
        this.identity = identity;

        if (!this.identity._id) {
          alert('El usuario no está correctamente identificado');
        } else {
          localStorage.setItem('identity', JSON.stringify(this.identity));

          this._usuarioService.signup(this.usuario, 'true')
            .subscribe(response => {
              let token = response.token;
              this.token = token;

              if (this.token.length <= 0) {
                alert('El token no se ha generado correctamente.');
              } else {
                localStorage.setItem('token', this.token);
                console.log('logueao');

                this.usuario = new Usuario('', '', '', '');
              }
            }, error => {
              this.errorMessage = <any>error;

              if (this.errorMessage != null) {
                var body = JSON.parse(error._body);
                this.errorMessage = body.message;
              }
            });
        }
      }, error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          var body = JSON.parse(error._body);
          this.errorMessage = body.message;
        }
      });
  }

  public logout() {
    localStorage.removeItem('identity');
    localStorage.removeItem('token');

    this.identity = null;
    this.token = null;
  }

  borrarCerveza(id) {
    this._cervezaServices.borrarCerveza(id).subscribe(
      response => {
        if (!response.cerveza) {
          //this.alert = 'No deletions were made.';
        } else {
          this.ngOnInit()
        }
      },
      error => {
        var body = JSON.parse(error._body)
        //this.alert = <any>error;

        /*if (this.alert != null) {
            var body = JSON.parse(error._body)
            //this.alert = body.message
        }*/
      }
    )
  }
}