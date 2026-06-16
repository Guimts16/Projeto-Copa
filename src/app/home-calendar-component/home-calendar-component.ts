import { Component, OnInit, signal } from '@angular/core';
import { Jogo } from '../jogo';
import { JogoService } from '../jogo-service';

interface CalendarDay {
  date: Date | null;
  label: string;
  matches: Jogo[];
}

@Component({
  selector: 'app-home-calendar-component',
  standalone: false,
  templateUrl: './home-calendar-component.html',
  styleUrls: ['./home-calendar-component.css'],
})
export class HomeCalendarComponent implements OnInit {
  matches = signal<Jogo[]>([]);
  calendarDays = signal<CalendarDay[]>([]);
  currentMonth = signal<Date>(new Date(new Date().getFullYear(), new Date().getMonth(), 1));

  constructor(private jogoService: JogoService) {}

  ngOnInit(): void {
    this.loadMatches();
  }

  loadMatches() {
    this.jogoService.getJogos().subscribe({
      next: (data: Jogo[]) => {
        this.matches.set(data);
        this.buildCalendar();
      },
      error: () => {
        this.matches.set([]);
        this.buildCalendar();
      },
    });
  }

  buildCalendar() {
    const month = this.currentMonth();
    const firstDay = new Date(month.getFullYear(), month.getMonth(), 1);
    const lastDay = new Date(month.getFullYear(), month.getMonth() + 1, 0);
    const days: CalendarDay[] = [];

    const startOffset = firstDay.getDay();
    for (let i = 0; i < startOffset; i++) {
      days.push({ date: null, label: '', matches: [] });
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(month.getFullYear(), month.getMonth(), i);
      const dayMatches: Jogo[] = [];
      days.push({ date, label: String(i), matches: dayMatches });
    }

    // associate matches to days (basic match-by-date if jogo has date)
    const jogos = this.matches() || [];
    for (const jogo of jogos) {
      try {
        const d = new Date((jogo as any).data || (jogo as any).date || '');
        if (!isNaN(d.getTime())) {
          const idx = d.getDate() + startOffset - 1;
          if (days[idx] && days[idx].matches) days[idx].matches.push(jogo);
        }
      } catch {}
    }

    this.calendarDays.set(days);
  }

  prevMonth() {
    const month = this.currentMonth();
    this.currentMonth.set(new Date(month.getFullYear(), month.getMonth() - 1, 1));
    this.buildCalendar();
  }

  nextMonth() {
    const month = this.currentMonth();
    this.currentMonth.set(new Date(month.getFullYear(), month.getMonth() + 1, 1));
    this.buildCalendar();
  }

  get monthName() {
    return this.currentMonth().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
  }

  getEstadio(jogo: Jogo): string {
    return (jogo as any)['estádio'] || (jogo as any).estadio || 'Estádio a confirmar';
  }
}
