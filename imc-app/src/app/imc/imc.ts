import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  // mantenha o selector que o CLI gerou
  selector: 'app-imc',
  templateUrl: './imc.html',
  styleUrls: ['./imc.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class Imc {
  imcForm!: FormGroup;
  imcResultado: number | null = null;
  classificacao = '';

  constructor(private fb: FormBuilder) {
    // inicializa o form aqui (não no campo)
    this.imcForm = this.fb.group({
      peso: ['', [Validators.required, Validators.min(1)]],
      altura: ['', [Validators.required, Validators.min(0.5)]]
    });
  }

  calcularIMC() {
    if (this.imcForm.valid) {
      const peso = Number(this.imcForm.value.peso);
      const altura = Number(this.imcForm.value.altura);
      this.imcResultado = Number((peso / (altura * altura)).toFixed(2));
      this.classificacao = this.classificar(this.imcResultado);
    }
  }

  private classificar(imc: number): string {
    if (imc < 18.5) return 'Abaixo do peso';
    if (imc < 24.9) return 'Peso normal';
    if (imc < 29.9) return 'Sobrepeso';
    return 'Obesidade';
  }
}
