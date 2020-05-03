const validatename = firstname => {
    const pattern = /^[a-zA-Z ]+$/
    return pattern.test(firstname)
}
const validateLastName = lastName => {
    const pattern = /^[a-zA-Z ]+$/
    return pattern.test(lastName)
}
const validateEmail = email => {
    var pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(email);
}
const password = password => {
    var pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
    return pattern.test(password)
}
const phone = phone => {
    var pattern = /^\d{10}$/
    return pattern.test(phone)
}

const postalCode = postalCode => {
    var pattern = /^\d{5}$|^\d{5}-\d{4}$/
    return pattern.test(postalCode)
}

const creditCardNumber = creditCardNumber => {
    var pattern = /^(?:3[47][0-9]{13})$/
    return pattern.test(creditCardNumber)
}

const securityCode = securityCode => {
    var pattern = /^[0-9]{3,4}$/
    return pattern.test(securityCode)
}


export {
    validatename,
    validateLastName,
    validateEmail,
    password,
    phone,
    postalCode,
    creditCardNumber,
    securityCode
}