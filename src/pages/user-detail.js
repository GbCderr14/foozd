import { useState} from "react";
const Detail = (props) => {
  const [firstName,setFirstname]=useState("");
  const [lastName,setlastname]=useState("");
  const [company,setCompany]=useState("");
  const [age,setage]=useState("");
  const [occupation,setOccupation]=useState("");
  let daata;
  const [fetched, setIsFetched] = useState(false);
  const clickHandler = async () => {
    const response = await fetch(
      "https://users-8c704-default-rtdb.firebaseio.com/users.json"
    );
    const data = await response.json();
    const ida = [];
    for (const key in data) {
      ida.push({
        id: key,
        firstName: data[key].firstName,
        lastName: data[key].lastName,
        company: data[key].company,
        age: data[key].date,
        occupation: data[key].occupation,
      });
    }
    daata=ida[ida.length-1];
    setFirstname(daata.firstName);
    setlastname(daata.lastName);
    setCompany(daata.company);
    setOccupation(daata.occupation);
    setage(daata.age);
    setIsFetched(true);
  };
    console.log(props.data)
  return (
    <div style={{textAlign:"center"}}>
      <button onClick={clickHandler} style={{fontWeight:"500"}}> See Your entered Details..</button>
      {fetched ?<p style={{marginTop:"43px",fontWeight:"600",fontFamily:"revert-layer",fontSize:"1.25rem"}}>{firstName} {lastName} is {age} years old and working as a {occupation} in {company} </p>: ""}
    </div>
  );
};
export default Detail;
