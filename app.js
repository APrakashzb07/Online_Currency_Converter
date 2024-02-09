const BASE_URL ="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
// checking for all country code
/*
for(code in countryList){
  console.log(code, countryList[code]);
}
*/
const dropdowns = document.querySelectorAll(".dropdown select");//here it says that select inside the dropdown are selected and stored in a variable ie dropdowns
const btn = document.querySelector("form button"); // same as above
const fromCurr = document.querySelector(".from select");//here selecting select from "from" class
const toCurr = document.querySelector(".to select");//here selceting selcet from "to" class
const msg = document.querySelector(".msg");

//first time loading the whole page



for(let select of dropdowns){
  for(currCode in countryList){
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    select.append(newOption);

    if(select.name === "from" && currCode === "USD"){
      newOption.selected = "selected";
    }
    else if (select.name === "to" && currCode === "INR"){
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });

}


//Main Working
const updateExchangeRate = async() =>{let amount = document.querySelector(".amount input");
let amtVal = amount.value;
//corner case if amount = 0 or -ve
if (amtVal === "" || amtVal <=0){
 amtVal = 1;
 amount.value = "1";
}
//console.log(fromCurr.value, toCurr.value);
const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;//it shows that ${variable}, here tolowercase is used since api works in lower case
let response = await fetch(URL);
//console.log(response);
let data = await response.json();
let rate = data[toCurr.value.toLowerCase()];

let finalAmount = amtVal * rate;
msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`};




const updateFlag = (element) => {
  let currCode = element.value;
 // console.log(currCode);
 let countryCode = countryList[currCode]; //IN,EU
 let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};



//Main Part

// setting eventlistener in button so that it can call
btn.addEventListener("click", (evt) => {
  evt.preventDefault(); //For not changing state as changes without this
  updateExchangeRate();
 });

 window.addEventListener("load", () =>{
  updateExchangeRate();
  
  });

