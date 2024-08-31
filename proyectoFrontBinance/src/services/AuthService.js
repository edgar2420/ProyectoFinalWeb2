const baseURL = 'http://localhost:3000/api';

export const postLogin = (credentials) => {
    return new Promise((resolve, reject) => {
        fetch(`${baseURL}/usuarios/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then((data) => {
                    const error = new Error('Network response was not ok');
                    error.response = {
                        status: response.status,
                        data: data
                    };
                    throw error;
                });
            }
            return response.json();
        })
        .then(data => resolve(data))
        .catch(error => reject(error));
    });
}