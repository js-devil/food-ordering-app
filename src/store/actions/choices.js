export const FOOD_CHOICES = "choices:foodPicked";

export const foodPicked = data => {
  return {
    type: FOOD_CHOICES,
    data
  };
};
