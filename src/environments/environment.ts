// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig : {
    apiKey: 'AIzaSyA1IKdyIlMN7jB4Sxwdto4Eyqcyug7mVww',
    authDomain: 'getyourta.firebaseapp.com',
    databaseURL: 'https://getyourta.firebaseio.com',
    projectId: 'getyourta',
    storageBucket: 'getyourta.appspot.com',
    messagingSenderId: '149569078572',
    appId: '1:149569078572:web:33658666b203a254249889',
    measurementId: 'G-QTQX5WK5GP'
  },
  apiUrl: 'http://localhost:5000/api/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
