import { useEffect, useState } from 'react';
import { getAllShipsApi, getLaunch } from '../../api/api';
import InfoComponent from '../Info/Info';
import Launch from '../Launch/Launch';
import { Container, LaunchContainer, Loader, Wrapper } from './WrapperComponent.styles'
import { responseData, schema, sortSettingType, WrapperComponentTypes } from './WrapperComponent.types';




const WrapperComponent = ({ selectValue, sortSettings }: WrapperComponentTypes) => {
    let [page, setPage] = useState(1);
    let [isInfo, setIsInfo] = useState(false)
    let [info, setInfo] = useState({ info: '', isSuccess: false, dateLocal: '', name: '', youtubeLink: '' })
    let [totalPages, setTotalPages] = useState(0)
    let [data, setData] = useState<[] | Array<responseData>>([])
    let [isLoading, setIsLoading] = useState(false)
    let [isFetching, setIsFetching] = useState(false)
    let [errorMessage, setErrorMessage] = useState<string>('');

    const scrollHandler = (e: any) => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 150) {
            setIsFetching(true)

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

    const clickLauncher = (launch: responseData) => {
        setIsInfo(true)
        setInfo({ info: launch.info, isSuccess: launch.isSuccess, dateLocal: launch.dateLocal, name: launch.name, youtubeLink: launch.youtubeLink })
    }


    useEffect(() => {
        getLaunches(sortSettings)

    }, [])

    useEffect(() => {
        window.addEventListener("scroll", scrollHandler);

        return () => window.removeEventListener("scroll", scrollHandler);
    }, [])

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

    if (isLoading) {

        return <Loader>Loading...</Loader>
    } else {

        return (
            <Container>
                {isFetching ? <Loader></Loader> : <></>}
                <Wrapper>
                    {data.map((launch) =>
                        <LaunchContainer
                            key={launch.youtubeId}
                            onClick={() => clickLauncher(launch)}>
                            <Launch {...launch} />
                        </LaunchContainer>
                    )}
                    {isInfo ? <InfoComponent {...info}
                        close={() => setIsInfo(false)}
                        isVisible={isInfo}></InfoComponent> : null}
                </Wrapper>
            </Container >
        );
    }
}

export default WrapperComponent