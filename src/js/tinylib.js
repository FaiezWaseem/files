class Store {
    static set(key , value){
       window.localStorage.setItem( key , value)
    }
    static get(key){
      return  window.localStorage.getItem(key)
    }
}
class db {
    constructor(path) {
        this.path = path;
    }
    async rootPath() {
        let form = new FormData();
        const isAuthRequired = Store.get('isAuthRequired') || null;
        if(isAuthRequired){
            form.append('token', Store.get('token'));
        }
        form.append('getRoot', 'true');
        let options = {
            method: 'POST',
            body: form
        };
        const req = await fetch(this.path, options);
        const res = req.json()
        return res;
    }
    async isAuthRequired() {
        let form = new FormData();
        form.append('isAuthRequired', 'true');
        let options = {
            method: 'POST',
            body: form
        };
        const req = await fetch(this.path, options);
        const res = req.json()
        return res;
    }
    async getFolder(path) {
        this.error({}, path)
        let form = new FormData();
        const isAuthRequired = Store.get('isAuthRequired') || null;
        if(isAuthRequired){
            form.append('token', Store.get('token'));
        }
        form.append('getFolder', 'true');
        form.append('path', path);
        let options = {
            method: 'POST',
            body: form
        };
        const req = await fetch(this.path, options);
        const res = req.json()
        return res;
    }
    async fileRename(currentPath, renamePath) {
        this.error(currentPath, renamePath)
        let form = new FormData();
        const isAuthRequired = Store.get('isAuthRequired') || null;
        if(isAuthRequired){
            form.append('token', Store.get('token'));
        }
        form.append('rename', 'true');
        form.append('getFolder', currentPath);
        form.append('path', renamePath);
        let options = {
            method: 'POST',
            body: form
        };
        const req = await fetch(this.path, options);
        const res = req.json()
        return res;
    }
    async createFolder(folder, path) {
        this.error(folder, path)
        let form = new FormData();
        const isAuthRequired = Store.get('isAuthRequired') || null;
        if(isAuthRequired){
            form.append('token', Store.get('token'));
        }
        form.append('create', 'true');
        form.append('path', path);
        form.append('folder', folder);
        let options = {
            method: 'POST',
            body: form
        };
        const req = await fetch(this.path, options);
        const res = req.json()
        return res;
    }
    async createFile(path, data) {
        this.error(data, path)
        let form = new FormData();
        const isAuthRequired = Store.get('isAuthRequired') || null;
        if(isAuthRequired){
            form.append('token', Store.get('token'));
        }
        form.append('create', 'true');
        form.append('path', path);
        form.append('data', JSON.stringify(data));
        let options = {
            method: 'POST',
            body: form
        };
        const req = await fetch(this.path, options);
        const res = req.json()
        return res;
    }
    async getFile(path) {
        this.error({}, path)
        let form = new FormData();
        const isAuthRequired = Store.get('isAuthRequired') || null;
        if(isAuthRequired){
            form.append('token', Store.get('token'));
        }
        form.append('get', 'true');
        form.append('path', path);
        let options = {
            method: 'POST',
            body: form
        };
        const req = await fetch(this.path, options);
        const res = req.json()
        return res;
    }
    async putFile(path = null, data = null) {
        this.error(data, path)
        let form = new FormData();
        const isAuthRequired = Store.get('isAuthRequired') || null;
        if(isAuthRequired){
            form.append('token', Store.get('token'));
        }
        form.append('save', 'true');
        form.append('path', path);
        form.append('data', JSON.stringify(data));
        let options = {
            method: 'POST',
            body: form
        };
        const req = await fetch(this.path, options);
        const res = req.json()
        return res;

    }
    async login(username = null, password = null) {
        this.error(username, password)
        let form = new FormData();
        form.append('login', 'true');
        form.append('username', username);
        form.append('password', password);
        let options = {
            method: 'POST',
            body: form
        };
        const req = await fetch(this.path, options);
        const res = req.json()
        return res;

    }
    async deleteFile(path) {
        this.error({}, path)
        let form = new FormData();
        const isAuthRequired = Store.get('isAuthRequired') || null;
        if(isAuthRequired){
            form.append('token', Store.get('token'));
        }
        form.append('remove', 'true');
        form.append('path', path);
        let options = {
            method: 'POST',
            body: form
        };
        const req = await fetch(this.path, options);
        const res = req.json()
        return res;
    }
    async unzipFile(from , to , name) {
        this.error({}, from , to , name)
        let form = new FormData();
        const isAuthRequired = Store.get('isAuthRequired') || null;
        if(isAuthRequired){
            form.append('token', Store.get('token'));
        }
        form.append('unzip', 'true');
        form.append('from', from);
        form.append('to', to);
        form.append('name', name);
        let options = {
            method: 'POST',
            body: form
        };
        const req = await fetch(this.path, options);
        const res = req.json()
        return res;
    }

    error(data, path) {
        if (path == null) {
            throw ("Error : Function  : path parameter not present")
        }
        if (data == null) {
            throw ("Error : Function  : Data parameter not present")
        }
    }
}

const mydb = new db("./src/php/index.php");