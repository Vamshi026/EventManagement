
export const BASE_URL = "http://localhost:8080";


export function removeToken(){
    localStorage.removeItem("jwtToken");
    return ;
}

export function createTokenStorage(token){
    localStorage.setItem("jwtToken",token)
    console.log("token created")
    return ;
}
