import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  AllMakesResponeDto,
  VehicleModelResponseDto,
  VehicleTypeResponseDto,
} from '@core/models';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _baseUrl = environment.apiUrl;

  getAllMakes(): Observable<AllMakesResponeDto> {
    return this._httpClient.get<AllMakesResponeDto>(
      `${this._baseUrl}/vehicles/getallmakes?format=json`
    );
  }

  getVehicleTypesForMakeId(id: string): Observable<VehicleTypeResponseDto> {
    return this._httpClient.get<VehicleTypeResponseDto>(
      `${this._baseUrl}/vehicles/GetVehicleTypesForMakeId/${id}?format=json`
    );
  }

  getModelsForMakeId(id: string): Observable<VehicleModelResponseDto> {
    return this._httpClient.get<VehicleModelResponseDto>(
      `${this._baseUrl}/vehicles/GetModelsForMakeId/${id}?format=json`
    );
  }
}
