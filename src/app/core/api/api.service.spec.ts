import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ApiService } from '@core/api';
import {
  AllMakesResponeDto,
  VehicleModelResponseDto,
  VehicleTypeResponseDto,
} from '@core/models';
import { environment } from '@env/environment';
import { of } from 'rxjs';

describe('ApiService', () => {
  let service: ApiService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    const httpClient = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      providers: [ApiService, { provide: HttpClient, useValue: httpClient }],
    });

    service = TestBed.inject(ApiService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should fetch all makes from API', () => {
    const mockResponse: AllMakesResponeDto = {
      Count: 2,
      Message: 'Respuesta correcta',
      SearchCriteria: '',
      Results: [
        { Make_ID: 1, Make_Name: 'Toyota' },
        { Make_ID: 2, Make_Name: 'Ford' },
      ],
    };

    // Simula que HttpClient.get() devuelve la respuesta esperada
    httpClientSpy.get.and.returnValue(of(mockResponse));

    service.getAllMakes().subscribe((response) => {
      expect(response.Count).toBe(2);
      expect(response.Results[0].Make_Name).toBe('Toyota');
      expect(response.Results[1].Make_Name).toBe('Ford');
    });

    // Verifica que se haya llamado a HttpClient.get con la URL correcta
    expect(httpClientSpy.get).toHaveBeenCalledWith(
      `${environment.apiUrl}/vehicles/getallmakes?format=json`
    );
  });

  it('should fetch vehicle types for make ID from API', () => {
    const mockResponse: VehicleTypeResponseDto = {
      Count: 2,
      Message: 'Respuesta correcta',
      SearchCriteria: '',
      Results: [
        { VehicleTypeId: 1, VehicleTypeName: 'Sedan' },
        { VehicleTypeId: 2, VehicleTypeName: 'SUV' },
      ],
    };

    // Simula que HttpClient.get() devuelve la respuesta esperada
    httpClientSpy.get.and.returnValue(of(mockResponse));

    service.getVehicleTypesForMakeId('1').subscribe((response) => {
      expect(response.Count).toBe(2);
      expect(response.Results[0].VehicleTypeName).toBe('Sedan');
      expect(response.Results[1].VehicleTypeName).toBe('SUV');
    });

    // Verifica que se haya llamado a HttpClient.get con la URL correcta
    expect(httpClientSpy.get).toHaveBeenCalledWith(
      `${environment.apiUrl}/vehicles/GetVehicleTypesForMakeId/1?format=json`
    );
  });

  it('should fetch models for make ID from API', () => {
    const mockResponse: VehicleModelResponseDto = {
      Count: 2,
      Message: 'Respuesta correcta',
      SearchCriteria: '',
      Results: [
        {
          Make_ID: 1,
          Make_Name: 'Toyota',
          Model_ID: 101,
          Model_Name: 'Corolla',
        },
        { Make_ID: 1, Make_Name: 'Toyota', Model_ID: 102, Model_Name: 'Camry' },
      ],
    };

    // Simula que HttpClient.get() devuelve la respuesta esperada
    httpClientSpy.get.and.returnValue(of(mockResponse));

    service.getModelsForMakeId('1').subscribe((response) => {
      expect(response.Count).toBe(2);
      expect(response.Results[0].Model_Name).toBe('Corolla');
      expect(response.Results[1].Model_Name).toBe('Camry');
    });

    // Verifica que se haya llamado a HttpClient.get con la URL correcta
    expect(httpClientSpy.get).toHaveBeenCalledWith(
      `${environment.apiUrl}/vehicles/GetModelsForMakeId/1?format=json`
    );
  });
});
