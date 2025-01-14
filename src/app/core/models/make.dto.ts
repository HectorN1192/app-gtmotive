export interface AllMakesResponeDto {
  Count: number;
  Message: string;
  SearchCriteria: string;
  Results: MakeDto[];
}

export interface MakeDto {
  Make_ID: number;
  Make_Name: string;
}
