import { Container } from './App.style';
import './App.style.tsx';
import SortBar from './components/SortBar/SortBar';
import WrapperComponent from './components/WrapperComponent/WrapperComponent';

function App() {

  return (
    <Container>
      <SortBar />
      <WrapperComponent />
    </Container >
  );
}


export default (App);
