import { InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material'
import { IFilterValue, IFilterValues } from 'models'
import React from 'react'
import styles from '../../styles/Home.module.css';

interface FilterProps {
  filterValues: IFilterValues;
  filterValue: IFilterValue,
  onChangeFilter: (event: SelectChangeEvent) => void
}
export default function Filter({ filterValues, filterValue, onChangeFilter }: FilterProps) {
  const citys = filterValues.find((item) => item.region === filterValue.region)
  const companys = citys ? citys.citys.find((item) => item.city === filterValue.city) : { companys: [] }

  return (
    <div className={styles.filter_container}>
      <InputLabel id="region">Регион</InputLabel>
      <Select
        labelId="region"
        id="region_select"
        value={filterValue.region}
        label="Регион"
        fullWidth
        name="region"
        onChange={onChangeFilter}
      >
        <MenuItem value={'all'}>all</MenuItem>
        {filterValues?.map((item: any, index) => <MenuItem key={index + item.region} value={item.region}>{item.region}</MenuItem>)}

      </Select>
      <InputLabel id="region">Город</InputLabel>
      <Select
        labelId="region"
        id="region_select"
        disabled={filterValue.region === 'all'}
        value={filterValue.city}
        label="Город"
        fullWidth
        name="city"
        onChange={onChangeFilter}
      >
        <MenuItem value={'all'}>all</MenuItem>
        {citys?.citys?.map((item, index) => <MenuItem key={index + item.city} value={item.city}>{item.city}</MenuItem>)}
      </Select>
      <InputLabel id="region">Организация</InputLabel>
      <Select
        labelId="region"
        id="region_select"
        disabled={filterValue.city === 'all'}
        value={filterValue.company}
        label="Age"
        fullWidth
        name="company"
        onChange={onChangeFilter}
      >
        <MenuItem value={'all'}>all</MenuItem>
        {companys && companys.companys.map((item, index) => <MenuItem key={index} value={item}>{item}</MenuItem>)}
      </Select>
    </div>
  )
}
