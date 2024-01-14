import { Component, computed, inject, signal } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { DataProviderService } from './services/data-provider.service';
import { Wrapped, mapWrapData, wrap } from './util/wrap';


export interface PlanetsState {
  planets: string[],
  loading: boolean,
  error: string | null,
  filter: string | null 
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private dataProviderService = inject(DataProviderService);

  private state = signal<Wrapped<string[]>>({
    loading: false,
  });

  // planets$ = this.dataProviderService.getPlanets().pipe(
  //   wrap(),
  //   mapWrapData((data) => {
  //     return {
  //       planets: data.results?.map(p => p.name)
  //     }
  //   }));


  planets = computed(() => this.state());

  constructor() {
    // reducers

    this.dataProviderService.getPlanets().pipe(wrap(), mapWrapData(res => res.results?.map(p => p.name) ?? []) ).subscribe(planets => this.state.set(planets))
  }

  public addPlanet() {
    const data = [...this.planets().data ?? [], 'nice'];
    
    this.state.update(state => ({
      ...state,
      data 
    }))
  }
}
