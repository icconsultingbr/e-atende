import { Component, OnInit } from '@angular/core';
import { Caneta } from '../../_core/_models/Caneta';
import { FormBuilder } from '@angular/forms';
import { CanetaService } from './caneta.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-caneta-form',
  templateUrl: './caneta-form.component.html',
  styleUrls: ['./caneta-form.component.css'],
  providers: [CanetaService]
})
export class CanetaFormComponent implements OnInit {

  object: Caneta = new Caneta();
  method = 'caneta';
  fields = [];
  label = 'Caneta';
  id: Number = null;
  domains: any[] = [];

  constructor(
    fb: FormBuilder,
    private service: CanetaService,
    private route: ActivatedRoute) {
    this.fields = service.fields;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.loadDomains();
  }

  loadDomains() {

    this.service.listDomains('estabelecimento').subscribe(estabelecimentos => {
      this.service.listDomains('modelo-caneta').subscribe(modelosCaneta => {
          this.domains.push({
            idEstabelecimento: estabelecimentos,
            idModeloCaneta: modelosCaneta
          });
        });
    });
  }
}
