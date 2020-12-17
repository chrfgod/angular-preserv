import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';
import { Usuario } from './usuario.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  cadastro: boolean = false;

  public formulario: FormGroup = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required])
  })

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
  }

  submit(){
    this.auth.logar(this.formulario.value.username, this.formulario.value.password)
      .subscribe(
        response => {
          const access_token = JSON.stringify(response);
          localStorage.setItem('access_token', access_token)
          this.toastr.success('Login realizado com sucesso');
          this.router.navigate(['/home'])
        },
        err => {          
          this.toastr.error('Usuário ou senha incorretos');
        }
      )
  }

  preparaCadastro(event){
    event.preventDefault();
    this.cadastro = true;
    this.formulario.controls.username.setValue('');
    this.formulario.controls.password.setValue('');
  }

  voltarLogin(){
    this.cadastro = false;
    this.formulario.controls.username.setValue('');
    this.formulario.controls.password.setValue('');
  }

  cadastrar(){
    const usuario: Usuario = new Usuario();
    usuario.username = this.formulario.value.username;
    usuario.password = this.formulario.value.password;
    this.auth.salvar(usuario)
      .subscribe(
        response => {
          this.toastr.success('Cadastro realizado com sucesso');
          this.cadastro = false;
          this.formulario.controls.username.setValue('');
          this.formulario.controls.password.setValue('');
        },
        err => {
          this.toastr.error(err.error.errors);
        }
      )
  }

}
