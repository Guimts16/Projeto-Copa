import { Component, OnInit, signal } from '@angular/core';
import { Jogo } from '../jogo';
import { JogoService } from '../jogo-service';

@Component({
  selector: 'app-home-component',
  standalone: false,
  templateUrl: './home-component.html',
  styleUrl: './home-component.css',
})
export class HomeComponent implements OnInit {
  featuredJogos = signal<Jogo[]>([]);

  constructor(private jogoService: JogoService) {}

  ngOnInit(): void {
    this.loadFeaturedMatches();
  }

  loadFeaturedMatches() {
    this.jogoService.getJogos().subscribe({
      next: (jogos: Jogo[]) => this.featuredJogos.set(jogos.slice(0, 3)),
    });
  }

  getEstadio(jogo: Jogo): string {
    return (jogo as any)['estádio'] || 'Estádio a confirmar';
  }
}
