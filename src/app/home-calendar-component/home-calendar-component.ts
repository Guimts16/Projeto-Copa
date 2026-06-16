import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Match } from '../match';
import { MatchService } from '../match-service';

interface CalendarDay {
  date: Date | null;
  label: string;
  matches: Match[];
}

const COUNTRIES = [
  'Afghanistan',
  'Albania',
  'Algeria',
  'Andorra',
  'Angola',
  'Antigua and Barbuda',
  'Argentina',
  'Armenia',
  'Australia',
  'Austria',
  'Azerbaijan',
  'Bahamas',
  'Bahrain',
  'Bangladesh',
  'Barbados',
  'Belarus',
  'Belgium',
  'Belize',
  'Benin',
  'Bhutan',
  'Bolivia',
  'Bosnia and Herzegovina',
  'Botswana',
  'Brazil',
  'Brunei',
  'Bulgaria',
  'Burkina Faso',
  'Burundi',
  'Cabo Verde',
  'Cambodia',
  'Cameroon',
  'Canada',
  'Central African Republic',
  'Chad',
  'Chile',
  'China',
  'Colombia',
  'Comoros',
  'Congo (Brazzaville)',
  'Congo (Kinshasa)',
  'Costa Rica',
  'Croatia',
  'Cuba',
  'Cyprus',
  'Czech Republic',
  'Côte d Ivoire',
  'Denmark',
  'Djibouti',
  'Dominica',
  'Dominican Republic',
  'Ecuador',
  'Egypt',
  'El Salvador',
  'Equatorial Guinea',
  'Eritrea',
  'Estonia',
  'Eswatini',
  'Ethiopia',
  'Fiji',
  'Finland',
  'France',
  'Gabon',
  'Gambia',
  'Georgia',
  'Germany',
  'Ghana',
  'Greece',
  'Grenada',
  'Guatemala',
  'Guinea',
  'Guinea-Bissau',
  'Guyana',
  'Haiti',
  'Honduras',
  'Hungary',
  'Iceland',
  'India',
  'Indonesia',
  'Iran',
  'Iraq',
  'Ireland',
  'Israel',
  'Italy',
  'Jamaica',
  'Japan',
  'Jordan',
  'Kazakhstan',
  'Kenya',
  'Kiribati',
  'Korea North',
  'Korea South',
  'Kosovo',
  'Kuwait',
  'Kyrgyzstan',
  'Laos',
  'Latvia',
  'Lebanon',
  'Lesotho',
  'Liberia',
  'Libya',
  'Liechtenstein',
  'Lithuania',
  'Luxembourg',
  'Madagascar',
  'Malawi',
  'Malaysia',
  'Maldives',
  'Mali',
  'Malta',
  'Marshall Islands',
  'Mauritania',
  'Mauritius',
  'Mexico',
  'Micronesia',
  'Moldova',
  'Monaco',
  'Mongolia',
  'Montenegro',
  'Morocco',
  'Mozambique',
  'Myanmar',
  'Namibia',
  'Nauru',
  'Nepal',
  'Netherlands',
  'New Zealand',
  'Nicaragua',
  'Niger',
  'Nigeria',
  'North Macedonia',
  'Norway',
  'Oman',
  'Pakistan',
  'Palau',
  'Panama',
  'Papua New Guinea',
  'Paraguay',
  'Peru',
  'Philippines',
  'Poland',
  'Portugal',
  'Qatar',
  'Romania',
  'Russia',
  'Rwanda',
  'Saint Kitts and Nevis',
  'Saint Lucia',
  'Saint Vincent and the Grenadines',
  'Samoa',
  'San Marino',
  'Sao Tome and Principe',
  'Saudi Arabia',
  'Senegal',
  'Serbia',
  'Seychelles',
  'Sierra Leone',
  'Singapore',
  'Slovakia',
  'Slovenia',
  'Solomon Islands',
  'Somalia',
  'South Africa',
  'South Sudan',
  'Spain',
  'Sri Lanka',
  'Sudan',
  'Suriname',
  'Sweden',
  'Switzerland',
  'Syria',
  'Taiwan',
  'Tajikistan',
  'Tanzania',
  'Thailand',
  'Timor-Leste',
  'Togo',
  'Tonga',
  'Trinidad and Tobago',
  'Tunisia',
  'Turkey',
  'Turkmenistan',
  'Tuvalu',
  'Uganda',
  'Ukraine',
  'United Arab Emirates',
  'United Kingdom',
  'United States',
  'Uruguay',
  'Uzbekistan',
  'Vanuatu',
  'Vatican City',
  'Venezuela',
  'Vietnam',
  'Yemen',
  'Zambia',
  'Zimbabwe',
];

@Component({
  selector: 'app-home-calendar-component',
  standalone: false,
  templateUrl: './home-calendar-component.html',
  styleUrl: './home-calendar-component.css',
})
export class HomeCalendarComponent implements OnInit {
  form: FormGroup;
  matches = signal<Match[]>([]);
  calendarDays = signal<CalendarDay[]>([]);
  currentMonth = signal<Date>(new Date(new Date().getFullYear(), new Date().getMonth(), 1));
  countries = COUNTRIES;

  constructor(
    private formBuilder: FormBuilder,
    private matchService: MatchService,
  ) {
    this.form = this.formBuilder.group({
      date: ['', Validators.required],
      opponent: ['', Validators.required],
      country: ['', Validators.required],
      venue: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadMatches();
  }

  loadMatches() {
    this.matchService.getMatches().subscribe({
      next: (data) => {
        this.matches.set(data);
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
      const dateKey = date.toISOString().split('T')[0];
      const dayMatches = this.matches().filter((match) => match.date === dateKey);
      days.push({ date, label: String(i), matches: dayMatches });
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

  addMatch() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const match = this.form.value as Match;

    this.matchService.saveMatch(match).subscribe({
      next: (saved) => {
        this.matches.update((current) => [...current, saved]);
        this.form.reset();
        this.buildCalendar();
      },
    });
  }

  removeMatch(match: Match) {
    if (!match.id) {
      return;
    }

    this.matchService.deleteMatch(match).subscribe({
      next: () => {
        this.matches.update((current) => current.filter((m) => m.id !== match.id));
        this.buildCalendar();
      },
    });
  }

  get opponentOptions() {
    return Array.from(new Set(this.matches().map((match) => match.opponent))).sort();
  }

  get monthName() {
    return this.currentMonth().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
  }
}
