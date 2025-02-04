import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  private readonly API_URL = 'http://127.0.0.1:5001/extract-text';

  constructor(private http: HttpClient) {}

  // Método para enviar el archivo al backend
  extractTextFromPdf(file: File): Observable<{ text: string; corrected_text: string }> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{ text: string; corrected_text: string }>(this.API_URL, formData);
  }
}
