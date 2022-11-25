import { createContext, useEffect, useState } from 'react';
import { getAllShipsApi, getLaunch } from '../api/api';
import { DataProviderProps, DataProviderTypes, responseData, schema, sortSettingType } from './DataProviders.types';



export const DataContext = createContext({} as DataProviderTypes)

const DataProvider = ({ children }: DataProviderProps) => {
    let [data, setData] = useState<[] | Array<responseData>>([])
    let [page, setPage] = useState(1);
    let [totalPages, setTotalPages] = useState(0)
    let [isLoading, setIsLoading] = useState(false)
    let [isFetching, setIsFetching] = useState(false)
    let [errorMessage, setErrorMessage] = useState<string>('');
    let [sortSettings, setSortSettings] = useState<'' | sortSettingType>('');
    let [ships, setShips] = useState<Array<{ name: string, id: string }> | []>([]);
    let [selectValue, setSelectValue] = useState('');

    const getAllRocket = async () => {

        let response = await getAllShipsApi('')
        if (response.status === 200) {

            let shipsInfo = response.data.map((ship: { name: string, id: string }) => { return { name: ship.name, id: ship.id } })
            setShips([{ name: 'Check rocket', id: '' }, ...shipsInfo])
        }
    }
    const getLaunches = async (sortSetting: sortSettingType) => {
        try {
            if (errorMessage) {
                setErrorMessage('')
            }
            setIsLoading(true)
            const response = await getLaunch(1, {
                'date_utc': sortSetting
            })

            if (response?.status === 200) {
                setTotalPages(response.data.totalPages)
                const data: Array<responseData> = response.data.docs.map((item: schema) => {
                    return {
                        youtubeId: item.links.youtube_id,
                        youtubeLink: item.links.webcast,
                        info: item.links.article,
                        isSuccess: item.success,
                        details: item.details,
                        dateLocal: item.date_local,
                        dateUnix: item.date_unix,
                        name: item.name

                    }
                })

                setData(data)

            }

            setIsLoading(false)
        } catch (err) {
            if (err instanceof Error) {

                setErrorMessage(err.message);
                setIsLoading(false);
            } else {
            }
        }
    }
    const getNewPage = async (sortSetting: sortSettingType) => {
        try {
            if (errorMessage) {
                setErrorMessage('')
            }

            const response = await getLaunch(page, {
                'date_utc': sortSetting
            })

            if (response.status === 200) {

                const newData: Array<responseData> = response?.data.docs.map((item: schema) => {
                    return {
                        youtubeId: item.links.youtube_id,
                        youtubeLink: item.links.webcast,
                        info: item.links.article,
                        isSuccess: item.success,
                        details: item.details,
                        dateLocal: item.date_local,
                        dateUnix: item.date_unix,
                        name: item.name

                    }
                })

                setData([...data, ...newData])

            }


        } catch (err) {
            if (err instanceof Error) {

                setErrorMessage(err.message);
            } else {
            }
        } finally {
            setIsFetching(false)
        }
    }
    const serchRocket = async () => {

        setIsLoading(true)
        let respons = await getAllShipsApi(selectValue)
        if (respons.status === 200) {
            let result = {
                youtubeId: respons.data.links.youtube_id,
                youtubeLink: respons.data.links.webcast,
                info: respons.data.links.article,
                isSuccess: respons.data.success,
                details: respons.data.details,
                dateLocal: respons.data.date_local,
                dateUnix: respons.data.date_unix,
                name: respons.data.name

            }
            setData([result])
        }
        setIsLoading(false)
    }

    useEffect(() => { getAllRocket() }, [])

    useEffect(() => { getLaunches(sortSettings) }, [])

    useEffect(() => {
        if (sortSettings !== '') {
            setPage(1)
            getLaunches(sortSettings)
        }
    }, [sortSettings])

    useEffect(() => {

        setPage((prev) => prev + 1)
        if (page <= totalPages) getNewPage(sortSettings)

    }, [isFetching])

    useEffect(() => { if (selectValue !== '') serchRocket() }, [selectValue])

    return (
        <DataContext.Provider
            value={{
                data, setData, isLoading,
                setIsLoading, isFetching,
                setIsFetching, ships,
                setShips, selectValue,
                setSelectValue,
                sortSettings, setSortSettings
            }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider