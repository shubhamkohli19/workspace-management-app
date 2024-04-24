export interface RentalForm {
    id?: number;
    location: string;
    rentDate: string;
    returnDate: string;
    selectedAssets: string[];
    selectedService: string;
    email: string;
  }