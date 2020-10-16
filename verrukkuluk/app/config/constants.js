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

//login
const loginUrl = baseUrl + "/gebruiker/login";
const userUrl = baseUrl + "/gebruiker/get/";

//gerechten
const dishUrl = baseUrl + "/gerecht/get/";
const allDishesUrl = baseUrl + "/gerecht/get_all/";
const createDishUrl = baseUrl + "/gerecht/create";
const ingrUrl = baseUrl + "/ingredient/get/";

//gerechtinfo
const addInfoUrl = baseUrl + "/gerechtinfo/create";
const deleteInfoUrl = baseUrl + "/gerechtinfo/delete/";
const prepUrl = baseUrl + "/gerechtinfo/get/B/";
const commUrl = baseUrl + "/gerechtinfo/get/O/";

//boodschappen
const listUrl = baseUrl + "/boodschappen/get/";
const addToListUrl = baseUrl + "/boodschappen/add";
const addDishToListUrl = baseUrl + "/boodschappen/add_dish";
const setAmountUrl = baseUrl + "/boodschappen/set_amount";
const deleteListUrl = baseUrl + "/boodschappen/delete/";

//keukentype
const typeUrl = baseUrl + "/kt/get/types";
const kitchenUrl = baseUrl + "/kt/get/kitchens";


export {
    defaultDish, defaultUser,
    loginUrl, userUrl,
    dishUrl, allDishesUrl, createDishUrl, ingrUrl,
    addInfoUrl, deleteInfoUrl, prepUrl, commUrl,
    listUrl, addToListUrl, addDishToListUrl, setAmountUrl, deleteListUrl,
    typeUrl, kitchenUrl
};