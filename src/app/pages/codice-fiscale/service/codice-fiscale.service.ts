import { Injectable } from '@angular/core';
import { ComuneService } from './comune.service';

@Injectable({
  providedIn: 'root',
})
export class CodiceFiscaleService {
  constructor(private comuniService: ComuneService) {}

  calcolaCodiceFiscale(data: {
    nome: string;
    cognome: string;
    giorno: number;
    mese: string;
    anno: number;
    sesso: string;
    comune: string;
  }): string {
    try {
      const codiceCognome = this.codificaCognome(data.cognome);
      const codiceNome = this.codificaNome(data.nome);
      const codiceData = this.codificaData(
        data.giorno,
        data.mese,
        data.anno,
        data.sesso
      );
      const codiceComune = this.comuniService.getCodiceComune(data.comune);
      const codiceParziale =
        codiceCognome + codiceNome + codiceData + codiceComune;
      const carattereControllo = this.calcolaCarattereControllo(codiceParziale);

      return codiceParziale + carattereControllo;
    } catch (e) {
      console.error('Errore durante il calcolo del Codice Fiscale:', e);
      return '';
    }
  }

  private codificaCognome(cognome: string): string {
    if (!cognome) return '';
    cognome = this.rimuoviSpazi(cognome);
    const consonanti = this.rimuoviVocali(cognome);
    const vocali = this.rimuoviConsonanti(cognome);
    return (consonanti + vocali + 'XXX').substring(0, 3).toUpperCase();
  }

  private codificaNome(nome: string): string {
    if (!nome) return '';
    nome = this.rimuoviSpazi(nome);
    let consonanti = this.rimuoviVocali(nome);

    if (consonanti.length > 3) {
      consonanti = consonanti[0] + consonanti[2] + consonanti[3];
    }

    const vocali = this.rimuoviConsonanti(nome);
    return (consonanti + vocali + 'XXX').substring(0, 3).toUpperCase();
  }

  private codificaData(
    giorno: number,
    mese: string,
    anno: number,
    sesso: string
  ): string {
    if (!this.isGiornoValido(giorno, mese, anno)) {
      throw new Error('Giorno non valido per il mese e anno specificati');
    }

    const annoStr = String(anno).slice(-2);
    const meseStr = this.meseCodice(mese);
    const giornoNum = sesso.toUpperCase() === 'F' ? giorno + 40 : giorno;
    const giornoStr = giornoNum < 10 ? '0' + giornoNum : String(giornoNum);

    return annoStr + meseStr + giornoStr;
  }

  private calcolaCarattereControllo(codice: string): string {
    const pari: { [key: string]: number } = {
      '0': 0,
      A: 0,
      '1': 1,
      B: 1,
      '2': 2,
      C: 2,
      '3': 3,
      D: 3,
      '4': 4,
      E: 4,
      '5': 5,
      F: 5,
      '6': 6,
      G: 6,
      '7': 7,
      H: 7,
      '8': 8,
      I: 8,
      '9': 9,
      J: 9,
      K: 10,
      L: 11,
      M: 12,
      N: 13,
      O: 14,
      P: 15,
      Q: 16,
      R: 17,
      S: 18,
      T: 19,
      U: 20,
      V: 21,
      W: 22,
      X: 23,
      Y: 24,
      Z: 25,
    };

    const dispari: { [key: string]: number } = {
      '0': 1,
      A: 1,
      '1': 0,
      B: 0,
      '2': 5,
      C: 5,
      '3': 7,
      D: 7,
      '4': 9,
      E: 9,
      '5': 13,
      F: 13,
      '6': 15,
      G: 15,
      '7': 17,
      H: 17,
      '8': 19,
      I: 19,
      '9': 21,
      J: 21,
      K: 2,
      L: 4,
      M: 18,
      N: 20,
      O: 11,
      P: 3,
      Q: 6,
      R: 8,
      S: 12,
      T: 14,
      U: 16,
      V: 10,
      W: 22,
      X: 25,
      Y: 24,
      Z: 23,
    };

    let somma = 0;
    for (let i = 0; i < codice.length; i++) {
      const c = codice.charAt(i).toUpperCase();
      const valore = i % 2 === 0 ? dispari[c] : pari[c];
      if (valore === undefined) throw new Error(`Carattere non valido: ${c}`);
      somma += valore;
    }

    const carattereControlloIndex = somma % 26;
    return String.fromCharCode('A'.charCodeAt(0) + carattereControlloIndex);
  }

  private rimuoviSpazi(input: string): string {
    return input ? input.replace(/\s+/g, '') : '';
  }

  private rimuoviVocali(input: string): string {
    return input ? input.replace(/[AEIOU]/gi, '') : '';
  }

  private rimuoviConsonanti(input: string): string {
    return input ? input.replace(/[^AEIOU]/gi, '') : '';
  }

  private isGiornoValido(giorno: number, mese: string, anno: number): boolean {
    const mesi31 = [
      'Gennaio',
      'Marzo',
      'Maggio',
      'Luglio',
      'Agosto',
      'Ottobre',
      'Dicembre',
    ];
    const mesi30 = ['Aprile', 'Giugno', 'Settembre', 'Novembre'];

    if (mesi31.includes(mese)) return giorno >= 1 && giorno <= 31;
    if (mesi30.includes(mese)) return giorno >= 1 && giorno <= 30;
    if (mese === 'Febbraio') {
      return giorno >= 1 && giorno <= (this.isAnnoBisestile(anno) ? 29 : 28);
    }
    return false;
  }

  private isAnnoBisestile(anno: number): boolean {
    return anno % 4 === 0 && (anno % 100 !== 0 || anno % 400 === 0);
  }

  private meseCodice(mese: string): string {
    const mesi: { [key: string]: string } = {
      Gennaio: 'A',
      Febbraio: 'B',
      Marzo: 'C',
      Aprile: 'D',
      Maggio: 'E',
      Giugno: 'H',
      Luglio: 'L',
      Agosto: 'M',
      Settembre: 'P',
      Ottobre: 'R',
      Novembre: 'S',
      Dicembre: 'T',
    };
    return mesi[mese] || 'X';
  }
}
