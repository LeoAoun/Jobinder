import axios from "axios";
import bcrypt from "bcryptjs-react";
import { getCities } from "../services/locationServices";

import { IUser } from "../../interfaces/IUser";
import { createUsers } from "../services/userServices";
import {
  advocaciaServices,
  cozinheiroServices,
  desenvolvedorServices,
  DJServices,
  eletricistaServices,
  encanadorServices,
  jardineiroServices,
  manicureServices,
  marceneiroServices,
  personalServices,
  pintorServices,
  saudeServices,
} from "./fakeUserServices";

const specialtiesList: string[] = [
  "Advocacia", // 0 - 2
  "Cozinheiro", // 3 - 5
  "Musica", // 6 - 8
  "Eletricista", // 9 - 11
  "Encanador", // 12 - 14
  "Jardinagem", // 15 - 19
  "Manicure", // 20 - 22
  "Marcenaria", // 23 - 25
  "Personal", // 26 - 28
  "Pintor", // 29 - 30
  "Desenvolvedor de Software", // 31 - 36
  "Saúde", // 37 - 39
];

const imagesBySpecialty: Record<string, string[]> = {
  Advocacia: ["adv1.jpeg", "adv2.jpeg", "adv3.jpeg"],
  Cozinheiro: ["coz1.jpeg", "coz2.jpeg", "coz3.jpeg"],
  Musica: ["dj1.jpeg", "dj2.jpeg", "dj3.jpeg"],
  Eletricista: ["ele1.jpeg", "ele2.jpeg", "ele3.jpeg"],
  Encanador: ["enc1.jpeg", "enc2.jpeg", "enc3.jpeg"],
  Jardinagem: ["j1.png", "j2.png", "j3.png", "j4.png", "j5.png"],
  Manicure: ["man1.jpeg", "man2.jpeg", "man3.jpeg"],
  Marcenaria: ["mar1.jpg", "mar2.jpg", "mar3.jpg"],
  Personal: ["per1.jpeg", "per2.jpeg", "per3.jpeg"],
  Pintor: ["pin1.jpg", "pin2.jpg"],
  "Desenvolvedor de Software": ["s1.png", "s2.png", "s3.png", "s4.png", "s5.png", "s6.png"],
  Saúde: ["sau1.jpeg", "sau2.jpeg", "sau3.jpeg"],
};

const servicesBySpecialty: Record<string, string[]> = {
  Advocacia: advocaciaServices,
  Cozinheiro: cozinheiroServices,
  Musica: DJServices,
  Eletricista: eletricistaServices,
  Encanador: encanadorServices,
  Jardinagem: jardineiroServices,
  Manicure: manicureServices,
  Marcenaria: marceneiroServices,
  Personal: personalServices,
  Pintor: pintorServices,
  "Desenvolvedor de Software": desenvolvedorServices,
  Saúde: saudeServices,
};

const availabilityList: string[] = [
  "Segunda a sexta-feira das 8h às 18h",
  "Segunda a sexta-feira das 9h às 19h",
  "Segunda a sexta-feira das 10h às 20h",
  "Segunda a sexta-feira das 11h às 21h",
  "Segunda a sexta-feira das 12h às 22h",
];

const usersToGenerate: number = 40;

const getRandomUsers = async () => {
  try {
    const response = await axios.get(
      `https://randomuser.me/api/?results=${usersToGenerate}&nat=br`
    );
    const users = response.data.results;
    return users;
  } catch (error) {
    console.error("Error fetching random users:", error);
    return [];
  }
};

const getSpecialtyByIndex = (index: number): string => {
  const totalSpecialties = specialtiesList.length;

  const cyclicIndex = index % totalSpecialties;

  return specialtiesList[cyclicIndex];
};

const createFakeUsers = async () => {
  const usersTest: Record<string, IUser> = {};

  const users = await getRandomUsers();
  const cities = await getCities("SP");

  // Create a counter for each specialty to cycle through images
  const imageCounters: Record<string, number> = {};
  specialtiesList.forEach((specialty) => {
    imageCounters[specialty] = 0;
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  users.forEach((user: any, index: number) => {
    const phone = user.cell.replace(/[^0-9]/g, "");

    const fullName = `${user.name.first} ${user.name.last}`;

    const hashPassword = bcrypt.hashSync(user.login.password, 10);

    const specialty = getSpecialtyByIndex(index);

    const randomRating = Math.floor(Math.random() * 5) + 1;

    const randomServicesPerformed = Math.floor(Math.random() * 100);

    const getRandomCity = cities[Math.floor(Math.random() * cities.length)];

    const randomAvailability =
      availabilityList[Math.floor(Math.random() * availabilityList.length)];

    const relevantImages = imagesBySpecialty[specialty];
    const currentImageIndex = imageCounters[specialty];
    const sequentialImage = relevantImages[currentImageIndex % relevantImages.length];
    const serviceImg = `assets/images/${sequentialImage}`;
    imageCounters[specialty]++;

    const relevantServices = servicesBySpecialty[specialty];
    const randomDescription = relevantServices[Math.floor(Math.random() * relevantServices.length)];

    const userTest: IUser = {
      phone: phone,
      fullName: fullName,
      password: hashPassword,
      serviceProfile: {
        serviceImg: serviceImg,
        servicesPerformed: randomServicesPerformed,
        rating: randomRating,
        specialty: specialty,
        availability: randomAvailability,
        description: randomDescription,
        location: {
          city: getRandomCity,
          state: "SP",
        },
      },
    };

    usersTest[phone] = userTest;
  });

  await createUsers(usersTest);

  return usersTest;
};

export { getRandomUsers, createFakeUsers };
