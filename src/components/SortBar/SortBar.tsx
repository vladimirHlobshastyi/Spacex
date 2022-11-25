import { useContext } from "react"
import { DataContext } from "../../Providers/DataProvider"
import { SortBarContainer, Select, SortButton, Option } from "./SortBar.styles"


const SortBar = () => {

    let { selectValue, setSelectValue, ships, setSortSettings } = useContext(DataContext)
    return <SortBarContainer>
        <Select onChange={(event) => {
            setSortSettings('')
            setSelectValue(event.target.value)
        }}
            value={selectValue}>
            {ships.map((item) =>
                <Option key={item.id} value={item.id} >{item.name}</Option>
            )}
        </Select>
        <SortButton onClick={() => {
            setSelectValue('')
            setSortSettings('asc')
        }
        }>Early</SortButton>
        <SortButton onClick={() => {
            setSelectValue('')
            setSortSettings('desc')
        }
        }>Latest</SortButton>
    </SortBarContainer >
}

export default SortBar