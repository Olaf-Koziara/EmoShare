import Axios from "axios";
import React, { useEffect, useState } from "react";
import {
  StyledField,
  StyledCitiesInputWrapper,
  StyledAutocompleteWrapper,
  StyledPlaceInputParagraph,
} from "../styledComponents";

const PlaceInput = () => {
  const [countryInput, setCountryInput] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [cityInput, setCityInput] = useState("");
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const selectCountry = (value) => {
    setSelectedCountry(value);
    setCountryInput(value);
  };
  const selectCity = (value) => {
    setCityInput(value);
    setSelectedCity(value);
  };
  useEffect(() => {
    if (countryInput.length > 1) {
      Axios.get(`https://restcountries.eu/rest/v2/name/${countryInput}`).then(
        (response) => {
          const countryResponse = response.data.map((record) => record.name);
          setCountries(countryResponse);
        },
      );
    }
  }, [countryInput]);
  useEffect(() => {
    if (cityInput.length > 1) {
      Axios.get(
        `https://public.opendatasoft.com/api/records/1.0/search/?dataset=geonames-all-cities-with-a-population-1000&q=${cityInput}&refine.country=${selectedCountry}`,
      ).then((response) => {
        const citiesResponse = response.data.records.map(
          (record) => record.fields.name,
        );
        setCities(citiesResponse);
      });
    }
  }, [cityInput]);
  return (
    <StyledCitiesInputWrapper>
      <StyledField
        value={countryInput}
        onChange={(e) => setCountryInput(e.target.value)}
        placeholder="Country"
      />
      {!selectedCountry && countryInput.length > 0 ? (
        <div style={{ position: "relative" }}>
          <StyledAutocompleteWrapper>
            {countries.map((country) => (
              <StyledPlaceInputParagraph onClick={() => selectCountry(country)}>
                {country}
              </StyledPlaceInputParagraph>
            ))}
          </StyledAutocompleteWrapper>
        </div>
      ) : null}
      <StyledField
        disabled={selectedCountry.length < 1}
        value={cityInput}
        onChange={(e) => setCityInput(e.target.value)}
        placeholder={
          selectedCountry.length < 1
            ? "Please select your country first"
            : "City"
        }
      />
      {!selectedCity && cityInput.length > 0 ? (
        <div style={{ position: "relative" }}>
          <StyledAutocompleteWrapper>
            {cities.map((city) => (
              <StyledPlaceInputParagraph onClick={() => selectCity(city)}>
                {city}
              </StyledPlaceInputParagraph>
            ))}
          </StyledAutocompleteWrapper>
        </div>
      ) : null}
    </StyledCitiesInputWrapper>
  );
};

export default PlaceInput;
