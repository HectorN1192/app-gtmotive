export interface VehicleModelResponseDto {
  Count: number;
  Message: string;
  SearchCriteria: string;
  Results: VehicleModelDto[];
}

export interface VehicleModelDto {
  Make_ID: number;
  Make_Name: string;
  Model_ID: number;
  Model_Name: string;
}
