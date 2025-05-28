# Esame Finale Di Noto

## 📌 Descrizione del Progetto

**Utility App** è un'applicazione web sviluppata con Angular che offre strumenti utili per uso quotidiano. L'applicazione include attualmente due funzionalità principali:

1. **Calcolatore di Codice Fiscale Italiano**: Permette di calcolare il codice fiscale a partire dai dati anagrafici.
2. **Servizio Meteo**: Fornisce informazioni meteorologiche aggiornate per diverse città nel mondo.

L'applicazione include anche un sistema di autenticazione (login/registrazione) per proteggere l'accesso alle funzionalità.

## 🎯 Obiettivi e Funzionalità

| Funzionalità                   | Obiettivo                                                                  |
| ------------------------------ | -------------------------------------------------------------------------- |
| **Autenticazione**             | Gestione sicura di login/registrazione con validazione avanzata dei campi  |
| **Calcolatore Codice Fiscale** | Calcolo preciso del codice fiscale italiano secondo le normative vigenti   |
| **Servizio Meteo**             | Visualizzazione di dati meteorologici in tempo reale per città selezionate |
| **UI/UX**                      | Interfaccia intuitiva e responsive con Angular Material                    |

## 🛠 Tecnologie Utilizzate

- **Frontend**: Angular 16, Angular Material
- **Gestione Stato**: RxJS, BehaviorSubject
- **API Esterna**: OpenWeatherMap (per i dati meteo)
- **Autenticazione**: JWT (simulato) con localStorage
- **Routing**: Angular Router con guardie di autenticazione

## 🚀 Come Usare l'Applicazione

### 1. Accesso all'Applicazione

- **Registrazione**:
  - Accedi alla route `/register`
  - Compila il form con nome, email (solo Gmail) e password (min 6 caratteri)
  - Clicca "Registrati"
- **Login**:
  - Accedi alla route `/login`
  - Inserisci email e password
  - Puoi usare l'account demo: `admin@gmail.com` / `admin`

### 2. Calcolatore Codice Fiscale

1. Naviga a `/codice-fiscale`
2. Compila tutti i campi:
   - Nome e Cognome
   - Data di nascita (giorno, mese, anno)
   - Sesso
   - Comune di nascita (con autocompletamento)
3. Clicca "Calcola Codice Fiscale"
4. Il codice calcolato apparirà nel campo dedicato

### 3. Servizio Meteo

1. Naviga a `/weather`
2. Seleziona un paese dal menu a tendina
3. Scegli una città dalla lista
4. Visualizza i dati meteo:
   - Temperatura attuale
   - Temperatura percepita
   - Condizioni atmosferiche
   - Icona descrittiva

## 🏗 Architettura Principale

```plaintext
src/
├── app/
│   ├── auth/                  # Servizi e guardie di autenticazione
│   ├── components/            # Componenti condivisi (header, navbar)
│   ├── models/                # Interfacce e tipi
│   ├── pages/                 # Pagine principali
│   │   ├── codice-fiscale/    # Logica calcolo CF
│   │   ├── home/              # Pagina iniziale
│   │   ├── login/             # Pagina di accesso
│   │   ├── register/          # Pagina registrazione
│   │   └── weather/           # Servizio meteo
│   ├── services/              # Servizi globali
│   └── app.component.*        # Componente root
└── assets/                    # Risorse statiche (es. lista comuni)
```
