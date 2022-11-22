import { Img, LaunchContainer, Title } from "./Launch.styles"
import { LaunchProps } from "./LaunchTypes"


const Launch = ({ youtubeId, name }: LaunchProps) => {
    const img = `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
    const imgLogo = 'https://img.youtube.com/vi/-p-PToD2URA/hqdefault.jpg'

    return <LaunchContainer key={youtubeId}>
        <Title>Title: {name}</Title>
        <Img src={youtubeId ? img : imgLogo} alt={'launch Logo'} />
    </LaunchContainer>
}

export default Launch