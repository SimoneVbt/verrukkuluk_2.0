import { ADD_FAVOURITE, DELETE_FAVOURITE } from "./types";


export const addFavourite = favourite => {
  console.log({ action: ADD_FAVOURITE})
  return { type: ADD_FAVOURITE, favourite }
};

//export const deleteFavourite = () => {
//// ...
//}