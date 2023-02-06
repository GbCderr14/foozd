import useInput from "../hooks/use-input";
import { useNavigate } from "react-router-dom";
const BasicForm = () => {
  const navigate = useNavigate();
  const {
    value: enteredFirstName,
    isValid: enteredFirstNameIsValid,
    hasError: firstNameInputHasError,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
    reset: resetFirstName,
  } = useInput((value) => value.trim() !== "");
  const {
    value: enteredLastName,
    isValid: enteredLastNameIsValid,
    hasError: lastNameInputHasError,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: resetLastName,
  } = useInput((value) => value.trim() !== "");
  const {
    value: enteredCompany,
    isValid: enteredCompanyIsValid,
    hasError: companyInputHasError,
    valueChangeHandler: companyChangeHandler,
    inputBlurHandler: companyBlurHandler,
    reset: resetCompany,
  } = useInput((value) => value.trim() !== "");
  const {
    value: enteredDate,
    isValid: enteredDateIsValid,
    hasError: dateInputHasError,
    valueChangeHandler: dateChangeHandler,
    inputBlurHandler: dateBlurHandler,
    reset: resetDate,
  } = useInput((value) => value.trim() !== "");
  const {
    value: enteredOccupation,
    isValid: enteredOccupationIsValid,
    hasError: occupationInputHasError,
    valueChangeHandler: occupationChangeHandler,
    inputBlurHandler: occupationBlurHandler,
    reset: resetOccupation,
  } = useInput((value) => value.trim() !== "");
  let formIsValid = false;
  if (enteredFirstNameIsValid && enteredLastNameIsValid && enteredCompanyIsValid && enteredDateIsValid && enteredOccupationIsValid)  {
    formIsValid = true;
  }
  const formSubmissionHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      alert("Kindly Fill all the Form fields...");
      return;
    }
    var dob = new Date(enteredDate);
    var month_diff = Date.now() - dob.getTime();
    var age_dt = new Date(month_diff); 
    var year = age_dt.getUTCFullYear();
    var age = Math.abs(year - 1970);
    console.log(enteredFirstName, enteredLastName, enteredCompany);
    fetch("https://users-8c704-default-rtdb.firebaseio.com/users.json",
    {
      method:"POST",
      body:JSON.stringify({
        firstName:enteredFirstName,
        lastName:enteredLastName,
        company:enteredCompany,
        date:age,
        occupation:enteredOccupation
        }),
      headers:{
        "Content-Type":"application/json"
      }
    }
    ).then(response=>{
      console.log(response);
      resetFirstName();
      resetLastName();
      resetCompany();
      resetDate();
      resetOccupation();
    }
    ).catch(error=>{
      console.log(error.message);
    }
    );
    navigate("/user-detail");
  };
  const firstNameInputClasses = firstNameInputHasError
    ? "form-control invalid"
    : "form-control";
  const lastNameInputClasses = lastNameInputHasError

    ? "form-control invalid"
    : "form-control";
  const companyInputClasses = companyInputHasError

    ? "form-control invalid"
    : "form-control";
  const dateInputClasses = dateInputHasError

    ? "form-control invalid"
    : "form-control";
  const occupationInputClasses = occupationInputHasError

    ? "form-control invalid"
    : "form-control";


  return (
    <form onSubmit={formSubmissionHandler}>
      <div className='control-group'>
        <div className={firstNameInputClasses}>
          <label htmlFor='name'>First Name</label>
          <input type='text' id='name' onChange={firstNameChangeHandler} onBlur={firstNameBlurHandler} value={enteredFirstName}/>
          {!firstNameInputHasError? null : <p className='error-text'>First Name must not be empty</p>}

        </div>
        <div className={lastNameInputClasses}>
          <label htmlFor='name'>Last Name</label>
          <input type='text' id='name' onChange={lastNameChangeHandler} onBlur={lastNameBlurHandler} value={enteredLastName}/>
          {!lastNameInputHasError? null : <p className='error-text'>Last Name must not be empty</p>}
        </div>
      
      <div className={companyInputClasses}>
        <label htmlFor='name'>Comapny</label>
        <input type='text' id='name' onChange={companyChangeHandler} onBlur={companyBlurHandler} value={enteredCompany}/>
        {!companyInputHasError? null : <p className='error-text'>Company name must not be empty</p>}
      </div>
      <div className={dateInputClasses}>
        <label htmlFor='name'>Date of birth</label>
        <input type='date' id='name' onChange={dateChangeHandler} onBlur={dateBlurHandler} value={enteredDate}/>
        {!dateInputHasError? null : <p className='error-text'>Date must not be empty</p>}
      </div>
      <div className={occupationInputClasses}>
        <label htmlFor='name'>Occupation</label>
        <input type='text' id='name' onChange={occupationChangeHandler} onBlur={occupationBlurHandler} value={enteredOccupation}/>
        {!occupationInputHasError? null : <p className='error-text'>Occupation must not be empty</p>}
      </div>
      </div>
      <div className='form-actions'>
        {/* <Link to="/user-details" >submit</Link> */}
        <button>Submit</button>
      </div>
    </form>
  );
};


export default BasicForm;
