interface Profile {
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

interface ProfileDTO {
  phone: string;
  fullName: string;
  serviceProfile?: {
    serviceImg: string;
    servicesPerformed: number;
    specialty: string;
    availability: string;
    description: string;
    location: {
      city: string;
      state: string;
    };
  };
}

export type { Profile, ProfileDTO };