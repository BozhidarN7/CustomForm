import '@babel/polyfill';
import axios from 'axios';

import './validators/username';
import './validators/email';
import './validators/password';

registerButton.addEventListener('click', async (e) => {
    const username = usernameField.value;
    if (username.length > 20) {
        console.log('Must be less than 20');
        return;
    }

    await axios({
        method: 'post',
        url: 'http://127.0.0.1:3000',
        data: {
            username,
        },
    });
    location.assign('/');
});
