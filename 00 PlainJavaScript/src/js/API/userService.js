(function (api) {
  api.userService = (function () {
    const baseUrl = `http://localhost:8000/api/users`;
    const getUsers = function getUsers() {
      let promise = new Promise(function (resolve, reject) {
        const client = new XMLHttpRequest();
        client.onload = (event) => resolve(event.target.responseText);
        client.onerror = (event) => reject(event.target.statusText);
        client.open('get', baseUrl);
        client.send();
      });
      return promise;
    };

    const postUser = function postUser(user) {
      let params = typeof user == 'string' ? user : Object.keys(user).map(
        key => encodeURIComponent(key) + '=' + encodeURIComponent(user[key])
      ).join('&');

      let promise = new Promise(function (resolve, reject) {
        const client = new XMLHttpRequest();
        client.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        client.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        client.onload = (event) => {
          const result = JSON.parse(event.target.response);
          resolve(result);
        };
        client.onerror = (event) => {
          const result = JSON.parse(event.target.responseText);
          reject(result);
        };
        client.open('post', baseUrl);
        client.send(params);
      });
      return promise;
    };

    return {
      getUsers,
      postUser
    };
  })(); 
})(api)
