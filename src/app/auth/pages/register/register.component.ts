import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from '../../../shared/validator/validator.service';
import { EmailValidatorService } from '../../../shared/validator/email-validator.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [ Validators.required, Validators.pattern( this.vs.nombreApellidoPAttern ) ]],
    email: ['', [ Validators.required, Validators.pattern( this.vs.emailPattern ) ], [ this.emailValidator ]   ],
    username: ['', [ Validators.required, this.vs.noPuedeSerStrider ]],
    password: ['', [ Validators.required, Validators.minLength( 6 ) ] ],
    password2: ['', [ Validators.required ] ]
  },{
      validators: [ this.vs.camposIguales('password','password2') ]
  })

 

  get emailErrorMsg(): string {
    
    const emailInput = this.miFormulario.get('email');

    if( emailInput?.hasError( 'required' )){
      return 'Email obligatorio'
    }
    else if( emailInput?.hasError( 'pattern' )){
      return 'Formato de email no válido'
    }
    else if ( emailInput?.hasError( 'emailTomado' ) ){
      return 'El email ya existe'
    }

    return '';
  }

  constructor( private fb: FormBuilder,
               private vs: ValidatorService,
               private emailValidator: EmailValidatorService  ) { }

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: 'Fernando Herrera',
      email:'test1@test.com',
      username: 'jesus',
      password:'121212',
      password2:'121212'

    })
  }

  campoNoValido( campo: string ){
    return this.miFormulario.get( campo )?.invalid
              && this.miFormulario.get( campo )?.touched
  }



  // emailRequired(){
  //   return this.miFormulario.get( 'email' )?.hasError('required')
  //   && this.miFormulario.get( 'email' )?.touched
  // }

  // emailFormato(){
  //   return this.miFormulario.get( 'email' )?.hasError('pattern')
  //   && this.miFormulario.get( 'email' )?.touched
  // }

  // emailTomado(){
  //   return this.miFormulario.get( 'email' )?.hasError('emailTomado')
  //   && this.miFormulario.get( 'email' )?.touched
  // }

  submitFormulario(){
    console.log(this.miFormulario.value);
    this.miFormulario.markAllAsTouched();

  }

}
