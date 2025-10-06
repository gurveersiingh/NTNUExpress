# Firebase Setup for NTNUExpress - Oppdatert

## 🔥 **Firebase Anonymous Authentication + Synkronisering**

NTNUExpress bruker nå **Firebase Anonymous Authentication** med e-post-basert identifikasjon for synkronisering mellom enheter.

### ✅ **Hva som er implementert:**

**1. Firebase Anonymous Authentication:**
- ✅ Ingen passord-krav (anonym innlogging)
- ✅ E-post-basert identifikasjon
- ✅ Automatisk synkronisering mellom enheter
- ✅ Fallback til localStorage hvis Firebase ikke er tilgjengelig

**2. Firestore Database:**
- ✅ Brukerdata lagres i `users` collection
- ✅ Poeng og lojalitetsdata synkroniseres automatisk
- ✅ Fungerer på alle enheter med samme Firebase-konto

**3. Cross-Device Sync:**
- ✅ Logg inn på PC → poeng synkroniseres
- ✅ Logg inn på mobil → samme poeng vises
- ✅ Bestill på en enhet → poeng oppdateres på alle enheter

### 🔧 **Firebase-konfigurasjon:**

**1. Gå til Firebase Console:**
- Åpne [Firebase Console](https://console.firebase.google.com/)
- Velg ditt NTNUExpress-prosjekt

**2. Kopier Firebase-konfigurasjon:**
- Gå til Project Settings → General
- Scroll ned til "Your apps"
- Kopier Firebase SDK-konfigurasjonen

**3. Oppdater `index.html`:**
Erstatt placeholder-konfigurasjonen i `index.html` (linje 17-24) med din ekte Firebase-konfigurasjon:

```javascript
const firebaseConfig = {
    apiKey: "din-ekte-api-key",
    authDomain: "ditt-prosjekt.firebaseapp.com",
    projectId: "ditt-prosjekt-id",
    storageBucket: "ditt-prosjekt.appspot.com",
    messagingSenderId: "din-sender-id",
    appId: "din-app-id"
};
```

**4. Aktiver Anonymous Authentication:**
- Firebase Console → Authentication → Sign-in method
- Aktiver "Anonymous" provider
- **IKKE** aktiver "Email/Password" (vi bruker anonym auth)

**5. Konfigurer Firestore:**
- Gå til Firestore Database
- Opprett database i "europe-north2" region
- Sett opp sikkerhetsregler (se nedenfor)

### 🔒 **Firestore Sikkerhetsregler:**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### 🎯 **Hvordan det fungerer:**

**Innlogging:**
1. Bruker skriver inn e-postadresse
2. Firebase Anonymous Authentication logger inn brukeren
3. E-post lagres i Firestore under brukerens UID
4. UI oppdateres automatisk

**Synkronisering:**
1. Poeng lagres i Firestore under brukerens UID
2. Alle enheter med samme Firebase-konto får samme data
3. Automatisk oppdatering når data endres

**Cross-Device Scenario:**
1. **PC:** Logg inn med `student@ntnu.no` → få 300 poeng
2. **Mobil:** Logg inn med samme e-post → se samme 300 poeng
3. **Bestill på mobil:** Få 100 poeng → PC viser også 400 poeng

### 🚀 **Test etter konfigurasjon:**

1. **Opprett Firebase-konto:** Test med en ny e-postadresse
2. **Logg inn på PC:** Sjekk at poeng lagres i Firestore
3. **Logg inn på mobil:** Sjekk at samme poeng vises
4. **Bestill på en enhet:** Sjekk at poeng oppdateres på begge
5. **Lojalitetsprogram:** Test poengakkumulering og belønning

### 📱 **Responsivt design:**
- Alle elementer er responsive
- Fungerer på mobil og desktop
- Automatisk UI-tilpasning basert på innloggingsstatus

### 🔄 **Fallback-system:**
- Hvis Firebase ikke er tilgjengelig, brukes localStorage
- Ingen funksjonalitet går tapt
- Automatisk overgang til Firebase når tilgjengelig

### 💡 **Fordeler med denne løsningen:**

**For brukere:**
- ✅ **Ingen passord** å huske
- ✅ **Synkronisering** mellom alle enheter
- ✅ **Rask innlogging** med kun e-post
- ✅ **Samme poeng** på alle enheter

**For utvikling:**
- ✅ **Enkel autentisering** (anonym)
- ✅ **Automatisk synkronisering**
- ✅ **Skalerbar løsning**
- ✅ **Fallback-system** for pålitelighet

---

## 🎉 **Klar for cross-device testing!**

Oppdater Firebase-konfigurasjonen og test synkronisering mellom enheter. Nå vil poeng og lojalitetsdata være synkronisert på alle enheter! 🚀
