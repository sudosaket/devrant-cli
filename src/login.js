export const questions = [
    {
        name: 'username',
        type: 'input',
        message: 'Enter your devRant username or email address:',
        validate: function (value) {
            if (value.length) {
                return true;
            } else {
                return 'Please enter your devRant username or email address';
            }
        }
    },
    {
        name: 'password',
        type: 'password',
        message: 'Enter your password:',
        validate: function (value) {
            if (value.length) {
                return true;
            } else {
                return 'Please enter your password';
            }
        }
    }
];