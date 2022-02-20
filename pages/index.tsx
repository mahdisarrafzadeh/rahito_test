import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import CountryService from '../services/TutorialService'
import styles from '../styles/Home.module.css'
import { allCountry, Country } from '../types/Country'
import update from 'immutability-helper';
import { AllCountry } from '../components/allCountry'
import { Flag } from '../components/flag'
import { GlobalContext } from '../context/GlobalState'

const Home: NextPage = () => {
  const { updateCountry, cioc, country } = useContext(GlobalContext);
  useEffect(() => {
    if (country.length !== 1) {
      console.log(country.length)
      const data: any = localStorage.getItem("name")
      if (data) {
        const local = JSON.parse(data)
        console.log(local)
        local.forEach((item: any) => updateCountry(item))
      }
    }
  }, [country.length])

  return (
    <div className='flex flex-row w-screen h-screen justify-center  items-center '>
      <div className='inline-flex space-x-24 shadow-2xl rounded items-center'>
        <Flag />
        <AllCountry />
      </div>
    </div >)
}

export default Home
