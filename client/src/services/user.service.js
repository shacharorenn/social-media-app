class UserServices {
    constructor(){
        this.url = 'https://academeez-login-ex.herokuapp.com/api/users/';
    }

    _createRequest = (values, url) => {
        return fetch(url, {
            method: 'POST',
            body: JSON.stringify(values),
            headers: {
                'Content-Type':'application/json'
            }
        }).then((response) => {
            if(response.status >=300 || response.status < 200){
                const loginFailed = new Error();
                loginFailed.response = response;
                throw loginFailed;
            }
            return response.json()
        }).then(json => json.token);
    }

    login = (values) => {
        debugger;
        return this._createRequest(values , `${this.url}login`)
    }
    register = (values) => {
        return this._createRequest(values , `${this.url}register`)
    }

    

}

export default new UserServices();