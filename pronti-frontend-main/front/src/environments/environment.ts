// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  url: 'https://prontiauto.ksgroup.com.ec/api',
  firebase: {
    apiKey: "AIzaSyCT-99mLoN9eKshE3x5mE0HlsSjMwsy7ck",
    authDomain: "db--cpa.firebaseapp.com",
    projectId: "db--cpa",
    storageBucket: "db--cpa.appspot.com",
    messagingSenderId: "231731752155",
    appId: "1:231731752155:web:7f6d04e2d383aa89a630fe",
    measurementId: "G-Z2K735JGHG"
  },
  firebaseAuth: {
    providers: [
      // AuthProvider.EmailAndPassword,
      // AuthProvider.Google,
    ],
    registrationEnabled: true,
    resetPasswordEnabled: true,
    guestEnabled: false,
    tosUrl: 'https://manticore-labs.com', // URL de terminos y condiciones
    privacyPolicyUrl: 'https://manticore-labs.com', // URL políticas de privacidad
    goBackURL: '/inicio',
  },
  emuladores: {
    autenticacion: false,
    firestore: false,
    functions: false,
  },

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
