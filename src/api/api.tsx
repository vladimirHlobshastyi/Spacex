import axios from "axios";

const SPACEX_LINK = 'https://api.spacexdata.com/v4/launches/'

type ApiTypes = { 'date_utc': 'asc' | 'desc' | '' }

export const getLaunch = (page: number, sort: ApiTypes) => axios.post(`${SPACEX_LINK}query`, {
    "options": {
        "pagination": true,
        "page": page,
        "limit": 9,
        "sort": sort
    }
})

export const getAllShipsApi = (id: string) => axios.get(`${SPACEX_LINK + id}`)


