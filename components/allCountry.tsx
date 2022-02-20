import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import CountryService from '../services/TutorialService';
import { allCountry } from '../types/Country';
import StarRatingComponent from 'react-star-rating-component';
import { GlobalContext } from '../context/GlobalState';
import handler from '../pages/api/hello';


type Props = {}

export const AllCountry = (props: Props) => {
    const { getAllCompany, updateCountry, country } = useContext(GlobalContext);
    const [getResult, setGetResult] = useState<allCountry[]>();
    const [first, setfirst] = useState<any[]>([])
    const { isLoading: isLoadingTutorials, refetch: getAllTutorials } = useQuery<allCountry[], Error>(
        "query-tutorials",
        async () => {
            return await CountryService.findAllCountry();
        },
        {
            enabled: false,
            onSuccess: (res) => {
                getAllCompany(res);
            },
            onError: (err: any) => {
                setGetResult(err);
            },
        }
    );
    function getAllData() {
        try {
            getAllTutorials();
        } catch (err: any) {
            setGetResult(err);
        }
    }
    useEffect(() => {
        getAllData();
    }, []);
    const handleStar = (name: string, cioc: string) => {
        updateCountry(name, cioc)
        setfirst(prev => [...prev, name])
    }


    useEffect(() => {
        if (first.length !== 0) {
            localStorage.setItem("name", JSON.stringify(first))
        }
        return () => {
        }
    }, [first])

    return (
        <div> <div className='flex flex-col h-96 items-center overflow-auto'>
            {
                country?.map((post: any, index: any) => {
                    return <div key={index} className="w-48 p-2 flex items-center justify-between" >
                        <h2 className='cursor-pointer' onClick={() => handleStar(post.name, post.cioc)}>{post.name}</h2><div>
                            <StarRatingComponent
                                name="rate1"
                                starCount={1}
                                editing={false}
                                value={post.clicks ? 1 : 0}
                            /></div>
                    </div>
                })
            }
        </div></div>
    )
}

//