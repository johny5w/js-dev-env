import {getUsers} from './api/userApi';

import './index.css';

// populate table of users using api call
getUsers().then(result => {
    let usersBody = "";

    result.forEach(user => {
        usersBody+= `<tr>
            <td><a href="#" dadta-id="${user.id}" class=deleteUser>Delete</a></td>
            <td>${user.id}</td>
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
            <td>${user.email}</td>
        </tr>`
    });

    console.log("result was ", result);
    document.getElementById('users').innerHTML = usersBody;
});
