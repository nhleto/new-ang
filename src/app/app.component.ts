import { Component } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { shareReplay } from 'rxjs';
import { DataProviderService } from './services/data-provider.service';
import { wrap } from './util/wrap';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'signals-fun';

  planets$ = this.dataProviderService.getPlanets().pipe(shareReplay(1), wrap());

  constructor(private dataProviderService: DataProviderService) {
  }

}
