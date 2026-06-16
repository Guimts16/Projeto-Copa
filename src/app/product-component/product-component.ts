import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Jogador } from '../jogador';
import { JogadorService } from '../product-service';

@Component({
  selector: 'app-jogador',
  standalone: false,
  templateUrl: './product-component.html',
  styleUrl: './product-component.css',
})
export class JogadorComponent implements OnInit {
  formGroupJogador: FormGroup;

  jogadores = signal<Jogador[]>([]);
  isEditing: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private service: JogadorService,
  ) {
    this.formGroupJogador = this.formBuilder.group({
      id: [''],
      nome: [''],
      selecao: [''],
      posicao: [''],
      obtida: [false],
    });
  }

  ngOnInit(): void {
    this.service.getAllJogadores().subscribe({
      next: (json) => this.jogadores.set(json),
    });
  }

  save() {
    const jogador = this.formGroupJogador.value as Jogador;

    if (jogador.nome === '' || jogador.selecao === '' || jogador.posicao === '') {
      alert('Preencha todos os campos antes de salvar.');
      return;
    }

    this.service.saveJogador(jogador).subscribe({
      next: (json) => {
        this.jogadores.update((jogadores) => [...jogadores, json]);
        this.formGroupJogador.reset();
      },
      error: (err) => {
        alert('Erro ao salvar o jogador: ' + err.message);
      },
    });
  }

  delete(jogador: Jogador) {
    this.service.deleteJogador(jogador.id).subscribe({
      next: () => {
        this.jogadores.update((jogadores) => jogadores.filter((j) => j.id !== jogador.id));
      },
      error: (err) => {
        alert('Erro ao deletar o jogador: ' + err.message);
      },
    });
  }

  onClickUpdate(jogador: Jogador) {
    this.formGroupJogador.setValue(jogador);
    this.isEditing = true;
  }

  update() {
    const jogador = this.formGroupJogador.value as Jogador;
    const jogadorId = jogador.id;

    if (!jogadorId) {
      alert('ID do jogador não encontrado');
      return;
    }

    this.service.updateJogador(jogadorId, jogador).subscribe({
      next: (json) => {
        this.jogadores.update((jogadores) => jogadores.map((j) => (j.id === json.id ? json : j)));
        this.isEditing = false;
        this.formGroupJogador.reset();
      },
      error: (err) => {
        alert('Erro ao atualizar o jogador: ' + err.message);
      },
    });
  }

  jogadoresPorSelecao() {
    const grouped = new Map<string, Jogador[]>();
    for (const jogador of this.jogadores()) {
      if (!grouped.has(jogador.selecao)) {
        grouped.set(jogador.selecao, []);
      }
      grouped.get(jogador.selecao)!.push(jogador);
    }

    return Array.from(grouped.entries()).map(([selecao, jogadores]) => ({ selecao, jogadores }));
  }

  totalJogadores() {
    return this.jogadores().length;
  }

  jogadoresObtidos() {
    return this.jogadores().filter((j) => j.obtida).length;
  }
}
