import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class GeneralService {

  private apiUrl: string = 'https://sonic.streamingchilenos.com/cp/get_info.php?p=8074';

  constructor(public http: HttpClient) { }

  // Método para hacer la petición al endpoint
  getRadioInfo(): Observable<any> {
    return this.http.get<any>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Error en la petición getRadioInfo: ', error);
        throw error;  // Propagar el error
      })
    );
  }

}
