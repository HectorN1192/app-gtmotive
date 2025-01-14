export interface VehicleTypeResponseDto {
  Count: number;
  Message: string;
  SearchCriteria: string;
  Results: VehicleTypeDto[];
}

export interface VehicleTypeDto {
  VehicleTypeId: number;
  VehicleTypeName: string;
}
