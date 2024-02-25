export function add_user_to_local_storage(newUser) {
    const usersList = JSON.parse(localStorage.getItem('users'))
    if (usersList && usersList.find(user => newUser.email == user.email)) {
        localStorage.setItem('users', JSON.stringify([...usersList, newUser]))
        return;
    }
    localStorage.setItem('users', JSON.stringify([newUser]))
}