// --- Fruit basket tests: adding and removing fruits, general basket state management

// function taken from BaskProvider.js for testing
const addToBasket = (items, fruit) => {
  if (items.some((i) => i.name === fruit.name)) return items;
  return [...items, fruit];
};

const removeFromBasket = (items, fruit) =>
  items.filter((i) => i.name !== fruit.name);

const seedBasket = (user) => user?.fruitBasket || [];

test("a fruit is added to basket successfully", () => {
  const basket = [];
  const apple = { name: "apple" };
  const result = addToBasket(basket, apple);
  expect(result).toHaveLength(1);
  expect(result[0].name).toBe("apple");
});

test("a fruit is removed from the basket successfully", () => {
  const apple = { name: "apple" };
  const banana = { name: "banana" };
  const basket = [apple, banana];
  const result = removeFromBasket(basket, apple);
  expect(result).toHaveLength(1);
  expect(result[0].name).toBe("banana");
});

test("a fruit can be added to the basket without logged usr", () => {
  const basket = [];
  const banana = { name: "banana" };
  const result = addToBasket(basket, banana);
  expect(result).toHaveLength(1);
});

test("a fruit can be removed from the basket without a logd in user", () => {
  const apple = { name: "apple" };
  const basket = [apple];
  const result = removeFromBasket(basket, apple);
  expect(result).toHaveLength(0);
});
