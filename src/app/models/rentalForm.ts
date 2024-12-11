export interface RentalForm {
  id?: number;
  service: string;
  location: string;
  rentDate: Date;
  returnDate: Date;
  assets: string;
  email: string | null;
}