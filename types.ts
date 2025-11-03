export interface MatingRecord {
  id: string;
  maleId: string;
  maleName: string;
  date: string;
}

export enum Gender {
  Male = 'Macho',
  Female = 'Fêmea',
}

export interface Horse {
  id: string;
  name: string;
  birthDate: string;
  gender: Gender;
  father?: string;
  mother?: string;
  chip?: string;
  registro?: string;
  picture?: string; // base64 string
  matingHistory: MatingRecord[];
  birthPlace?: string;
  deliveryDetails?: string;
}