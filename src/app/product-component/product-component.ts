import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Team } from '../product';
import { ProductService } from '../product-service';

@Component({
  selector: 'app-team',
  standalone: false,
  templateUrl: './product-component.html',
  styleUrl: './product-component.css',
})
export class TeamComponent implements OnInit {
  formGroupTeam: FormGroup;

  teams = signal<Team[]>([]);
  isEditing: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private service: ProductService,
  ) {
    this.formGroupTeam = this.formBuilder.group({
      id: [''],
      name: [''],
      country: [''],
      matchDay: [''],
      cupPoints: [0],
    });
  }

  ngOnInit(): void {
    this.service.getAllTeams().subscribe({
      next: (json) => this.teams.set(json),
    });
  }

  save() {
    const team = this.formGroupTeam.value as Team;

    if (team.name === '' || team.country === '' || team.matchDay === '' || team.cupPoints == null) {
      alert('Preencha todos os campos antes de salvar.');
      return;
    }

    this.service.saveTeam(team).subscribe({
      next: (json) => {
        this.teams.update((teams) => [...teams, json]);
        this.formGroupTeam.reset();
      },
      error: (err) => {
        alert('Erro ao salvar o time: ' + err.message);
      },
    });
  }

  delete(team: Team) {
    this.service.deleteTeam(team.id!).subscribe({
      next: () => {
        this.teams.update((teams) => teams.filter((t) => t.id !== team.id));
      },
      error: (err) => {
        alert('Erro ao deletar o time: ' + err.message);
      },
    });
  }

  onClickUpdate(team: Team) {
    this.formGroupTeam.setValue(team);
    this.isEditing = true;
  }

  update() {
    const team = this.formGroupTeam.value as Team;
    const teamId = team.id;

    if (!teamId) {
      alert('ID do time não encontrado');
      return;
    }

    this.service.updateTeam(teamId, team).subscribe({
      next: (json) => {
        this.teams.update((teams) => teams.map((t) => (t.id === json.id ? json : t)));
        this.isEditing = false;
        this.formGroupTeam.reset();
      },
      error: (err) => {
        alert('Erro ao atualizar o time: ' + err.message);
      },
    });
  }

  get upcomingMatches() {
    const grouped = new Map<string, Team[]>();
    for (const team of this.teams()) {
      if (!grouped.has(team.matchDay)) {
        grouped.set(team.matchDay, []);
      }
      grouped.get(team.matchDay)!.push(team);
    }

    return Array.from(grouped.entries())
      .sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime())
      .map(([matchDay, teams]) => ({ matchDay, teams }));
  }

  highestPoints() {
    const points = this.teams().map((team) => team.cupPoints ?? 0);
    return points.length ? Math.max(...points) : 0;
  }

  nextMatch() {
    if (this.upcomingMatches.length === 0) {
      return null;
    }
    const next = this.upcomingMatches[0].matchDay;
    return new Date(next).toLocaleDateString('pt-BR');
  }
}
