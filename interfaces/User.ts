interface ServiceProfile {
  serviceImg: string;
  servicesPerformed: number;
  rating: number;
  specialty: string;
  availability: string;
  description: string;
  location: Location;
}

interface Location {
  city: string;
  state: string;
}

interface User {
  phone: string;
  fullName: string;
  password: string;
  serviceProfile?: ServiceProfile;
}

interface UserDTO {
  phone: string;
  fullName: string;
  serviceProfile?: ServiceProfile;
}

export type { User, UserDTO, ServiceProfile, Location };
