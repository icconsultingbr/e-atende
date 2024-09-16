import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common';
import { AppService } from './app.service';
import { Menu } from './_core/_models/Menu';
import { AuthGuard } from './_core/_guards';
import { Usuario } from './_core/_models/Usuario';
import { Util } from './_core/_util/Util';
import { LoginService } from './login/login.service';
import { ParametroSeguranca } from './_core/_models/ParametroSeguranca';
import { SocketService } from './_core/_services/socket.service';
import { AuthService } from './_core/auth/auth.service';
import { Observable, Subscription } from 'rxjs';
import { environment } from '../environments/environment';
import { Especialidade } from './_core/_models/Especialidade';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, AfterViewInit {
  urlFoto: string = Util.urlapi + '/profile/';
  usuario: Usuario = new Usuario();
  route = '';
  menus: Menu[];
  parametrosSeguranca: ParametroSeguranca[];
  parametrosEspecialidade: Especialidade;
  image$: Observable<string>;
  pathFiles = `${environment.apiUrl}/fotos`;
  clicked: string = null;
  showMenu = true;
  estabelecimentoNome: string = null;
  externalUrls: string[] = ['paciente-link-temporario'];

  constructor(
    public service: AppService,
    private router: Router,
    private location: Location,
    private auth: AuthGuard,
    public loginService: LoginService,
    private elementRef: ElementRef,
    private socketService: SocketService,
    private authService: AuthService) { }

  getMenuLista() {
    this.service.list().subscribe(menu => {
      this.menus = menu;
      this.usuario = this.auth.getUser();

      localStorage.setItem('menu', JSON.stringify(menu));

    }, erro => {
      if (erro.status == 401) {
        this.loginService.logout();
        this.router.navigate(['/login']);
      }
    });
  }

  getUrlsParametroLista() {
    this.service.listUrls().subscribe(url => {
      this.parametrosSeguranca = url;

      this.usuario = this.auth.getUser();

      localStorage.setItem('parametro_seguranca', JSON.stringify(url));
    }, erro => {
      if (erro.status == 401) {
        this.loginService.logout();
        this.router.navigate(['/login']);
      }
    });
  }

  getParametroProfissional() {
    this.service.listEspecialidade().subscribe(parametros => {
      this.parametrosEspecialidade = parametros;

      localStorage.setItem('especialidade', JSON.stringify(parametros));
    }, erro => {
      if (erro.status == 401) {
        this.loginService.logout();
        this.router.navigate(['/login']);
      }
    });
  }

  abre() {
    this.showMenu = !this.showMenu;
  }

  fecha() {
    this.showMenu = false;
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (this.location.path() != '') {
          this.route = this.location.path();
        } else {
          this.route = '/';
        }
      }
    });

    const currentHref = window.location.href
    const externalRoute = this.externalUrls.find(x => currentHref.includes(x))
    if (externalRoute) {
      const [, route] = currentHref.split('/#/')
      console.log('route', route)

      this.route = route;

      // return this.router.navigate([route])
      return;
    }

    if (this.auth.canActivate()) {
      this.getMenuLista();
      this.getUrlsParametroLista();
      this.getParametroProfissional();
    }

    const token = this.authService.getToken();
    console.log('TOKEN GET TOKEN ', token);
    if (!token) {
      return;
    }

    this.socketService.connect()
      .subscribe(result => {
        console.log(`notificação sistema ${result}`);
      }, (error) => {
      });
  }

  ngAfterViewInit() {
    if (location.pathname != '/login') {
      this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#FFFFFF';
    }

    if (localStorage.getItem('est')) {
      this.estabelecimentoNome = JSON.parse(localStorage.getItem('est'))[0].nomeFantasia;
    }
  }

  sideNavClick(clicked: string) {
    this.clicked = this.clicked == clicked ? null : clicked;
  }

  sideNavAlert(): void {
    alert('sublist item clicked');
  }

  getRouterLink(menu: any) {
    if (menu.tipo === 1) {
      return menu.rota;
    } else {
      return '/url-externa/' + menu.id;
    }
  }
}
