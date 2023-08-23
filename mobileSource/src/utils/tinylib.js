import Storage from './storage';
import Utils from './utils';

// class db {
//     constructor(path) {
//         this.path = path;
//     }
//     async rootPath() {
//         let form = new FormData();
//         const isAuthRequired =  await Storage.get('isAuthRequired') || null;
//         if(isAuthRequired){
//             form.append('token',  await Storage.get('token'));
//         }
//         form.append('getRoot', 'true');
//         let options = {
//             method: 'POST',
//             body: form
//         };
//         const req = await fetch(this.path, options);
//         const res = req.json()
//         return res;
//     }
//     async isAuthRequired() {
//         let form = new FormData();
//         form.append('isAuthRequired', 'true');
//         let options = {
//             method: 'POST',
//             body: form
//         };
//         const req = await fetch(this.path, options);
//         const res = req.json()
//         return res;
//     }
//     async getFolder(path) {
//         this.error({}, path)
//         let form = new FormData();
//         const isAuthRequired = await Storage.get('isAuthRequired') || null;
//         if(isAuthRequired){
//             form.append('token', await Storage.get('token'));
//         }
//         form.append('getFolder', 'true');
//         form.append('path', path);
//         let options = {
//             method: 'POST',
//             body: form
//         };
//         const req = await fetch(this.path, options);
//         const res = req.json()
//         return res;
//     }
//     async fileRename(currentPath, renamePath) {
//         this.error(currentPath, renamePath)
//         let form = new FormData();
//         const isAuthRequired = await Storage.get('isAuthRequired') || null;
//         if(isAuthRequired){
//             form.append('token', await Storage.get('token'));
//         }
//         form.append('rename', 'true');
//         form.append('getFolder', currentPath);
//         form.append('path', renamePath);
//         let options = {
//             method: 'POST',
//             body: form
//         };
//         const req = await fetch(this.path, options);
//         const res = req.json()
//         return res;
//     }
//     async createFolder(folder, path) {
//         this.error(folder, path)
//         let form = new FormData();
//         const isAuthRequired = await Storage.get('isAuthRequired') || null;
//         if(isAuthRequired){
//             form.append('token', await Storage.get('token'));
//         }
//         form.append('create', 'true');
//         form.append('path', path);
//         form.append('folder', folder);
//         let options = {
//             method: 'POST',
//             body: form
//         };
//         const req = await fetch(this.path, options);
//         const res = req.json()
//         return res;
//     }
//     async createFile(path, data) {
//         this.error(data, path)
//         let form = new FormData();
//         const isAuthRequired = await Storage.get('isAuthRequired') || null;
//         if(isAuthRequired){
//             form.append('token', await Storage.get('token'));
//         }
//         form.append('create', 'true');
//         form.append('path', path);
//         form.append('data', JSON.stringify(data));
//         let options = {
//             method: 'POST',
//             body: form
//         };
//         const req = await fetch(this.path, options);
//         const res = req.json()
//         return res;
//     }
//     async getFile(path) {
//         this.error({}, path)
//         let form = new FormData();
//         const isAuthRequired = await Storage.get('isAuthRequired') || null;
//         if(isAuthRequired){
//             form.append('token', await Storage.get('token'));
//         }
//         form.append('get', 'true');
//         form.append('path', path);
//         let options = {
//             method: 'POST',
//             body: form
//         };
//         const req = await fetch(this.path, options);
//         const res = req.json()
//         return res;
//     }
//     async putFile(path = null, data = null) {
//         this.error(data, path)
//         let form = new FormData();
//         const isAuthRequired = await Storage.get('isAuthRequired') || null;
//         if(isAuthRequired){
//             form.append('token', await Storage.get('token'));
//         }
//         form.append('save', 'true');
//         form.append('path', path);
//         form.append('data', JSON.stringify(data));
//         let options = {
//             method: 'POST',
//             body: form
//         };
//         const req = await fetch(this.path, options);
//         const res = req.json()
//         return res;

//     }
//     async login(username = null, password = null) {
//         this.error(username, password)
//         let form = new FormData();
//         form.append('login', 'true');
//         form.append('username', username);
//         form.append('password', password);
//         let options = {
//             method: 'POST',
//             body: form
//         };
//         const req = await fetch(this.path, options);
//         const res = req.json()
//         return res;

//     }
//     async deleteFile(path) {
//         this.error({}, path)
//         let form = new FormData();
//         const isAuthRequired = await Storage.get('isAuthRequired') || null;
//         if(isAuthRequired){
//             form.append('token', await Storage.get('token'));
//         }
//         form.append('remove', 'true');
//         form.append('path', path);
//         let options = {
//             method: 'POST',
//             body: form
//         };
//         const req = await fetch(this.path, options);
//         const res = req.json()
//         return res;
//     }
//     error(data, path) {
//         if (path == null) {
//             throw ("Error : Function  : path parameter not present")
//         }
//         if (data == null) {
//             throw ("Error : Function  : Data parameter not present")
//         }
//     }
// }
class db {
    constructor(path) {
      this.path = path;
    }
    
    async rootPath() {
      let form = new FormData();
      const isAuthRequired = await Storage.get('isAuthRequired') || null;
      if (isAuthRequired) {
        form.append('token', await Storage.get('token'));
      }
      form.append('getRoot', 'true');
      
      return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', this.path);
        
        xhr.onload = function () {
          if (xhr.status >= 200 && xhr.status < 400) {
            const res = JSON.parse(xhr.responseText);
            resolve(res);
          } else {
            reject(new Error('Request failed with status ' + xhr.status));
          }
        };
        
        xhr.onerror = function () {
          reject(new Error('Request failed'));
        };
        
        xhr.send(form);
      });
    }
    
    async isAuthRequired() {
      let form = new FormData();
      form.append('isAuthRequired', 'true');
      
      return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', this.path);
        
        xhr.onload = function () {
          if (xhr.status >= 200 && xhr.status < 400) {
            const res = JSON.parse(xhr.responseText);
            resolve(res);
          } else {
            reject(new Error('Request failed with status ' + xhr.status));
          }
        };
        
        xhr.onerror = function () {
          reject(new Error('Request failed'));
        };
        
        xhr.send(form);
      });
    }
    
    async getFolder(path) {
      this.error({}, path);
      let form = new FormData();
      const isAuthRequired = await Storage.get('isAuthRequired') || null;
      if (isAuthRequired) {
        form.append('token', await Storage.get('token'));
      }
      form.append('getFolder', 'true');
      form.append('path', path);
      
      return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', this.path);
        
        xhr.onload = function () {
          if (xhr.status >= 200 && xhr.status < 400) {
            const res = JSON.parse(xhr.responseText);
            resolve(res);
          } else {
            reject(new Error('Request failed with status ' + xhr.status));
          }
        };
        
        xhr.onerror = function () {
          reject(new Error('Request failed'));
        };
        
        xhr.send(form);
      });
    }
    
    async fileRename(currentPath, renamePath) {
      this.error(currentPath, renamePath);
      let form = new FormData();
      const isAuthRequired = await Storage.get('isAuthRequired') || null;
      if (isAuthRequired) {
        form.append('token', await Storage.get('token'));
      }
      form.append('rename', 'true');
      form.append('getFolder', currentPath);
      form.append('path', renamePath);
      
      return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', this.path);
        
        xhr.onload = function () {
          if (xhr.status >= 200 && xhr.status < 400) {
            const res = JSON.parse(xhr.responseText);
            resolve(res);
          } else {
            reject(new Error('Request failed with status ' + xhr.status));
          }
        };
        
        xhr.onerror = function () {
          reject(new Error('Request failed'));
        };
        
        xhr.send(form);
      });
    }
    
    async createFolder(folder, path) {
      this.error(folder, path);
      let form = new FormData();
      const isAuthRequired = await Storage.get('isAuthRequired') || null;
      if (isAuthRequired) {
        form.append('token', await Storage.get('token'));
      }
      form.append('create', 'true');
      form.append('path', path);
      form.append('folder', folder);
      
      return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', this.path);
        
        xhr.onload = function () {
          if (xhr.status >= 200 && xhr.status < 400) {
            const res = JSON.parse(xhr.responseText);
            resolve(res);
          } else {
            reject(new Error('Request failed with status ' + xhr.status));
          }
        };
        
        xhr.onerror = function () {
          reject(new Error('Request failed'));
        };
        
        xhr.send(form);
      });
    }
    
    async createFile(path, data) {
      this.error(data, path);
      let form = new FormData();
      const isAuthRequired = await Storage.get('isAuthRequired') || null;
      if (isAuthRequired) {
        form.append('token', await Storage.get('token'));
      }
      form.append('create', 'true');
      form.append('path', path);
      form.append('data', JSON.stringify(data));
      
      return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', this.path);
        
        xhr.onload = function () {
          if (xhr.status >= 200 && xhr.status < 400) {
            const res = JSON.parse(xhr.responseText);
            resolve(res);
          } else {
            reject(new Error('Request failed with status ' + xhr.status));
          }
        };
        
        xhr.onerror = function () {
          reject(new Error('Request failed'));
        };
        
        xhr.send(form);
      });
    }
    
    async getFile(path) {
      this.error({}, path);
      let form = new FormData();
      const isAuthRequired = await Storage.get('isAuthRequired') || null;
      if (isAuthRequired) {
        form.append('token', await Storage.get('token'));
      }
      form.append('get', 'true');
      form.append('path', path);
      
      return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', this.path);
        
        xhr.onload = function () {
          if (xhr.status >= 200 && xhr.status < 400) {
            const res = JSON.parse(xhr.responseText);
            resolve(res);
          } else {
            reject(new Error('Request failed with status ' + xhr.status));
          }
        };
        
        xhr.onerror = function () {
          reject(new Error('Request failed'));
        };
        
        xhr.send(form);
      });
    }
    
    async putFile(path = null, data = null) {
      this.error(data, path);
      let form = new FormData();
      const isAuthRequired = await Storage.get('isAuthRequired') || null;
      if (isAuthRequired) {
        form.append('token', await Storage.get('token'));
      }
      form.append('save', 'true');
      form.append('path', path);
      form.append('data', JSON.stringify(data));
      
      return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', this.path);
        
        xhr.onload = function () {
          if (xhr.status >= 200 && xhr.status < 400) {
            const res = JSON.parse(xhr.responseText);
            resolve(res);
          } else {
            reject(new Error('Request failed with status ' + xhr.status));
          }
        };
        
        xhr.onerror = function () {
          reject(new Error('Request failed'));
        };
        
        xhr.send(form);
      });
    }
    
    async login(username = null, password = null) {
      this.error(username, password);
      let form = new FormData();
      form.append('login', 'true');
      form.append('username', username);
      form.append('password', password);
      
      return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', this.path);
        
        xhr.onload = function () {
          if (xhr.status >= 200 && xhr.status < 400) {
            const res = JSON.parse(xhr.responseText);
            resolve(res);
          } else {
            reject(new Error('Request failed with status ' + xhr.status));
          }
        };
        
        xhr.onerror = function () {
          reject(new Error('Request failed'));
        };
        
        xhr.send(form);
      });
    }
    
    async deleteFile(path) {
      this.error({}, path);
      let form = new FormData();
      const isAuthRequired = await Storage.get('isAuthRequired') || null;
      if (isAuthRequired) {
        form.append('token', await Storage.get('token'));
      }
      form.append('remove', 'true');
      form.append('path', path);
      
      return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', this.path);
        
        xhr.onload = function () {
          if (xhr.status >= 200 && xhr.status < 400) {
            const res = JSON.parse(xhr.responseText);
            resolve(res);
          } else {
            reject(new Error('Request failed with status ' + xhr.status));
          }
        };
        
        xhr.onerror = function () {
          reject(new Error('Request failed'));
        };
        
        xhr.send(form);
      });
    }
    
    error(data, path) {
      if (path == null) {
        throw new Error('Error: path parameter not present');
      }
      if (data == null) {
        throw new Error('Error: data parameter not present');
      }
    }
  }
const mydb = new db(`${Utils.appURL()}/src/php/index.php`);
export default mydb;

