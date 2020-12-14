import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClientesService } from 'src/app/clientes.service';
import { Cliente } from '../cliente.model';

@Component({
  selector: 'app-clientes-lista',
  templateUrl: './clientes-lista.component.html',
  styleUrls: ['./clientes-lista.component.css']
})
export class ClientesListaComponent implements OnInit {

  clientes: Cliente[] = [];
  clienteSelecionado: Cliente;

  constructor(
    private clienteService: ClientesService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.clienteService.getClientes()
      .subscribe(
        response => {
          this.clientes = response;
        }
      )
  }

  novoCadastro(){
    this.router.navigate(['/clientes-form']);
  }

  atualizar(id: number){
    this.router.navigate([`/clientes-form/${id}`]);
  }

  preparaDelecao(cliente: Cliente){
    this.clienteSelecionado = cliente;

  }

  deletarCliente(){
    this.clienteService.deletar(this.clienteSelecionado)
      .subscribe( response => {
        this.toastr.success('Cliente excluído com sucesso');
        this.ngOnInit();
      },
      err => {
        this.toastr.error(err.error.errors);
      }
    )
  }

}
