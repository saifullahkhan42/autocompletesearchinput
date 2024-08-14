const inputEl = document.querySelector('#autocomplete-input')// get the element where we input the search

inputEl.addEventListener("input", onInputChange ); // assign the function with the help of event listener.

getCountryData() // calling funtion to get the data

let countryNames = []; // empty array to store data which comes with api

async function getCountryData() {
    const countryRes = await fetch('https://restcountries.com/v2/all');// calling api
    const data = await countryRes.json() // convert response to valid json format

    countryNames = data.map((country) => {// sort and create a new array.
        return country.name;
    });
};

function onInputChange() {// getting data from input(search) element.
    removeautoCopleteDropdown(); //remove the last search list
    const value = inputEl.value.toLowerCase(); // store the value to lowercase
    const filteredNames = []; // declare the filter array empty

    if (value.length === 0) return; // if clear the input to remove the list or stop funtion
    

    countryNames.forEach((countryName) => { //create a new filter array
        if (countryName.substr(0, value.length).toLowerCase() === value){ // using substr funtion to slice the country caracter and get it after compare the input value.
            filteredNames.push(countryName); // add filter country into emptyfiltername array
        }
    });
    autoCopleteDropdown(filteredNames);// send data into the search input
}

function autoCopleteDropdown(list){// recived data from filtered array from input element
    
    const listEl = document.createElement('ul');// create ul element
    listEl.className = "autocomplete-list";// add class to ul newelement
    listEl.id = "autocomplete-list";// add id to new ul element

    list.forEach((country, index) => {// looping the filtered array to send the data input search element
        const listItem = document.createElement('li'); // create a li element
        const countryButton = document.createElement('button'); // create a button element
        countryButton.value = index // here we set index value of array (country)
        countryButton.innerHTML = country; // set the data into button element which create above
        countryButton.addEventListener('click', onCountryButtonClick)
        listItem.appendChild(countryButton);// add button element into li element which created above

        listEl.appendChild(listItem);// add li element to parraent ul element which created abve the looping.
    })

    document.querySelector('#autocomplete-wrapper').appendChild(listEl) // add ul element into the div 
};

function removeautoCopleteDropdown(){ // remove previous search list 
    const listEl = document.querySelector("#autocomplete-list");// access the search list via id which assign ul element created in autocompletedropdown funtion.
    if ( listEl){// check if the ul element is exist.
        listEl.remove() // remove the ul element
    }
};

function onCountryButtonClick(event){
    event.preventDefault();// default functionalty of button is submit form (to stop the default functionality)
    const buttonEl = event.target;// get the data of button
    

    inputEl.value = buttonEl.innerHTML; // set the input value which i select in search 

    removeautoCopleteDropdown()// then remove the search list 
};