import { FOOD_CHOICES } from "../actions/choices";

export const choices = (state = [], { type, data }) => {
  switch (type) {
    case FOOD_CHOICES:
      return data;
    default:
      return state;
  }
};
