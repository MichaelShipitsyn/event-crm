import faker from 'faker';

export const buildUser = () => {
  return {
    id: faker.random.number(),
    email: faker.internet.email(),
    firstname: faker.name.findName(),
    lastname: faker.name.lastName(),
    avatar: faker.image.imageUrl(),
    phone: faker.phone.phoneNumber(),
    is_owner: true,
    is_admin: true,
    is_active: true
  };
};
