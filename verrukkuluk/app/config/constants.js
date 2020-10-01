const environment = 1;
const home = "192.168.0.109";
const work = "192.168.1.244";
const ip = environment === 1 ? home : work;


const baseUrl = `http://${ ip }/verrukkuluk_2.0/api/public/index.php/api`;
const userPhotoUrl = `http://${ ip }/verrukkuluk_2.0/api/public/gebruikers/`;

const loginUrl = baseUrl + "/gebruiker/login";
const userUrl = baseUrl + "/gebruiker/get/";

const dishUrl = baseUrl + "/gerecht/get/";
const allDishesUrl = baseUrl + "/gerecht/get_all/";
const ingrUrl = baseUrl + "/ingredient/get/";

const addInfoUrl = baseUrl + "/gerechtinfo/create";
const deleteInfoUrl = baseUrl + "/gerechtinfo/delete/";
const prepUrl = baseUrl + "/gerechtinfo/get/B/";
const commUrl = baseUrl + "/gerechtinfo/get/O/";


export {
    baseUrl,userPhotoUrl, 
    loginUrl, userUrl,
    dishUrl, allDishesUrl, ingrUrl,
    addInfoUrl, deleteInfoUrl, prepUrl, commUrl
};