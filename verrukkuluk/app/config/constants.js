const environment = 0;
const home = "192.168.0.109";
const work = "192.168.1.244";
const ip = environment === 1 ? home : work;

const baseUrl = `http://${ ip }/verrukkuluk_2.0/api/public/index.php/api`;
const loginUrl = baseUrl + "/gebruiker/login";
const userUrl = baseUrl + "/gebruiker/get/";
const allDishesUrl = baseUrl + "/gerecht/get_all/";

const prepUrl = baseUrl + "/gerechtinfo/get/B/";
const commUrl = baseUrl + "/gerechtinfo/get/O/";
const ingrUrl = baseUrl + "/ingredient/get/";

const userPhotoUrl = `http://${ ip }/verrukkuluk_2.0/api/public/gebruikers/`;


export { baseUrl,
    loginUrl, allDishesUrl, userUrl,
    prepUrl, commUrl, ingrUrl,
    userPhotoUrl };