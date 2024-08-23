const inputEl1 = document.querySelector("#autocomplete-input"); // get the element where we input the search

// inputEl.addEventListener("input", onInputChange); // assign the function with the help of event listener.

// getCountryData() // calling funtion to get the data

// let countryNames = []; // empty array to store data which comes with api

// async function getCountryData() {
//     const countryRes = await fetch('https://restcountries.com/v2/all');// calling api
//     const data = await countryRes.json() // convert response to valid json format

//     countryNames = data.map((country) => {// sort and create a new array.
//         return country.name;
//     });

// };
const names = [
  "Afghanistan",
  "Åland Islands",
  "Albania",
  "Algeria",
  "American Samoa",
  "Andorra",
  "Angola",
  "Anguilla",
  "Antarctica",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia (Plurinational State of)",
  "Bonaire, Sint Eustatius and Saba",
  "Bosnia and Herzegovina",
  "Botswana",
  "Bouvet Island",
  "Brazil",
  "British Indian Ocean Territory",
  "United States Minor Outlying Islands",
  "Virgin Islands (British)",
  "Virgin Islands (U.S.)",
  "Brunei Darussalam",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cabo Verde",
  "Cayman Islands",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Christmas Island",
  "Cocos (Keeling) Islands",
  "Colombia",
  "Comoros",
  "Congo",
  "Congo (Democratic Republic of the)",
  "Cook Islands",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Curaçao",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Ethiopia",
  "Falkland Islands (Malvinas)",
  "Faroe Islands",
  "Fiji",
  "Finland",
  "France",
  "French Guiana",
  "French Polynesia",
  "French Southern Territories",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Greece",
  "Greenland",
  "Grenada",
  "Guadeloupe",
  "Guam",
  "Guatemala",
  "Guernsey",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Heard Island and McDonald Islands",
  "Vatican City",
];

const accountsData = [
  {
    account_id: 15,
    company_id: 4,
    actfname: "VINEET",
    actlname: "CHADDA",
    companyname: "SKUNIVERSE AUTOMOBILE PRIVATE LIMITED",
  },
  {
    account_id: 14,
    company_id: 4,
    actfname: "SAIFULLAH",
    actlname: "KHAN",
    companyname: "TESTONECOMPANY",
  },
  {
    account_id: 16,
    company_id: 4,
    actfname: "SHOBHIT",
    actlname: "GOYEL",
    companyname: "UNIQUE INTERNATINOL",
  },
];
const names1 = accountsData.map((accountdata) => {
    return [accountdata.account_id, accountdata.companyname]
});
console.log(names1);



autoCompleteDropdownInput("autocomplete-input", "autocomplete-wrapper", "autocomplete-list", names1, "account_id" );

function autoCompleteDropdownInput(inputElId, wrapperId, listId, names, datasetName) {
    const inputEl = document.querySelector("#" + `${inputElId}`); // get the element where we input the search
  
    inputEl.addEventListener("input", onInputChange); // assign the function with the help of event listener.
    function onInputChange() {
      // getting data from input(search) element.
      removeautoCompleteDropdown(); //remove the last search list
      const value = inputEl.value.toLowerCase(); // store the value to lowercase
      const filteredNames = []; // declare the filter array empty
  
      if (value.length === 0) return; // if clear the input to remove the list or stop funtion
  
      names.forEach((name) => {
        //create a new filter array
        // if (name[1].substr(0, value.length).toLowerCase() === value) {
            if (name[1].toLowerCase().includes(value)) {
          // using substr funtion to slice the country caracter and get it after compare the input value.
          filteredNames.push(name); // add filter country into emptyfiltername array
        }
      });
      autoCompleteDropdown(filteredNames); // send data into the search input
    }
  
    function autoCompleteDropdown(list) {
      // recived data from filtered array from input element
  
      const listEl = document.createElement("ul"); // create ul element
      listEl.className = "autocomplete-list"; // add class to ul newelement
      listEl.id = `${listId}`; // add id to new ul element
  
      list.forEach((name, index) => {
        // looping the filtered array to send the data input search element
        const listItem = document.createElement("li"); // create a li element
        const nameButton = document.createElement("button"); // create a button element
        nameButton.value = name[0]; // here we set index value of array (country)
        nameButton.innerHTML = name[1]; // set the data into button element which create above
        nameButton.addEventListener("click", onNameButtonClick);
        listItem.appendChild(nameButton); // add button element into li element which created above
  
        listEl.appendChild(listItem); // add li element to parraent ul element which created abve the looping.
      });
  
      document.querySelector("#" + `${wrapperId}`).appendChild(listEl); // add ul element into the div
    }
  
    function removeautoCompleteDropdown() {
      // remove previous search list
      const listEl = document.querySelector("#"+`${listId}`); // access the search list via id which assign ul element created in autocompletedropdown funtion.
      if (listEl) {
        // check if the ul element is exist.
        listEl.remove(); // remove the ul element
      }
    }
  
    function onNameButtonClick(event) {
      event.preventDefault(); // default functionalty of button is submit form (to stop the default functionality)
      const buttonEl = event.target; // get the data of button
  
      // inputEl.value = buttonEl.value; // set the input value which i select in search
      inputEl.value = buttonEl.innerHTML; // set the input value which i select in search
      inputEl.dataset[datasetName] = buttonEl.value;
      
  
      removeautoCompleteDropdown(); // then remove the search list
    }
  }

// function onInputChange() {
//   // getting data from input(search) element.
//   removeautoCompleteDropdown(); //remove the last search list
//   const value = inputEl.value.toLowerCase(); // store the value to lowercase
//   const filteredNames = []; // declare the filter array empty

//   if (value.length === 0) return; // if clear the input to remove the list or stop funtion

//   names.forEach((name) => {
//     //create a new filter array
//     if (name.substr(0, value.length).toLowerCase() === value) {
//       // using substr funtion to slice the country caracter and get it after compare the input value.
//       filteredNames.push(name); // add filter country into emptyfiltername array
//     }
//   });
//   autoCompleteDropdown(filteredNames); // send data into the search input
// }

// function autoCompleteDropdown(list) {
//   // recived data from filtered array from input element

//   const listEl = document.createElement("ul"); // create ul element
//   listEl.className = "autocomplete-list"; // add class to ul newelement
//   listEl.id = "autocomplete-list"; // add id to new ul element

//   list.forEach((country, index) => {
//     // looping the filtered array to send the data input search element
//     const listItem = document.createElement("li"); // create a li element
//     const countryButton = document.createElement("button"); // create a button element
//     countryButton.value = index; // here we set index value of array (country)
//     countryButton.innerHTML = country; // set the data into button element which create above
//     countryButton.addEventListener("click", onCountryButtonClick);
//     listItem.appendChild(countryButton); // add button element into li element which created above

//     listEl.appendChild(listItem); // add li element to parraent ul element which created abve the looping.
//   });

//   document.querySelector("#autocomplete-wrapper").appendChild(listEl); // add ul element into the div
// }

// function removeautoCompleteDropdown() {
//   // remove previous search list
//   const listEl = document.querySelector("#autocomplete-list"); // access the search list via id which assign ul element created in autocompletedropdown funtion.
//   if (listEl) {
//     // check if the ul element is exist.
//     listEl.remove(); // remove the ul element
//   }
// }

// function onCountryButtonClick(event) {
//   event.preventDefault(); // default functionalty of button is submit form (to stop the default functionality)
//   const buttonEl = event.target; // get the data of button

//   inputEl.value = buttonEl.innerHTML; // set the input value which i select in search

//   removeautoCompleteDropdown(); // then remove the search list
// }
