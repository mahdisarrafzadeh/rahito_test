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
    const [getResult, setGetResult] = useState<string>();
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

    useEffect(() => {
        if (isLoadingTutorials) setGetResult("loading...");
    }, [isLoadingTutorials]);


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
        setGetResult(name)
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
    if (isLoadingTutorials) {
        return (
            <div>
                ....loading
            </div>
        )

    } else {

        return (
            <div>
                <div className='flex flex-col shadow-2xl  rounded    h-96 items-center overflow-auto'>
                    {
                        country?.map((post: any, index: any) => {
                            return <div key={index} onClick={() => handleStar(post.name, post.cioc)} className={` cursor-pointer p-4 border hover:bg-slate-300 border-gray-200 text-gray-500 flex w-full justify-between ${getResult === post.name && "bg-red-600 text-white"} `}>
                                <span className='inline-flex text-xl font-semibold items-center space-x-5'>
                                    <StarRatingComponent
                                        name="rate1"
                                        emptyStarColor={"#6B8072"}
                                        starCount={1}
                                        editing={false}
                                        value={post.clicks ? 1 : 0}
                                    />
                                    <h2 className='cursor-pointer text-base '> {post.name}</h2>
                                </span>

                                <div>
                                    <h1 className='font-thin text-sm'>
                                        {post.cioc}
                                    </h1>
                                </div>
                            </div>
                        })
                    }
                </div></div>
        )
    }
}

//