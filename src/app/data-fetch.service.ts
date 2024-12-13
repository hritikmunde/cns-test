import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

interface Structure {
  name?: string;
  id?: string;
}

interface ApiResponse {
  data: {
    anatomical_structures: Structure[];
  }[];
}

@Injectable({
  providedIn: 'root'
})
export class DataFetchService {
  private apiUrl = 'https://apps.humanatlas.io/asctb-api/v2/1SqNmcPDB8PrZF1BhzgdKBxkfLcCR8VYMAkSIbnK_AXA/949267305';

  constructor(private http: HttpClient) {}

  fetchData(): Observable<ApiResponse['data']> {
    return this.http.get<ApiResponse>(this.apiUrl).pipe(
      map(response => response.data)
    );
  }
}
