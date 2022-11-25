import { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../Providers/DataProvider';
import { responseData } from '../../Providers/DataProviders.types';
import InfoComponent from '../Info/Info';
import Launch from '../Launch/Launch';
import { Container, LaunchContainer, Loader, Wrapper } from './WrapperComponent.styles'




const WrapperComponent = () => {
    let [isInfo, setIsInfo] = useState(false)
    let [info, setInfo] = useState({ info: '', isSuccess: false, dateLocal: '', name: '', youtubeLink: '' })

    let { data, isLoading, isFetching, setIsFetching, } = useContext(DataContext)

    const scrollHandler = (e: any) => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 150) {
            setIsFetching(true)

        }
    }


    const clickLauncher = (launch: responseData) => {
        setIsInfo(true)
        setInfo({ info: launch.info, isSuccess: launch.isSuccess, dateLocal: launch.dateLocal, name: launch.name, youtubeLink: launch.youtubeLink })
    }



    useEffect(() => {
        window.addEventListener("scroll", scrollHandler);

        return () => window.removeEventListener("scroll", scrollHandler);
    }, [])


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