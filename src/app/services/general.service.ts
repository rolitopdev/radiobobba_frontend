import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class GeneralService {

  private apiRadioUrl: string = 'https://sonic.streamingchilenos.com/cp/get_info.php?p=8074';

  constructor(public http: HttpClient) { }

  // Método para hacer la petición al endpoint de la radio
  getRadioInfo(): Observable<any> {
    return this.http.get<any>(this.apiRadioUrl).pipe(
      catchError((error) => {
        console.error('Error en la petición getRadioInfo: ', error);
        throw error;
      })
    );
  }

  // Método para hacer la petición al endpoint de la API de Habbo
  getHabboInfoByName(keko: string): Observable<any> {
    return this.http.get<any>(`https://www.habbo.es/habbo-imaging/avatarimage?user=${keko}&headonly=0&size=b&gesture=sml&direction=2&head_direction=2&action=std`).pipe(
      catchError((error) => {
        console.error('Error en la petición getHabboInfoByName: ', error);
        throw error;
      })
    );
  }

}
