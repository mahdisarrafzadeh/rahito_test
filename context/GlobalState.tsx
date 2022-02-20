import React, { createContext, ReactNode, useReducer, useState } from 'react';
import { useQuery } from 'react-query';
import CountryService from '../services/TutorialService';
import { allCountry, Country } from '../types/Country';

import appReducer from './AppReducer';

const initialState: any = {
  country: [
    {
      cioc: "Sammy",
      name: "DigitalOcean",
      clicks: false
    }
  ],
  cioc: ""
};

export const GlobalContext = createContext(initialState);

type Props = {
  children: ReactNode;
};

export const GlobalProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(appReducer, initialState);


  console.log(state)

  function getAllCompany(getCountry: allCountry[]) {
    dispatch({
      type: "GET_ALL_COUNTRY",
      payload: getCountry
    });
  }

  function countryFlag(getCountry: Country[]) {
    dispatch({
      type: "GET_COUNTRY",
      payload: getCountry
    });
  }

  function updateCountry(name: string, cioc?: string) {
    dispatch({
      type: "UPDATE_COUNTRY",
      payload: name
    });
    dispatch({
      type: "GET_FLAG_CIOC",
      payload: cioc
    })
  }

  return (
    <>
      <GlobalContext.Provider
        value={{
          country: state.country,
          cioc: state.country_cioc,
          country_flag: state.country_flag,
          countryFlag,
          getAllCompany,
          updateCountry,
        }}
      >
        {children}
      </GlobalContext.Provider>
    </>
  );
};
