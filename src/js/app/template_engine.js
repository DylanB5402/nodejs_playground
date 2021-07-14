const pug = require('pug');


class TemplateEngine {
 
    constructor() {
        this.generateUserFile = pug.compileFile('templates/user.pug');
    }

    getUser(user_id, user_name, user_number, user_drink) {
        return this.generateUserFile({
            id : user_id,
            name : user_name,
            number : user_number,
            drink : user_drink
        })
    }

}

module.exports = {TemplateEngine}