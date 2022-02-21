import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { GlobalContext } from '../context/GlobalState';
import CountryService from '../services/TutorialService';
import { Country } from '../types/Country';

type Props = {}

export const Flag = (props: Props) => {
    const { countryFlag, cioc, country_flag } = useContext(GlobalContext);

    const [getCountry, setCountry] = useState<Country[]>();
    const [Statecioc, setCioc] = useState<string>("")

    const { isLoading: isLoadingTutorial, refetch: getTutorialById } = useQuery<Country[], Error>(
        "query-tutorial-by-id",
        async () => {
            return await CountryService.findByCioc(cioc);
        },
        {
            enabled: false,
            retry: 1,
            onSuccess: (res) => {
                countryFlag(res);
            },
            onError: (err: any) => {
                setCountry(err.response?.data || err);
            },
        }
    );

    function getDataById() {
        if (cioc) {
            try {
                getTutorialById();
            } catch (err: any) {
                setCountry(err);
            }
        }
    }


    useEffect(() => {
        getDataById()

    }, [cioc])

    if (isLoadingTutorial) {
        return <div><h1>loading</h1></div>
    }
    else {
        return (
            <div>
                {country_flag?.map((item: any, index: any) => {
                    return <div key={item.name.common} className='flex items-center font-bold text-3xl space-y-10 flex-col'>
                        <h1>{item.name.common}</h1>
                        <img className="flex " src={item.flags.png} />
                    </div>
                }
                )}
            </div>
        )
    }
}