import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Usuario } from '../_models/Usuario';
import { LoginService } from '../../login/login.service';

@Injectable()
export class AuthGuard implements CanActivate {
  usuario: Usuario = new Usuario();
  menu: string[] = [];
  externalUrls: string[] = ['paciente-link-temporario'];


  constructor(private router: Router, private loginService: LoginService) {

  }

  canActivate() {
    console.log(window.location.href);

    if (localStorage.getItem('currentUser')) {
      const user: any = this.getUser();

      const urlRoute = this.router.url.split('/');
      this.loginService.validaToken();

      if (this.router.url == '/not-found') {
        return true;
      }

      if (this.menu.length == 0) {
        const menuItems = user.menu;

        for (const item of menuItems) {
          this.menu.push(item.rota);
          this.menu.push(item.rota + '-form');
          this.menu.push(item.rota + '-view');
        }
      }

      if (this.menu.includes(this.router.url) || this.menu.includes('/' + urlRoute[1]) || urlRoute[1] == 'url-externa') {
        return true;
      } else {
        this.router.navigate(['/not-found']);
        return false;
      }
    }
    const currentHref = window.location.href
    const externalRoute = this.externalUrls.find(x => currentHref.includes(x))
    if (!externalRoute) {
      this.router.navigate(['/login']);
    }
    return true;
  }




  getToken() {
    if (this.canActivate()) {
      const user = JSON.parse(localStorage.getItem('currentUser'));
      return user ? user.token : '';

    }
  }

  getUser() {
    if (this.usuario.email == null) {
      return this.usuario = JSON.parse(localStorage.getItem('currentUser'));
    } else {
      return this.usuario;
    }
  }
}
