import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Jogador } from '../../models/jogador.model';
import { JogadorService } from '../../services/jogador-service';

@Component({
  selector: 'app-album',
  standalone: false,
  templateUrl: './album.html',
  styleUrls: ['./album.css'],
})
export class AlbumComponent implements OnInit {
  jogadores: Jogador[] = [];
  formGroup: FormGroup;
  isEditing = false;
  editandoId: number | null = null;
  mensagem = '';
  termoBusca = '';

  constructor(
    private formBuilder: FormBuilder,
    private jogadorService: JogadorService,
  ) {
    this.formGroup = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      selecao: ['', [Validators.required, Validators.minLength(3)]],
      posicao: ['', [Validators.required]],
      obtida: [false],
    });
  }

  ngOnInit(): void {
    this.carregarJogadores();
  }

  // Carregar todos os jogadores
  carregarJogadores(): void {
    this.jogadorService.listarTodos().subscribe({
      next: (dados) => {
        this.jogadores = dados;
        this.mensagem = '';
      },
      error: (erro) => {
        console.error('Erro ao carregar jogadores:', erro);
        this.mensagem = 'Erro ao carregar jogadores. Verifique se o backend está rodando.';
      },
    });
  }

  // Adicionar novo jogador
  adicionarJogador(): void {
    if (this.formGroup.invalid) {
      this.mensagem = 'Preencha todos os campos corretamente!';
      return;
    }

    if (this.isEditing && this.editandoId) {
      // Editar jogador existente
      this.jogadorService.atualizar(this.editandoId, this.formGroup.value).subscribe({
        next: () => {
          this.mensagem = 'Jogador atualizado com sucesso!';
          this.formGroup.reset();
          this.isEditing = false;
          this.editandoId = null;
          this.carregarJogadores();
        },
        error: (erro) => {
          console.error('Erro ao atualizar:', erro);
          this.mensagem = 'Erro ao atualizar jogador!';
        },
      });
    } else {
      // Criar novo jogador
      this.jogadorService.criar(this.formGroup.value).subscribe({
        next: () => {
          this.mensagem = 'Jogador adicionado com sucesso!';
          this.formGroup.reset();
          this.carregarJogadores();
        },
        error: (erro) => {
          console.error('Erro ao criar:', erro);
          this.mensagem = 'Erro ao adicionar jogador!';
        },
      });
    }
  }

  // Editar jogador
  editarJogador(jogador: Jogador): void {
    this.isEditing = true;
    this.editandoId = jogador.id || null;
    this.formGroup.patchValue({
      nome: jogador.nome,
      selecao: jogador.selecao,
      posicao: jogador.posicao,
      obtida: jogador.obtida,
    });
  }

  // Deletar jogador
  deletarJogador(id: number): void {
    if (confirm('Tem certeza que deseja deletar este jogador?')) {
      this.jogadorService.deletar(id).subscribe({
        next: () => {
          this.mensagem = 'Jogador deletado com sucesso!';
          this.carregarJogadores();
        },
        error: (erro) => {
          console.error('Erro ao deletar:', erro);
          this.mensagem = 'Erro ao deletar jogador!';
        },
      });
    }
  }

  // Cancelar edição
  cancelarEdicao(): void {
    this.isEditing = false;
    this.editandoId = null;
    this.formGroup.reset();
  }

  // Marcar/Desmarcar como obtida
  toggleObtida(jogador: Jogador): void {
    if (!jogador.id) return;

    const jogadorAtualizado = { ...jogador, obtida: !jogador.obtida };
    this.jogadorService.atualizar(jogador.id, jogadorAtualizado).subscribe({
      next: () => {
        this.carregarJogadores();
      },
      error: (erro) => {
        console.error('Erro ao atualizar status:', erro);
        this.mensagem = 'Erro ao atualizar figurinha!';
      },
    });
  }

  // Filtrar jogadores pela busca
  get jogadoresFiltrados(): Jogador[] {
    return this.jogadores.filter(
      (j) =>
        j.nome.toLowerCase().includes(this.termoBusca.toLowerCase()) ||
        j.selecao.toLowerCase().includes(this.termoBusca.toLowerCase()),
    );
  }

  // Contar figurinhas obtidas
  get totalObtidas(): number {
    return this.jogadores.filter((j) => j.obtida).length;
  }

  // Percentual de conclusão
  get percentualConclusao(): number {
    if (this.jogadores.length === 0) return 0;
    return Math.round((this.totalObtidas / this.jogadores.length) * 100);
  }
}
