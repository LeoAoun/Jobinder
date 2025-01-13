import axios from "axios";
import bcrypt from "bcryptjs-react";
import { getCities } from "../services/locationServices";

import { User } from "../../interfaces/User";
import { createUsers } from "../services/userServices";

const imgs = [
  "adv1.jpeg",
  "adv2.jpeg",
  "adv3.jpeg",
  "coz1.jpeg",
  "coz2.jpeg",
  "coz3.jpeg",
  "dj1.jpeg",
  "dj2.jpeg",
  "dj3.jpeg",
  "ele1.jpeg",
  "ele2.jpeg",
  "ele3.jpeg",
  "enc1.jpeg",
  "enc2.jpeg",
  "enc3.jpeg",
  "j1.png",
  "j2.png",
  "j3.png",
  "j4.png",
  "j5.png",
  "man1.jpeg",
  "man2.jpeg",
  "man3.jpeg",
  "mar1.jpg",
  "mar2.jpg",
  "mar3.jpg",
  "per1.jpeg",
  "per2.jpeg",
  "per3.jpeg",
  "pin1.jpg",
  "pin2.jpg",
  "s1.png",
  "s2.png",
  "s3.png",
  "s4.png",
  "s5.png",
  "s6.png",
  "sau1.jpeg",
  "sau2.jpeg",
  "sau3.jpeg",
];

const specialtiesList = [
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
  "Saude", // 37 - 39
];

const availabilityList = [
  "Segunda a sexta-feira das 8h às 18h",
  "Segunda a sexta-feira das 9h às 19h",
  "Segunda a sexta-feira das 10h às 20h",
  "Segunda a sexta-feira das 11h às 21h",
  "Segunda a sexta-feira das 12h às 22h",
];

const usersToGenerate: number = 5;

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

const getSpecialty = (index: number): string => {
  const totalSpecialties = specialtiesList.length;

  const cyclicIndex = index % totalSpecialties;

  return specialtiesList[cyclicIndex];
};

const createFakeUsers = async () => {
  const usersTest: Record<string, User> = {};

  const users = await getRandomUsers();
  const cities = await getCities("SP");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  users.forEach((user: any, index: number) => {
    const phone = user.cell.replace(/[^0-9]/g, "");
    const hashPassword = bcrypt.hashSync(user.login.password, 10);

    const randomRating = Math.floor(Math.random() * 5) + 1;
    const randomServicesPerformed = Math.floor(Math.random() * 100);
    const getRandomCity = cities[Math.floor(Math.random() * cities.length)];
    const randomAvailability =
      availabilityList[Math.floor(Math.random() * availabilityList.length)];

    const userTest: User = {
      phone,
      fullName: `${user.name.first} ${user.name.last}`,
      password: hashPassword,
      serviceProfile: {
        serviceImg: `assets/images/${imgs[index]}`,
        servicesPerformed: randomServicesPerformed,
        rating: randomRating,
        specialty: getSpecialty(index),
        availability: randomAvailability,
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc ultricies tincidunt. Nullam nec purus nec nunc ultricies tincidunt. Nullam nec purus nec nunc",
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
