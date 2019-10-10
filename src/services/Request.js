export default class Request {

    constructor(token) {
        this.token = token;
    }

    async post(path, data) {

        var headers = {
            'Content-Type': 'application/json'
        }

        if (this.token !== undefined) {
            headers["Authorization"] = `Bearer ${this.token}`;
        }

        let response = await fetch(path, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: headers
        });

        if (response.status === 200 || response.status === 201) {
            const status = response.status;
            let responseMod = await response.json();
            responseMod['status'] = status;
            return responseMod;
        } else {
            return {
                'status': response.status
            };
        }

    }

    async put(path, data) {

        var headers = {
            'Content-Type': 'application/json'
        }

        if (this.token !== undefined) {
            headers["Authorization"] = `Bearer ${this.token}`;
        }

        let response = await fetch(path, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: headers
        });

        if (response.status === 200 || response.status === 201) {
            return response.json();
        }

        return undefined;
    }


    async get(path) {

        var headers = {
            'Content-Type': 'application/json'
        }

        if (this.token !== undefined) {
            headers["Authorization"] = `Bearer ${this.token}`;
        }

        let response = await fetch(path, {
            method: 'GET',
            headers: headers
        });

        if (response.status === 200 || response.status === 201) {
            const status = response.status;
            let responseMod = await response.json();
            responseMod['status'] = status;
            return responseMod;
        } else {
            return {
                'status': response.status
            };
        }
    }

    async delete(path) {

        var headers = {
            'Content-Type': 'application/json'
        }

        if (this.token !== undefined) {
            headers["Authorization"] = `Bearer ${this.token}`;
        }

        console.log('Headers', headers);

        let response = await fetch(path, {
            method: 'DELETE',
            headers: headers
        });

        if (response.status === 200 || response.status === 201) {
            return response.json();
        }

        return undefined;
    }

}