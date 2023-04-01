// we pass error object which is come from yup liabrary, if it is present so it returns error true and via this we apply MUI error style to our input field
const addErrorIntoFields = (errors) => errors ? {error:true} : {error:false}
const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
const passwordRegExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

export {addErrorIntoFields,phoneRegExp,passwordRegExp}