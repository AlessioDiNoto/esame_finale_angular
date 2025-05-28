import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { Comune } from '../../models/comune/comune.model';
import { CodiceFiscaleService } from '../../service/codice-fiscale.service';
import { ComuneService } from '../../service/comune.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-codice-fiscale-card',
  standalone: false,
  templateUrl: './codice-fiscale-card.component.html',
  styleUrl: './codice-fiscale-card.component.scss',
})
export class CodiceFiscaleCardComponent implements OnInit {
  form!: FormGroup;
  filteredComuni!: Observable<Comune[]>;
  mesi = [
    'Gennaio',
    'Febbraio',
    'Marzo',
    'Aprile',
    'Maggio',
    'Giugno',
    'Luglio',
    'Agosto',
    'Settembre',
    'Ottobre',
    'Novembre',
    'Dicembre',
  ];
  sessi = ['M', 'F'];

  constructor(
    private fb: FormBuilder,
    private codiceFiscaleService: CodiceFiscaleService,
    private comuniService: ComuneService,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      cognome: ['', Validators.required],
      giorno: [
        '',
        [Validators.required, Validators.min(1), Validators.max(31)],
      ],
      mese: ['', Validators.required],
      anno: [
        '',
        [
          Validators.required,
          Validators.min(1900),
          Validators.max(new Date().getFullYear()),
        ],
      ],
      sesso: ['', Validators.required],
      comune: ['', Validators.required],
      codiceFiscale: [{ value: '', disabled: true }],
    });
  }
  ngOnInit(): void {
    this.comuniService.loadComuni().subscribe();

    this.filteredComuni = this.form.get('comune')!.valueChanges.pipe(
      startWith(''),
      map((value) =>
        this.comuniService.searchComuni(
          typeof value === 'string' ? value : value.nome
        )
      )
    );
  }

  displayComune(comune: Comune): string {
    return comune ? `${comune.nome} (${comune.provincia})` : '';
  }

  calcolaCodiceFiscale(): void {
    if (this.form.invalid) {
      this.snackBar.open('Compila tutti i campi correttamente', 'Chiudi', {
        duration: 3000,
      });
      return;
    }

    const formValue = this.form.value;

    try {
      const codiceFiscale = this.codiceFiscaleService.calcolaCodiceFiscale({
        nome: formValue.nome,
        cognome: formValue.cognome,
        giorno: formValue.giorno,
        mese: formValue.mese,
        anno: formValue.anno,
        sesso: formValue.sesso,
        comune:
          typeof formValue.comune === 'string'
            ? formValue.comune
            : formValue.comune.nome,
      });

      if (codiceFiscale) {
        this.form.get('codiceFiscale')?.setValue(codiceFiscale);
      } else {
        this.snackBar.open('Errore nel calcolo del codice fiscale', 'Chiudi', {
          duration: 3000,
        });
      }
    } catch (e) {
      this.snackBar.open('Errore nel calcolo del codice fiscale', 'Chiudi', {
        duration: 3000,
      });
      console.error(e);
    }
  }

  validaGiorno(): boolean {
    const giorno = this.form.get('giorno')?.value;
    const mese = this.form.get('mese')?.value;
    const anno = this.form.get('anno')?.value;

    if (!giorno || !mese || !anno) return true;

    return this.codiceFiscaleService['isGiornoValido'](giorno, mese, anno);
  }
}
