export type ProviderDTO = {
  id: number;
  email: string;
  name: string;
  telephone: string;
  direccion: string;
  // tu entidad tiene soft delete (deleteAt) pero no lo traes en list
  deleteAt?: string | null;
};

export type CreateProviderDTO = {
  email: string;
  name: string;
  telephone: string;
  direccion: string;
};

export type UpdateProviderDTO = Partial<CreateProviderDTO>;
