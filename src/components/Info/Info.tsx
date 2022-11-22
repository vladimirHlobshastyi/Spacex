
import { InfoCloseContainer, InfoCloseImg, InfoContainer, InfoWrapper, InfoWrapperdateLink, InfoWrapperdateLocal, InfoWrapperisSuccess, InfoWrapperName } from "./Info.styles"
import CloseSvg from './svg/211652_close_icon.svg'
import dayjs from 'dayjs';
import { InfoTypes } from "./InfoTypes";


const InfoComponent = ({ youtubeLink, isSuccess, dateLocal, name, close, isVisible }: InfoTypes) => {

    if (isVisible) {
        return <InfoContainer>
            <InfoWrapper >
                <InfoCloseContainer onClick={() => close(false)}><InfoCloseImg src={CloseSvg} alt='Close' /></InfoCloseContainer>
                <InfoWrapperName>Rocket name: {name}</InfoWrapperName>
                <InfoWrapperisSuccess> {isSuccess ? 'Launch was successful' : 'Launch failed'}</InfoWrapperisSuccess>
                <InfoWrapperdateLocal>Data of launch: {dayjs(dateLocal).format('DD-MMM-YYYY , HH:mm')}</InfoWrapperdateLocal>
                <InfoWrapperdateLink href={youtubeLink}>Launch video</InfoWrapperdateLink>
            </InfoWrapper></InfoContainer>
    } else { return null; }

}

export default InfoComponent