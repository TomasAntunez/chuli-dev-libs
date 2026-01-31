console.log('Hello, world!');

export const getSomething = (bool?: boolean) => {
  if (bool) {
    return;
  }

  return 'You passed nothing!';
};

const result = getSomething();
console.log(result);
