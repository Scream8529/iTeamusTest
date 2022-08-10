import { Filter, Results } from '@comp/index';
import styles from '../styles/Home.module.css';
import { useEffect, useState } from 'react';
import { fakeData } from 'fake-data/vacancies';
import { IFilterValue, IVacancy } from 'models';
import { getArrayForFilter } from 'utils/gettArrayForFilters';
import { SelectChangeEvent } from '@mui/material';
import axios from 'axios';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [vacancies, setVacancies] = useState<IVacancy[]>([]);
  const [filterValue, setFilterValue] = useState<IFilterValue>({ region: 'all', city: 'all', company: 'all' });

  const regions: string[] = getArrayForFilter(vacancies, 'regionname');

  const getFiltredResults = () => {
    const newValue = vacancies.filter((item) => {
      const region = filterValue.region !== 'all' ? item.regionname === filterValue.region : true
      const city = filterValue.city !== 'all' ? item.placetitle === filterValue.city : true
      const company = filterValue.company !== 'all' ? item.clientname === filterValue.company : true
      return (region && city && company)
    })
    return newValue
  }

  const filtervalues = regions.map((item) => ({
    region: item,
    citys: getArrayForFilter(vacancies.filter((vac) => vac.regionname === item), 'placetitle')
      .map((city) => ({
        city,
        companys: getArrayForFilter(vacancies.filter((vac) => vac.placetitle === city), 'clientname')
      }))
  }))

  const [results, setResults] = useState(getFiltredResults());

  const toggleResultsFilter = (event: SelectChangeEvent) => {
    let newValue = filterValue;
    if (event.target.name === 'region') {
      newValue.city = 'all';
      newValue.company = 'all';
    }
    if (event.target.name === 'city') {
      newValue.company = 'all';
    }
    setFilterValue({ ...newValue, [event.target.name]: event.target.value })
  }

  useEffect(() => {
    setResults(getFiltredResults());
  }, [filterValue, isLoading]);
  const fetchData = async () => {
    // const response = await fetch(`https://gsr-rabota.ru/api/v2/GetAllVacancies`)
    axios.get(`https://gsr-rabota.ru/api/v2/GetAllVacancies`)
      .then((res) => {
        setVacancies(res.data)
        setIsLoading(false)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])
  return (
    <div className={styles.container}>
      <Filter
        filterValues={filtervalues}
        onChangeFilter={toggleResultsFilter}
        filterValue={filterValue} />
      <Results items={results} isLoading={isLoading} />
    </div>
  )
}

