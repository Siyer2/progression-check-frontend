const axios = require('axios');

const domain = process.env.REACT_APP_DEPLOYMENT === 'production' ? '' : 'http://localhost:3000';

module.exports = {
    getProgramList: function (query) {
        return new Promise(async (resolve, reject) => {
            try {
                var config = {
                    method: 'post',
                    url: `${domain}/autocompletePrograms`,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: { query }
                };

                axios(config)
                    .then(function (response) {
                        resolve(response.data);
                    })
                    .catch(function (error) {
                        console.log("AXIOS ERROR GETTING PROGRAM LIST", error);
                        reject(error);
                    });
            } catch (ex) {
                console.log("EXCEPTION GETTING PROGRAM LIST", ex);
                reject(ex);
            }
        });
    }, 
    getProgram: function (code, year) {
        return new Promise(async (resolve, reject) => {
            try {

                var config = {
                    method: 'post',
                    url: `${domain}/getProgram`,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: {
                        code: code,
                        implementation_year: year
                    }
                };

                axios(config)
                    .then(function (response) {
                        resolve(response.data);
                    })
                    .catch(function (error) {
                        console.log("AXIOS ERROR GETTING PROGRAM", error);
                        reject(error);
                    });
            } catch (ex) {
                console.log("EXCEPTION GETTING PROGRAM", ex);
                reject(ex);
            }
        });
    }, 
    getRequirements: function(code, implementation_year, specialisations) {
        return new Promise(async (resolve, reject) => {
            try {
                var postData = {
                    code, implementation_year, specialisations
                }

                var config = {
                    method: 'post',
                    url: `${domain}/getRequirements`,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: postData
                };

                axios(config)
                    .then(function (response) {
                        resolve(response.data);
                    })
                    .catch(function (error) {
                        console.log("AXIOS ERROR GETTING REQUIREMENTS", error);
                        reject(error);
                    });
            } catch (ex) {
                console.log("EXCEPTION GETTING REQUIREMENTS", ex);
                reject(ex);
            }
        });
    }
};
