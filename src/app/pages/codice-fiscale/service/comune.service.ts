import { Injectable } from '@angular/core';
import { Comune } from '../models/comune/comune.model';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ComuneService {
  private comuni: Comune[] = [];

  constructor(private http: HttpClient) {}

  loadComuni(): Observable<void> {
    return this.http.get('assets/comuni.csv', { responseType: 'text' }).pipe(
      map((data) => {
        this.comuni = this.parseCSV(data);
        return;
      })
    );
  }
  private parseCSV(csvData: string): Comune[] {
    const lines = csvData.split('\n');
    return lines
      .map((line): Comune | null => {
        const cleanLine = line.trim();
        if (!cleanLine) return null;
        const [codice, nome, provincia] = cleanLine
          .split(',')
          .map((x) => x && x.trim());
        if (!codice || !nome || !provincia) return null;
        return {
          codice,
          nome: nome.toUpperCase(),
          provincia: provincia.toUpperCase(),
        };
      })
      .filter((comune): comune is Comune => comune !== null);
  }

  getCodiceComune(nomeComune: string): string {
    const comune = this.comuni.find(
      (comune) => comune.nome === nomeComune.toUpperCase()
    );
    return comune ? comune.codice : 'XXXX';
  }

  searchComuni(term: string): Comune[] {
    if (!term) return [];
    return this.comuni
      .filter((comune) =>
        comune.nome.toUpperCase().includes(term.toUpperCase())
      )
      .slice(0, 50);
  }
}
