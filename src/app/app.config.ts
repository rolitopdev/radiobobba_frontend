import { NG_EVENT_PLUGINS } from "@taiga-ui/event-plugins";
import { provideAnimations } from "@angular/platform-browser/animations";
import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { routes } from './app.routes';
import { provideHttpClient } from "@angular/common/http";
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { FIREBASE_OPTIONS } from "@angular/fire/compat";


export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    NG_EVENT_PLUGINS,
    provideHttpClient(),

    provideFirebaseApp(
      () => initializeApp(
        {
          apiKey: "AIzaSyAPFkYPTSnStWw1FkPKi6jb3vQjkbrVH_8",
          authDomain: "radiobobba-c2a3b.firebaseapp.com",
          projectId: "radiobobba-c2a3b",
          storageBucket: "radiobobba-c2a3b.appspot.com",
          messagingSenderId: "698800977982",
          appId: "1:698800977982:web:9a5d2d219876d5e9c7396f",
          measurementId: "G-S5EDEDLY3D"
        }
      )),
    // provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore(),
    ),
    {
      provide: FIREBASE_OPTIONS, useValue: {
        apiKey: "AIzaSyAPFkYPTSnStWw1FkPKi6jb3vQjkbrVH_8",
        authDomain: "radiobobba-c2a3b.firebaseapp.com",
        projectId: "radiobobba-c2a3b",
        storageBucket: "radiobobba-c2a3b.appspot.com",
        messagingSenderId: "698800977982",
        appId: "1:698800977982:web:9a5d2d219876d5e9c7396f",
        measurementId: "G-S5EDEDLY3D"
      }
    },

  ],
};
