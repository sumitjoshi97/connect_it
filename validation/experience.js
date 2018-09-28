const Validator = require('validator')
const isEmpty = require('./isEmpty')

module.exports = function validateExperienceInput(data) {
    let errors = {}

    data.title = !isEmpty(data.title) ? data.title : ''
    data.company = !isEmpty(data.company) ? data.company : ''
    data.from = !isEmpty(data.from) ? data.from : ''
    
    if (Validator.isEmpty(data.title)) {
        errors.title = 'Job Title field is required'
    }

    if (Validator.isEmpty(data.company)) {
        errors.company = 'Company name field is required'
    }
 
    if (Validator.isEmpty(data.from)) {
        errors.from = 'From time is required'
    }
 
    // if (Validator.isEmpty(data.title)) {
    //     errors.title = 'Job Title field is required'
    // }
    
    // if (!Validator.isLength(data.password, {min: 6, max: 30})) {
    //     errors.password = 'password must be between 6 and 30 characters'
    // }

    // if (Validator.isEmpty(data.password)) {
    //     errors.password = 'Password field is required'
    // }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}