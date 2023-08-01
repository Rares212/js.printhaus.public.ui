import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { PrintMaterialDto } from '@printnuts/common';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  constructor(private httpClient: HttpClient) { }

  getMaterials(): Observable<PrintMaterialDto[]> {
    const apiUrl: string = 'printnuts-api/print/materials';

    return this.httpClient.get<PrintMaterialDto[]>(apiUrl);
  }
}
