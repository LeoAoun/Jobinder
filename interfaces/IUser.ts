interface ILocation {
  city: string;
  state: string;
}

interface IServiceProfile {
  serviceImg: string;
  servicesPerformed: number;
  rating: number;
  specialty: string;
  availability: string;
  description: string;
  location: ILocation;
}

interface IUser {
  phone: string;
  fullName: string;
  password: string;
  serviceProfile?: IServiceProfile;
}

interface IUserDTO {
  phone: string;
  fullName: string;
  serviceProfile?: IServiceProfile;
}

export type { IUser, IUserDTO, IServiceProfile, ILocation };
