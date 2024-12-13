// data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError } from 'rxjs';

interface OlsResponse {
  _embedded: {
    terms: [{
      label: string;
      description: string[];
      obo_id: string;
      iri: string;
      annotation?: {
        definition?: string[];
      };
    }];
  };
}

interface StructureDetails {
  label: string;
  description: string;
  obo_id: string;
  iri: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private baseUrl = '/ols/api/ontologies/uberon/terms';

  constructor(private http: HttpClient) { }

  getStructureDetails(id: string): Observable<StructureDetails> {
    if (!id.startsWith('UBERON:')) {
      throw new Error('Invalid ID format');
    }

    const formattedId = id.replace(':', '_');
    const url = `${this.baseUrl}?iri=http://purl.obolibrary.org/obo/${formattedId}`;

    return this.http.get<OlsResponse>(url).pipe(
      map(response => {
        if (!response._embedded?.terms?.[0]) {
          throw new Error('No data found');
        }
        const term = response._embedded.terms[0];
        return {
          label: term.label,
          description: term.description?.[0] || term.annotation?.definition?.[0] || 'No description available',
          obo_id: term.obo_id,
          iri: term.iri
        };
      }),
      catchError(error => {
        console.error('API Error:', error);
        throw new Error('Failed to fetch structure details');
      })
    );
  }
}
