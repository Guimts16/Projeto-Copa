import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Ingressos } from '../ingressos';
import { IngressosService } from '../match-service';

@Component({
  selector: 'app-ingressos',
  standalone: false,
  templateUrl: './ingressos-component.html',
  styleUrl: './ingressos-component.css',
})
export class IngressosComponent implements OnInit {
  formGroupIngressos: FormGroup;

  ingressos = signal<Ingressos[]>([]);
  isEditing: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private service: IngressosService,
  ) {
    this.formGroupIngressos = this.formBuilder.group({
      id: [''],
      cpf: [''],
      titular: [''],
      jogo: [''],
      setor: [''],
      assento: [''],
      preco: [0],
    });
  }

  ngOnInit(): void {
    this.service.getIngressos().subscribe({
      next: (json) => this.ingressos.set(json),
    });
  }

  save() {
    const ingresso = this.formGroupIngressos.value as Ingressos;

    if (
      !ingresso.cpf ||
      !ingresso.titular ||
      !ingresso.jogo ||
      !ingresso.setor ||
      !ingresso.assento ||
      ingresso.preco == null
    ) {
      alert('Preencha todos os campos antes de salvar.');
      return;
    }

    this.service.saveIngressos(ingresso).subscribe({
      next: (json) => {
        this.ingressos.update((ingressos) => [...ingressos, json]);
        this.formGroupIngressos.reset();
      },
      error: (err) => {
        alert('Erro ao salvar o ingresso: ' + err.message);
      },
    });
  }

  delete(ingresso: Ingressos) {
    this.service.deleteIngressos(ingresso.id).subscribe({
      next: () => {
        this.ingressos.update((ingressos) => ingressos.filter((i) => i.id !== ingresso.id));
      },
      error: (err) => {
        alert('Erro ao deletar o ingresso: ' + err.message);
      },
    });
  }

  onClickUpdate(ingresso: Ingressos) {
    this.formGroupIngressos.setValue(ingresso);
    this.isEditing = true;
  }

  update() {
    const ingresso = this.formGroupIngressos.value as Ingressos;
    const ingressoId = ingresso.id;

    if (!ingressoId) {
      alert('ID do ingresso não encontrado');
      return;
    }

    this.service.updateIngressos(ingressoId, ingresso).subscribe({
      next: (json) => {
        this.ingressos.update((ingressos) => ingressos.map((i) => (i.id === json.id ? json : i)));
        this.isEditing = false;
        this.formGroupIngressos.reset();
      },
      error: (err) => {
        alert('Erro ao atualizar o ingresso: ' + err.message);
      },
    });
  }

  ingressosPorJogo() {
    const grouped = new Map<string, Ingressos[]>();
    for (const ingresso of this.ingressos()) {
      if (!grouped.has(ingresso.jogo)) {
        grouped.set(ingresso.jogo, []);
      }
      grouped.get(ingresso.jogo)!.push(ingresso);
    }

    return Array.from(grouped.entries()).map(([jogo, ingressos]) => ({ jogo, ingressos }));
  }

  totalIngressos() {
    return this.ingressos().length;
  }

  totalArrecadado() {
    return this.ingressos().reduce((total, ingresso) => total + ingresso.preco, 0);
  }

  precoMedio() {
    const total = this.totalIngressos();
    return total > 0 ? (this.totalArrecadado() / total).toFixed(2) : '0.00';
  }
}
