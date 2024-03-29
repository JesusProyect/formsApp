import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';

@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html',
  styles: [
  ]
})
export class SwitchesComponent implements OnInit  {

  constructor( private fb: FormBuilder) { }

  ngOnInit(): void {
    this.miFormulario.reset( {
      ...this.persona,
      condiciones: false
    } );

    //suscribirse a un campo en concreto
    //this.miFormulario.get('condiciones')?.valueChanges.subscribe( newValue => {
      //console.log(newValue)
    //})
   //suscribirse al formulario
    this.miFormulario.valueChanges.subscribe( ({ condiciones, ...rest }) => {
      this.persona = rest;
    })

  }

  miFormulario: FormGroup = this.fb.group({
    genero: [ 'M', Validators.required ],
    notificaciones: [ true, Validators.required ],
    condiciones: [false, Validators.requiredTrue]

  });

  persona = {
    genero: 'F',
    notificaciones: true
  }

  guardar(){

    const formValue = { ...this.miFormulario.value };

    delete formValue.condiciones;

    this.persona = formValue;
    

  }

}
