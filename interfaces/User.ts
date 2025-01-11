interface User {
  phone: string;
  fullName: string;
  password: string;
  serviceProfile?: {
    serviceImg: string;
    servicesPerformed: number;
    rating: number;
    specialty: string;
    availability: string;
    description: string;
    location: {
      city: string;
      state: string;
    };
  };
}

interface UserDTO {
  phone: string;
  fullName: string;
  serviceProfile?: {
    serviceImg: string;
    servicesPerformed: number;
    rating: number;
    specialty: string;
    availability: string;
    description: string;
    location: {
      city: string;
      state: string;
    };
  };
}

export type { User, UserDTO };
