import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'sobre-nosotros',
    templateUrl: '../views/sobre-nosotros.html'
})

export class SobreNosotrosComponent implements OnInit {

    constructor(private router: Router) {
    }

    ngOnInit() {
    }
}