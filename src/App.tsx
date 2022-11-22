import { useEffect, useState } from 'react';
import { getAllShipsApi } from './api/api';
import { Container } from './App.style';
import './App.style.tsx';
import SortBar from './components/SortBar/SortBar';
import WrapperComponent from './components/WrapperComponent/WrapperComponent';


type sortSettingType = 'asc' | 'desc'

function App() {
  let [ships, setShips] = useState<Array<{ name: string, id: string }> | []>([]);
  let [sortSettings, setSortSettings] = useState<'' | sortSettingType>('');
  let [selectValue, setSelectValue] = useState('');
  const getAllRocket = async () => {

    let response = await getAllShipsApi('')
    if (response.status === 200) {

      let shipsInfo = response.data.map((ship: { name: string, id: string }) => { return { name: ship.name, id: ship.id } })
      setShips([{ name: 'Check rocket', id: '' }, ...shipsInfo])
    }
  }

  useEffect(() => { getAllRocket() }, [])
  return (
    <Container>
      <SortBar
        setSelectValue={setSelectValue}
        selectValue={selectValue}
        setSortSettings={setSortSettings}
        ships={ships} />
      <WrapperComponent sortSettings={sortSettings} selectValue={selectValue} />
    </Container >
  );
}


export default (App);
