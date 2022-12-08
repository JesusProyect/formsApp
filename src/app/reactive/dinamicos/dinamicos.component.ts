import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, Validator, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent implements OnInit {

  validacion: boolean = true;

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [ Validators.required, Validators.minLength(3) ]],
    favoritos: this.fb.array( [
      [ 'Metal Gear', Validators.required ],
      [ 'Death Stranding' , Validators.required]
    ], Validators.required )

  });

  nuevoFavorito: FormControl = this.fb.control('', Validators.required);

  get favoritosArr(){
    return this.miFormulario.get('favoritos') as FormArray;
  }
  constructor( private fb: FormBuilder ) { }

  ngOnInit(): void {
  }

  campoNoEsValido( campo: string ){
    return this.miFormulario.controls[campo].errors
              && this.miFormulario.controls[campo].touched
  }

  agregarFavorito(){
    if( this.nuevoFavorito.invalid ){
      this.validacion = false;
      return;
    }
    this.validacion = true;
    //this.favoritosArr.push( new FormControl( this.nuevoFavorito.value, Validators.required ) ) esta es otra forma;
    this.favoritosArr.push( this.fb.control( this.nuevoFavorito.value, Validators.required ) );
    this.nuevoFavorito.reset();
  }

  mostrarError( campo: string) {
    let error = '';

    for (const err of Object.keys(this.miFormulario.controls[campo].errors!)) {
          switch(err){
            case 'required' : error = ' Campo Requerido ';
             break;
            case 'minlength' : error = ' El campo debe tener una longitud minima de 3 caracteres ';
              break;
            default:
              error = err;
              break;
          }
          break;
      }
     return error;
  }

  guardar(){

      if( this.miFormulario.invalid){
        this.miFormulario.markAllAsTouched();
        return;
      }

      console.log( this.miFormulario.value);

      this.miFormulario.controls['nombre'].reset();
      this.nuevoFavorito.reset();

  }

  borrar(index: number){
    //(this.miFormulario.controls['favoritos'] as FormArray).controls.splice(index, 1);

    this.favoritosArr.removeAt( index );

  }

}
