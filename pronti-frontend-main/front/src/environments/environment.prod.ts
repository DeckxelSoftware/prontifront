export const environment = {
  production: true,
  // url: 'http://18.212.55.26:8082/api',
  url: 'http://86.48.3.202:4200/api',
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
