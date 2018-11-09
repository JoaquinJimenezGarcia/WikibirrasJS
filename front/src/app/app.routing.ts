import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Importar componentes del usuario
import { SobreNosotrosComponent } from './components/sobre-nosotros.component';
import { CervezasComponent } from './components/cervezas.component';
import { AdminLoginComponent } from './components/admin-login.component';
import { AdminCervezaComponent } from './components/admin-cerveza.component';
import { CervezaComponent } from './components/cerveza.component';
import { EditarCervezaComponent } from './components/editar-cerveza.component';

const appRoutes: Routes = [
    {path: '', component: CervezasComponent},
    {path: 'index', component: CervezasComponent},
    {path: 'sobre-nosotros', component: SobreNosotrosComponent},
    {path: 'cervezas', component: CervezasComponent},
    {path: 'admin-login', component: AdminLoginComponent},
    {path: 'admin-cerveza', component: AdminCervezaComponent},
    {path: 'cerveza/:id', component: CervezaComponent},
    {path: 'editar-cerveza/:id', component: EditarCervezaComponent},
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);