export type SortTypes = {
    setSelectValue: React.Dispatch<React.SetStateAction<string>>,
    selectValue: string,

    setSortSettings: React.Dispatch<React.SetStateAction<"" | 'asc' | 'desc'>>,
    ships: {
        name: string;
        id: string;
    }[] | []
}