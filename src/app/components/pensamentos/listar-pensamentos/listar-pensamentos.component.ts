import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-pensamentos',
  templateUrl: './listar-pensamentos.component.html',
  styleUrls: ['./listar-pensamentos.component.css']
})
export class ListarPensamentosComponent implements OnInit{

  listaPensamentos : Pensamento[] = [];
  paginaAtual: number = 1;
  haMaisPensamentos: boolean = true;
  favoritos: boolean = false;
  filtro: string = "";
  listaFavoritos: Pensamento [] = [];
  titulo: string = "Meu Mural";

  constructor(private pensamentoService : PensamentoService, private router: Router){ }

  ngOnInit(): void {
    this.pensamentoService.listar(this.paginaAtual, this.filtro, this.favoritos).subscribe((listaPensamentos) => {
      this.listaPensamentos = listaPensamentos;
    })
  }

  recarregarComponente(){
    this.favoritos = false;
    this.paginaAtual = 1;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([this.router.url]);
  }

  carregarMaisPensamentos(){
    this.pensamentoService.listar(++this.paginaAtual, this.filtro, this.favoritos).subscribe(listaPensamentos => {
      this.listaPensamentos.push(...listaPensamentos);
      if(!listaPensamentos.length){
        this.haMaisPensamentos = false;
      }
    });
  }

  pesquisarPensamentos(){
    this.paginaAtual = 1;
    this.haMaisPensamentos = true;

    this.pensamentoService.listar(this.paginaAtual, this.filtro, this.favoritos).subscribe(listaPensamentos => {
      this.listaPensamentos = listaPensamentos;
    });
  }

  listarFavoritos(){
    this.favoritos = true;
    this.paginaAtual = 1;
    this.haMaisPensamentos = true;
    this.titulo = "Meus Favoritos";

    this.pensamentoService.listar(this.paginaAtual, this.filtro, this.favoritos).subscribe(listaPensamentos => {
      this.listaPensamentos = listaPensamentos;
      this.listaFavoritos = listaPensamentos;
    });
  }
}
