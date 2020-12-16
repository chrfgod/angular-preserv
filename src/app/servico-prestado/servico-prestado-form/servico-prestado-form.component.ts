import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClientesService } from 'src/app/clientes.service';
import { Cliente } from 'src/app/clientes/cliente.model';
import { ServicoPrestadoService } from 'src/app/servico-prestado.service';
import { ServicoPrestado } from '../servicoPrestado.model';

@Component({
  selector: 'app-servico-prestado-form',
  templateUrl: './servico-prestado-form.component.html',
  styleUrls: ['./servico-prestado-form.component.css']
})
export class ServicoPrestadoFormComponent implements OnInit {

  clientes: Cliente[] = [];

  public formulario: FormGroup = new FormGroup({
    descricao: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(150)]),
    preco: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(20)]),
    data: new FormControl(null, [Validators.required]),
    idCliente: new FormControl(null, [Validators.required])
  });

  constructor(
    private clienteService: ClientesService,
    private toastr: ToastrService,
    private servicoService: ServicoPrestadoService,
    private router: Router
  ) {
   }

  ngOnInit(): void {
    this.clienteService.getClientes()
      .subscribe(
        response => {
          this.clientes = response;
        }
      )
  }

  cadastrar(){
    let servicoPrestado: ServicoPrestado = new ServicoPrestado(
      this.formulario.value.descricao,
      this.formulario.value.preco,
      this.formulario.value.data,
      this.formulario.value.idCliente
    )    
    this.servicoService.salvar(servicoPrestado)
      .subscribe(
        response => {
          console.log(response);
          this.toastr.success('Serviço cadastrado com sucesso');
          this.router.navigate(['/servico-prestado/lista'])
        },
        err => {
          this.toastr.error(err.error.errors);
        }
      )
  }

}
