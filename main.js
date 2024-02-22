const modeBtn = document.querySelector(".darkk");
const countriesElem = document.querySelector(".countries");
const miniDrop = document.querySelector(".miniDrop");
const dropElem = document.querySelector(".drop-p");
const region = document.querySelectorAll(".region");
const search = document.querySelector(".searchIn");
const toggle = document.querySelector(".toggle");

async function getCountry() {
  const link = await fetch("https://countries-restapi.vercel.app/all");
  const res = await link.json();
  const resdata = res.data;
  resdata.forEach((element) => {
    showCountry(element);
  });
}

getCountry();

function showCountry(data) {
  const country = document.createElement("div");
  country.classList.add("country");
  country.innerHTML = `<div class="country-img">
<img src="${data.flags.png}" alt="${"country's flag"}" />
</div>
<div class="country-in">
  <h5 class="countryFname">${data.name.common}</h5>
  <p><b>Population</b> ${data.population}</p>
  <p class="regionName"><b>Region:</b> ${data.region}</p>
  <p><b>Capital</b> ${data.capital}</p>
  </div>`;
  countriesElem.appendChild(country);
  country.addEventListener("click", () => {
    showCountryDetail(data);
  });
}
//////// FILTER //////////////////
miniDrop.addEventListener("click", () => {
  dropElem.classList.toggle("dropped");
});
const regionName = document.getElementsByClassName("regionName");
const countryName = document.getElementsByClassName("countryName");
region.forEach((element) => {
  element.addEventListener("click", () => {
    Array.from(regionName).forEach((elem) => {
      if (
        elem.innerText.includes(element.innerText) ||
        element.innerText == "All"
      ) {
        elem.parentElement.parentElement.style.display = "grid";
      } else elem.parentElement.parentElement.style.display = "none";
    });
  });
});

////////////////  SEARCH /////////////////
const countryFname = document.getElementsByClassName("countryFname");
search.addEventListener("input", () => {
  Array.from(countryFname).forEach((elem) => {
    if (elem.innerText.toLowerCase().includes(search.value.toLowerCase())) {
      elem.parentElement.parentElement.style.display = "grid";
    } else elem.parentElement.parentElement.style.display = "none";
  });
  Array.from(countryFname).forEach((elem) => {
    if (elem.innerText.toLowerCase().includes(search.value.toLowerCase())) {
      elem.parentElement.parentElement.style.display = "grid";
    } else elem.parentElement.parentElement.style.display = "none";
  });
});
///////////////

///// DARK ////////////////////

modeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  console.log("hi");
});

////

///////// MODAL ///////////////////////////////////
const modalCountry = document.querySelector(".modalCountry");
function showCountryDetail(data) {
  modalCountry.classList.toggle("show");
  let languages = Object.keys(data.languages);
  let currencies = Object.keys(data.currencies)[0];
  modalCountry.innerHTML = `<button class="back">
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M12.707 17.293 8.414 13H18v-2H8.414l4.293-4.293-1.414-1.414L4.586 12l6.707 6.707z"></path></svg>
  Back</button>
  <div class="modal">
    <div class="firstM">
      <img src="${data.flags.png}" alt="" />
    </div>
    <div class="firstM">
      <h1>${data.name.common}</h1>
      <div class="inModal">
        <div class="innerLeft inner">
          <p><b>Native Name: </b> ${data.altSpellings[2]}</p>
          <p><b>Population: </b> ${data.population}</p>
          <p><b>Region: </b> ${data.region}</p>
          <p><b>Sub-region: </b> ${data.subregion}</p>
          <div class="borderCountries">
          <p><b>Capital: </b> ${data.capital}</p>
          <p><b>Border Countries:</b>${data.borders}</p>
          </div>
        </div>
        <div class="innerRight inner">
          <p><b>Top Level Domain: </b> ${data.tld}</p>
          <p><b>Currencies: </b> ${currencies}</p>
          <p><b>Languages: </b> ${languages}</p>

        </div>
      </div>
    </div>
    
  </div>`;
  const back = modalCountry.querySelector(".back");
  back.addEventListener("click", () => {
    modalCountry.classList.toggle("show");
  });
}
