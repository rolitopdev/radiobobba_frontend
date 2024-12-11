import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class GeneralService {

  private apiRadioUrl: string = 'https://sonic.streamingchilenos.com/cp/get_info.php?p=8074';

  constructor(public http: HttpClient) { }

  // Método para hacer la petición al endpoint
  getRadioInfo(): Observable<any> {
    return this.http.get<any>(this.apiRadioUrl).pipe(
      catchError((error) => {
        console.error('Error en la petición getRadioInfo: ', error);
        throw error;
      })
    );
  }

  getHabboInfoByName(keko: string): Observable<any> {
    return this.http.get<any>(`https://www.habbo.es/api/public/users?name=${keko}`).pipe(
      catchError((error) => {
        console.error('Error en la petición getHabboInfoByName: ', error);
        throw error;
      })
    );
  }

}
