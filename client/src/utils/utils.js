import Cookies from "js-cookie";

export const setCookie = (name , value) => {
    return Cookies.set(name,value)
}

export const getCookie = (name , value) => {
    return Cookies.get(name,value)
}

export const delCookie = (name , value) => {
    return Cookies.remove(name,value)
}