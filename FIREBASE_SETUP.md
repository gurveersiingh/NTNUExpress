# Firebase Setup for NTNUExpress

## 🔥 Firebase Integration Complete!

Jeg har integrert Firebase Authentication og Firestore for NTNUExpress. Her er hva som er implementert:

### ✅ **Funksjoner implementert:**

**1. Firebase Authentication:**
- ✅ E-post/passord innlogging
- ✅ Konto-opprettelse
- ✅ Utlogging
- ✅ Automatisk innloggingsstatus

**2. Firestore Database:**
- ✅ Brukerdata lagres i `users` collection
- ✅ Poeng og lojalitetsdata synkroniseres
- ✅ Fallback til localStorage hvis Firebase ikke er tilgjengelig

**3. UI Oppdateringer:**
- ✅ Passord-felt lagt til
- ✅ "Opprett konto" knapp
- ✅ "Logg ut" knapp
- ✅ Automatisk UI-endring basert på innloggingsstatus

### 🔧 **Neste steg - Firebase-konfigurasjon:**

**1. Gå til Firebase Console:**
- Åpne [Firebase Console](https://console.firebase.google.com/)
- Velg ditt prosjekt

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

**4. Aktiver Authentication:**
- Gå til Authentication → Sign-in method
- Aktiver "Email/Password" provider

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
1. Bruker fyller ut e-post og passord
2. Firebase autentiserer brukeren
3. UI oppdateres automatisk
4. Brukerdata lastes fra Firestore

**Poengsystem:**
1. Poeng lagres i Firestore under brukerens UID
2. Automatisk synkronisering mellom enheter
3. Fallback til localStorage hvis offline

**Konto-opprettelse:**
1. Bruker fyller ut e-post og passord (minst 6 tegn)
2. Firebase oppretter ny bruker
3. Automatisk innlogging etter opprettelse
4. Tom brukerdokument opprettes i Firestore

### 🚀 **Test etter konfigurasjon:**

1. **Opprett konto:** Test med en ny e-postadresse
2. **Logg inn:** Test med eksisterende konto
3. **Bestill mat:** Sjekk at poeng lagres i Firestore
4. **Logg ut:** Test utlogging og innlogging igjen
5. **Lojalitetsprogram:** Test poengakkumulering og belønning

### 📱 **Responsivt design:**
- Alle nye elementer er responsive
- Fungerer på mobil og desktop
- Automatisk UI-tilpasning basert på innloggingsstatus

### 🔄 **Fallback-system:**
- Hvis Firebase ikke er tilgjengelig, brukes localStorage
- Ingen funksjonalitet går tapt
- Automatisk overgang til Firebase når tilgjengelig

---

**🎉 Klar for testing!** Oppdater Firebase-konfigurasjonen og test alle funksjonene.
