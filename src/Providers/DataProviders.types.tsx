
export type DataProviderProps = {
    children?: JSX.Element | JSX.Element[],
}

export type DataProviderTypes = {
    data: [] | Array<responseData>,
    setData: React.Dispatch<React.SetStateAction<[] | responseData[]>>,
    isLoading: boolean,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    isFetching: boolean,
    setIsFetching: React.Dispatch<React.SetStateAction<boolean>>,
    ships: Array<{ name: string, id: string }> | [],
    setShips: React.Dispatch<React.SetStateAction<[] | {
        name: string;
        id: string;
    }[]>>,
    selectValue: string,
    setSelectValue: React.Dispatch<React.SetStateAction<string>>,
    sortSettings: '' | sortSettingType,
    setSortSettings: React.Dispatch<React.SetStateAction<sortSettingType>>

};

export type sortSettingType = 'asc' | 'desc' | ''

export type responseData = {
    youtubeId: string,
    youtubeLink: string,
    info: string,
    isSuccess: boolean,
    details: string | null,
    dateUnix: number,
    dateLocal: string,
    name: string,

}


export type schema = {

    "name": {
        "type": "String",
        "unique": true,
        "required": true
    },
    "date_unix": {
        "type": "Number",
        "required": true
    },
    "date_local": {
        "type": "String",
        "required": true
    },

    "success": {
        "type": "Boolean",
        "default": null
    },

    "details": {
        "type": "String",
        "default": null
    },

    "links": {
        "webcast": {
            "type": "String",
            "default": null
        },
        "youtube_id": {
            "type": "String",
            "default": null
        },
        "article": {
            "type": "String",
            "default": null
        },

    },
}