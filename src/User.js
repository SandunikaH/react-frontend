import axios from "axios";

class User
{
    static instance = null;

    email = null;
    token = null;
    isAuthenticated = false;

    constructor(email = null) {
        this.email = email;
        User.instance = this;
        this.token = localStorage.getItem('token');
    }

    static GetInstance(){ return User.instance }

    static IsAuthenticated() {
        if (User.GetInstance() !== null){
            return User.GetInstance().IsAuthenticated();
        }else {
            return false;
        }
    }

    static ValidateAccessToken(){
        return new Promise((resolve, reject)=>{
            if (User.IsAuthenticated()){
                return resolve(true);
            }

            const localToken = localStorage.getItem('token') || '';
            axios.get('http://localhost:8080/users/validate', {headers:{'Authorization': `bearer ${localToken}`}})
                .then((response)=>{
                    new User(response.data.email);
                    User.GetInstance().isAuthenticated = true;
                    return resolve(true);
                })
                .catch(()=>{
                    return resolve(false);
                })
        })
    }

    GetEmailAddress(){
        return this.email;
    }

    IsAuthenticated(){
        return this.isAuthenticated;
    }

    Authenticate(password){
        return new Promise((resolve, reject) => {
            axios.post('http://localhost:8080/users/login', {
                email: this.email,
                password: password,
            })
                .then(response => {
                    this.isAuthenticated = true;
                    this.token = response.data.token;
                    localStorage.setItem('token', this.token);
                    return resolve(true);
                })
                .catch(error => {
                    console.log(error);
                    this.isAuthenticated = false;
                    return resolve(false);
                })
        });
    }
}

export default User