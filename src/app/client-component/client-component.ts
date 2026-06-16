import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Client } from '../client';
import { JogadorService } from '../product-service';

@Component({
  selector: 'app-client-component',
  standalone: false,
  templateUrl: './client-component.html',
  styleUrl: './client-component.css',
})
export class ClientComponent implements OnInit {
  formGroup: FormGroup;

  clients = signal<Client[]>([]);

  constructor(
    private formBuilder: FormBuilder,
    private service: JogadorService,
  ) {
    this.formGroup = this.formBuilder.group({
      id: [''],
      name: [''],
      description: [''],
      age: [],
    });
  }

  ngOnInit(): void {}
}
