const environment = 1;
const home = "192.168.0.109";
const work = "192.168.1.244";
const ip = environment === 1 ? home : work;

//basis
const baseUrl = `http://${ ip }/verrukkuluk_2.0/api/public/index.php/api`;
const publicDir = `http://${ ip }/verrukkuluk_2.0/api/public/`;

//defaults
const defaultDish = publicDir + "defaultdish.png";
const defaultUser = publicDir + "defaultuser.png";

//login & registreren
const loginUrl = baseUrl + "/gebruiker/login";
const userUrl = baseUrl + "/gebruiker/get/";
const newUserUrl = baseUrl + "/gebruiker/create";

//gerechten
const dishUrl = baseUrl + "/gerecht/get/";
const allDishesUrl = baseUrl + "/gerecht/get_all/";
const createDishUrl = baseUrl + "/gerecht/create";

//ingrediënten
const ingrUrl = baseUrl + "/ingredient/get/";
const articlesUrl = baseUrl + "/artikel/get";
const postIngrUrl = baseUrl + "/ingredient/set_dish_ingredients";
const deleteIngrUrl = baseUrl + "/ingredient/delete/";

//gerechtinfo
const addInfoUrl = baseUrl + "/gerechtinfo/create";
const deleteInfoUrl = baseUrl + "/gerechtinfo/delete/";
const prepUrl = baseUrl + "/gerechtinfo/get/B/";
const setPrepUrl = baseUrl + "/gerechtinfo/set_prep_steps";
const commUrl = baseUrl + "/gerechtinfo/get/O/";

//boodschappen
const listUrl = baseUrl + "/boodschappen/get/";
const addToListUrl = baseUrl + "/boodschappen/add";
const addDishToListUrl = baseUrl + "/boodschappen/add_dish";
const setAmountUrl = baseUrl + "/boodschappen/set_amount";
const deleteFromListUrl = baseUrl + "/boodschappen/delete/";
const deleteListUrl = baseUrl + "/boodschappen/delete_all/";

//keukentype
const typeUrl = baseUrl + "/kt/get/types";
const kitchenUrl = baseUrl + "/kt/get/kitchens";


export {
    defaultDish, defaultUser,
    loginUrl, userUrl, newUserUrl,
    dishUrl, allDishesUrl, createDishUrl,
    ingrUrl, articlesUrl, postIngrUrl, deleteIngrUrl,
    addInfoUrl, deleteInfoUrl, prepUrl, setPrepUrl, commUrl,
    listUrl, addToListUrl, addDishToListUrl, setAmountUrl, deleteFromListUrl, deleteListUrl,
    typeUrl, kitchenUrl
};