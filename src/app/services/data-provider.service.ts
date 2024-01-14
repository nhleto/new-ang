import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataProviderService {

  constructor(private httpClient: HttpClient) { }

  public getPlanets() {
    return this.httpClient.get('https://swapi.dev/api/planets');
  }
}
