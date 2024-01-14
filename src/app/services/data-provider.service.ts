import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


export interface PlanetsResponse {
  count: number;
  next: string;
  previous?: null;
  results?: (ResultsEntity)[] | null;
}
export interface ResultsEntity {
  name: string;
}


@Injectable({
  providedIn: 'root'
})
export class DataProviderService {

  constructor(private httpClient: HttpClient) { }

  public getPlanets() {
    return this.httpClient.get<PlanetsResponse>('https://swapi.dev/api/planets');
  }
}
