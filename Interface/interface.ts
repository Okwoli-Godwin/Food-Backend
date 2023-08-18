export interface Iuser {
  email: string;
  password: string;
  longitude: string;
  latitude: string;
  fullname: string
} // setting the Object Type for User
export interface IAdmin {
  email: string;
  password: string;
} // setting the Object Type for Admin
export interface IRestaurants {
  nameOfRestaurants: string;

  availableMeals: [];
  location: string;
  latitude: string;
  longitude: string;
} // setting the Object Type for restaurants

{
}
