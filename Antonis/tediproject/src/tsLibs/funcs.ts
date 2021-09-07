export const getPic = (avatar: String): String => {
    if(avatar){
        return "https://localhost:8000/upload/files/"+avatar
    }else{
        return require("@/assets/blank-profile-picture.png")
    }
}