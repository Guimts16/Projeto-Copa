import { Component, OnInit, signal } from '@angular/core';
import { Match } from '../match';
import { MatchService } from '../match-service';

@Component({
  selector: 'app-home-component',
  standalone: false,
  templateUrl: './home-component.html',
  styleUrl: './home-component.css',
})
export class HomeComponent implements OnInit {
  featuredMatches = signal<Match[]>([]);

  constructor(private matchService: MatchService) {}

  ngOnInit(): void {
    this.loadFeaturedMatches();
  }

  loadFeaturedMatches() {
    this.matchService.getMatches().subscribe({
      next: (matches) => this.featuredMatches.set(matches.slice(0, 3)),
    });
  }
}
