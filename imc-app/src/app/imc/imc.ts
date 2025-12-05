// importa o decorator @Component, usado para definir um componente Angular
import { Component } from '@angular/core';

// importa CommonModule que fornece diretivas básicas do Angular (ngIf, ngFor, etc.)
import { CommonModule } from '@angular/common';

// importa utilitários de formulários reativos: FormBuilder (construtor), FormGroup (tipo do form),
// ReactiveFormsModule (módulo que habilita formGroup no template) e Validators (validações prontas)
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  // seletor CSS do componente — tag que você usa no HTML: <app-imc></app-imc>
  selector: 'app-imc',

  // arquivo HTML do template deste componente
  templateUrl: './imc.html',

  // arquivo(s) CSS com estilos específicos deste componente
  styleUrls: ['./imc.css'],

  // indica que este é um componente standalone (não precisa ser declarado em um NgModule)
  standalone: true,

  // módulos que este componente precisa para funcionar (equivalente a imports de um NgModule)
  // CommonModule -> fornece *ngIf, *ngFor; ReactiveFormsModule -> habilita formGroup, formControlName, etc.
  imports: [CommonModule, ReactiveFormsModule]
})
// declaração da classe do componente; o nome da classe aqui é "Imc"
export class Imc {
  // declaração da propriedade imcForm do tipo FormGroup.
  // o "!" diz ao TypeScript que a variável será inicializada depois (definite assignment assertion).
  imcForm!: FormGroup;

  // guarda o resultado numérico do IMC; inicialmente null (ainda não calculado)
  imcResultado: number | null = null;

  // guarda a string com a classificação do IMC (ex.: 'Peso normal')
  classificacao = '';

  // construtor da classe — o Angular injeta aqui o FormBuilder (serviço para criar formulários)
  constructor(private fb: FormBuilder) {
    // inicializa o FormGroup usando o FormBuilder.
    // cria dois controles: peso e altura, ambos como strings inicialmente vazias '',
    // com validadores: required (obrigatório) e min (valor mínimo)
    this.imcForm = this.fb.group({
      peso: ['', [Validators.required, Validators.min(1)]],
      altura: ['', [Validators.required, Validators.min(0.5)]]
    });
  }

  // método chamado pelo template quando o usuário submete o formulário
  calcularIMC() {
    // verifica se o formulário é válido antes de calcular
    if (this.imcForm.valid) {
      // pega o valor do campo 'peso' e converte para Number
      const peso = Number(this.imcForm.value.peso);

      // pega o valor do campo 'altura' e converte para Number
      const altura = Number(this.imcForm.value.altura);

      // calcula o IMC: peso / (altura * altura), arredonda para 2 casas decimais
      // Number(...toFixed(2)) garante que o resultado seja número (não string)
      this.imcResultado = Number((peso / (altura * altura)).toFixed(2));

      // define a classificação textual com base no valor calculado
      this.classificacao = this.classificar(this.imcResultado);
    }
  }

  // método privado que recebe um número (imc) e retorna a classificação como string
  private classificar(imc: number): string {
    // se o IMC for menor que 18.5
    if (imc < 18.5) return 'Abaixo do peso';

    // se o IMC for menor que 24.9 (e >= 18.5)
    if (imc < 24.9) return 'Peso normal';

    // se o IMC for menor que 29.9 (e >= 24.9)
    if (imc < 29.9) return 'Sobrepeso';

    // caso contrário (>= 29.9)
    return 'Obesidade';
  }
}
