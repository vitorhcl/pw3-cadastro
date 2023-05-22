import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
  cadastroForm: FormGroup;
  mostrarCampoSenha = false;
  mostrarCampoConfirmarSenha = false;

  constructor(private builder: FormBuilder){
    this.cadastroForm = builder.group({
      nome: ['', Validators.required],
      usuario: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)] ],
      email:['', [Validators.required, this.emailValidator(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
      senha: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]],
      confirmaSenha: ['', Validators.required],
      aceite: [false, Validators.requiredTrue]
    }, {validators: this.checkPasswords})
  }

  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {
    if(group.get('confirmaSenha')?.value == "")
      return null;
    let pass = group.get('senha')?.value;
    let confirmPass = group.get('confirmaSenha')?.value;
    return pass === confirmPass ? null : { differentPasswords: true }
  }

  emailValidator = (emailRe: RegExp): ValidatorFn =>
    (control: AbstractControl): ValidationErrors | null => {
      const valido = emailRe.test(control.value) || control.value == "";
      return valido ? null : {email: true};
    };

  cadastrar() {
    console.log(this.cadastroForm.value);
  }
}
