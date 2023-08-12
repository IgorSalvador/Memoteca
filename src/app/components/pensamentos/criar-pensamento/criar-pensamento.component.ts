import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-criar-pensamento',
  templateUrl: './criar-pensamento.component.html',
  styleUrls: ['./criar-pensamento.component.css']
})
export class CriarPensamentoComponent implements OnInit {
  public formulario: FormGroup;

  constructor(private service: PensamentoService, private router: Router, private formBuilder: FormBuilder) { 
    this.formulario = this.formBuilder.group({
      conteudo: ["", Validators.compose([Validators.required, Validators.pattern(/(.|\s)*\S(.|\s)*/)])],
      autoria: ["", Validators.compose([Validators.required, Validators.minLength(5)])],
      modelo: ["modelo1"]
    });
  }

  ngOnInit(): void {

  }

  criarPensamento() {
    console.log(this.formulario.get("autoria")?.errors);

    if(this.formulario.valid){
      this.service.criar(this.formulario.value).subscribe(() => this.router.navigate(['/listarPensamento']));
    }
  }

  cancelar() {
    this.router.navigate(['/listarPensamento']);
  }
}


