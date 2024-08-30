import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Usuario } from '../_models/Usuario';
import { HttpClient } from '@angular/common/http';
import { GenericsService } from './generics.service';

@Injectable()
export class UserInfoService extends GenericsService {
  constructor(public http: HttpClient) {
    super(http);
  }

  public userChanged$ = new Subject();

  getUserId(): number {
    try {
      return JSON.parse(localStorage.getItem('currentUser')).id;
    } catch (e) {
      return 0;
    }
  }

  changePhotoUser(foto: string): void {
    const result = localStorage.getItem('currentUser');
    if (!result) { return; }

    const usuario = JSON.parse(result);
    usuario.foto = foto;

    localStorage.setItem('currentUser', JSON.stringify(usuario));

    this.userChanged$.next();
  }

  // async loadUser(): Usuario {
  //   this.http.get('usuarios')
  // }
}
