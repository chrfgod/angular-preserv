import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ServicoPrestadoService } from 'src/app/servico-prestado.service';
import { ServicoPrestadoBusca } from './servicoPrestadoBusca.model';

@Component({
  selector: 'app-servico-prestado-lista',
  templateUrl: './servico-prestado-lista.component.html',
  styleUrls: ['./servico-prestado-lista.component.css']
})
export class ServicoPrestadoListaComponent implements OnInit {

  nome: string;
  mes: number;
  meses: number[];
  lista: ServicoPrestadoBusca[];

  constructor(
    private servicoService: ServicoPrestadoService,
    private toastr: ToastrService
  ) {
    this.meses = [1,2,3,4,5,6,7,8,9,10,11,12]
   }

  ngOnInit(): void {
  }

  consultar(){
    this.servicoService.buscar(this.nome, this.mes)
      .subscribe(
        response => {
          this.lista = response;
          if (this.lista.length <=0){
            this.toastr.error('Nenhum registro encontrado');
          } else {
            this.toastr.success(this.lista.length + ' registro(s) encontrado(s)');
          }
        }
      )
  }

}
