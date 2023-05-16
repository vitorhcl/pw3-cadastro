import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
  cadastroForm: FormGroup;

  constructor(private builder: FormBuilder){
    this.cadastroForm = builder.group({
      nome: ['', Validators.required],
      usuario: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)] ],
      email:['', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
      senha: ['', Validators.required, Validators.minLength(8), Validators.maxLength(12)],
      confirmaSenha: ['', Validators.required],
      aceite: [false, Validators.requiredTrue]
    }, {validators: this.checkPasswords})
  }

  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {
    let pass = group.get('senha')?.value;
    let confirmPass = group.get('confirmaSenha')?.value;
    return pass === confirmPass ? null : { notSame: true }
  }

  cadastrar() {
    console.log(this.cadastroForm.value);
  }
}
