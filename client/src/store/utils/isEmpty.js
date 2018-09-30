// function to check whether value is empty
// returns true if empty

const isEmpty = value =>
    value === undefined || 
    value === null || 
    (typeof value === 'object' && Object.keys(value).length === 0) 
    || (typeof value === 'string' && (value.trim().length === 0 || value.trim().length > 30))


export default isEmpty