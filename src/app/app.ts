import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Imc } from './imc/imc'; // importa o componente standalone Imc

@Component({
  selector: 'app-root',
  templateUrl: './app.html',   // <- arquivo app.html
  styleUrls: ['./app.css'],   // <- CSS carregado automaticamente,
  standalone: true,
  imports: [CommonModule, Imc] // garante que <app-imc> é conhecido
})
export class App { }
