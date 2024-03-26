const { faker } = require('@faker-js/faker');

const product = () => {
  return {
    nameProduct: faker.commerce.productName(),
    priceProduct: parseFloat(faker.commerce.price()),
    image: faker.image.url(),
    descriptionProduct: faker.commerce.productDescription(),
    stock: faker.number.int({ min: 1, max: 100 }),
    categoryId: faker.number.int({ min: 1, max: 5 }),
    promotion: false,
    discount: faker.number.int({ min: 10, max: 75 }),
  };
};

const randomRequest = async () => {
  for (let i = 0; i < 30; i++) {
    try {
      await fetch('http://localhost:3000/api/v1/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer token',
        },
        body: JSON.stringify(product()),
      });
    } catch (error) {
      console.error(error);
    }
  }
};
randomRequest();
