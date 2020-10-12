// const environment = 1;
// const home = "192.168.0.108"; //wifi is 108, kabel is 109
// const work = "192.168.1.244";
// const ip = environment === 1 ? home : work;
const ip = "192.168.11.112";

//basis
const baseUrl = `http://${ ip }/verrukkuluk_2.0/api/public/index.php/api`;
const userPhotoUrl = `http://${ ip }/verrukkuluk_2.0/api/public/gebruikers/`;

//login
const loginUrl = baseUrl + "/gebruiker/login";
const userUrl = baseUrl + "/gebruiker/get/";

//gerechten
const dishUrl = baseUrl + "/gerecht/get/";
const allDishesUrl = baseUrl + "/gerecht/get_all/";
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


export {
    baseUrl,userPhotoUrl, 
    loginUrl, userUrl,
    dishUrl, allDishesUrl, ingrUrl,
    addInfoUrl, deleteInfoUrl, prepUrl, commUrl,
    listUrl, addToListUrl, addDishToListUrl, setAmountUrl, deleteListUrl
};