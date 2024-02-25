export const userNameValidList = [{
    regex: new RegExp('^[A-Za-z0-9]{3,16}$'),
    errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!"
}]
export const passwordValidList = [
    {
        regex: new RegExp('(?=.*[0-9])'),
        errorMessage:
            "ensure that the string contains at least one digit (0-9)"
    },
    {
        regex: new RegExp('(?=.*[a-zA-Z])'),
        errorMessage:
            "ensure that the string contains at least one alphabet character"
    },
    {
        regex: new RegExp('(?=.*[!@#$%^&*])'),
        errorMessage:
            "ensure that the string contains at least one special character from the provided list (!@#$%^&*)"
    },
    {
        regex: new RegExp('^.{8,20}$'),
        errorMessage:
            "ensure that the length is in range [8,20]"
    },

]


export const firstNameValidList = [
    {
        regex: new RegExp('^[A-Za-z]+$'),
        errorMessage:
            "ensure that the name contains just english letters"
    },
]
export const lastNameValidList = [
    {
        regex: new RegExp('^[A-Za-z]+$'),
        errorMessage:
            "ensure that the name contains just english letters"
    },
]
export const emailValidList = [
    {
        regex: new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'),
        errorMessage: "It should be a valid email address!",

    },
]
export const dateValidList = [
    {
        range: [18, 120],
        errorMessage: "Allowed ages between 18 and 120",

    },
]
export const roadNameValidList = [
    {
        regex: new RegExp('^[א-ת\s]+$'),
        errorMessage: 'Make sure its in hebrew '
    }
]

export const confirmPasswordValidList = (pass) => [
    {
        pattern: pass,
        errorMessage: "ensure matching the password",
    }
]
