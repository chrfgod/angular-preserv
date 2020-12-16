import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientesService } from 'src/app/clientes.service';
import { Cliente } from '../cliente.model';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css']
})
export class ClientesFormComponent implements OnInit {

  id: number;
  cliente: Cliente;
  param: boolean = false;

  public formulario: FormGroup = new FormGroup({
    nome: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(150)]),
    cpf: new FormControl(null, [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
    id: new FormControl(''),
    dataCadastro: new FormControl('')
  });


  constructor(
    private clienteService: ClientesService,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let params: Observable<Params> = this.activatedRoute.params;
    params.subscribe( urlParams => {      
      this.id = urlParams['id'];
      if (this.id){
        this.param = true;
        this.clienteService.getClienteById(this.id)
        .subscribe(
          response => {
            this.cliente = response
            this.formulario.controls.nome.setValue(this.cliente.nome);
            this.formulario.controls.cpf.setValue(this.cliente.cpf);
            this.formulario.controls.id.setValue(this.cliente.id);
            this.formulario.controls.dataCadastro.setValue(this.cliente.dataCadastro);
          },
          err => {
            console.log('Cliente não existe');
          }
        )
      }     

    })
  }

  cadastrar(){
    let cliente: Cliente = new Cliente(
      this.formulario.value.nome,
      this.formulario.value.cpf
    );
    this.clienteService.cadastrar(cliente)
      .subscribe(
        response => {
          this.toastr.success('Cliente cadastrado com sucesso');
          this.router.navigate(['/clientes-lista']);
        },
        err => {
          this.toastr.error(err.error.errors);
        }
      )
  }

  atualizar(){
    let cliente: Cliente = new Cliente(
      this.formulario.value.nome,
      this.formulario.value.cpf,
      this.formulario.value.id,
      this.formulario.value.dataCadastro
    );
    this.clienteService.atualizar(cliente)
      .subscribe(
        response => {
          this.toastr.success('Cliente atualizado com sucesso');
          this.router.navigate(['/clientes-lista']);
        },
        err => {
          this.toastr.error(err.error.errors);
        }
      )
  }
}
