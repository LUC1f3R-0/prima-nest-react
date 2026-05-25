export type Address = {
  street: string;
  city: string;
  country: string;
};

export type Person = {
  id: number;
  uuid: string;
  name: string;
  email: string;
  dateOfBirth: string;
  addresses: Address[];
  image: string | null;
  createdAt: string;
  updatedAt: string;
};

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export type GetPersonsResponse = ApiResponse<{
  data: Person[];
}>;

export type CreatePersonResponse = ApiResponse<Person>;