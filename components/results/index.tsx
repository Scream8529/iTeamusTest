import { Button, Divider, TextField, Typography, Pagination, Dialog, Checkbox, CircularProgress } from '@mui/material';
import { IVacancy } from 'models'
import React, { useState, useEffect, FormEvent, useRef } from 'react'
import styles from '../../styles/Home.module.css';

const pageSize = 32

export default function Results({ items, isLoading }: { items: IVacancy[], isLoading: boolean }) {
  const [currentPage, setCurrentPage] = useState(1);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pageCount = Math.ceil(items.length / pageSize);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    if (typeof window !== 'undefined')
      window.scrollTo({ top: 0, behavior: 'smooth' })
  };

  useEffect(() => {
    setCurrentPage(1)
  }, [items])

  return (
    <div ref={containerRef}>
      {isLoading ? <div className={styles.loader}><CircularProgress /></div>
        : <>
          <div className={styles.results_container}>
            {items.map((item) => <ResultItem key={item.vacancy_id + item.vacplacement_id} {...item} />).slice((currentPage - 1) * pageSize, currentPage * pageSize)}
          </div>
          <div>
            {pageCount > 1 && <Pagination count={pageCount} page={currentPage} onChange={handleChange} />}
          </div>
        </>}
    </div>
  )
}

const ResultItem = (props: IVacancy) => {
  const [popup, setPopup] = useState(false);
  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    phone: '',
    acceptPolice: false,
  });

  const disabledSubmit = () => {
    //самая простая валидация, было бы больше времени можно было бы подключить useForm и yup
    return state.firstName.length > 3 && state.lastName.length > 3 && state.lastName.length > 3 && state.acceptPolice
  }
  const toggleState = (e: any) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }
  const togglecheckbox = (e: any) => {
    setState({ ...state, acceptPolice: e.target.checked })
  }

  const openPopup = () => {
    setPopup(true)
  }

  const closePopup = () => {
    setPopup(false)
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!disabledSubmit()) {
      //тут должна быть обработка ошибок полей
      return;
    }
    setState({
      firstName: '',
      lastName: '',
      middleName: '',
      phone: '',
      acceptPolice: false,
    });
    setPopup(false);
  }

  return (
    <div className={styles.result_item}>
      <Typography>{props.placetitle}</Typography>
      <Typography>{props.proftitle}</Typography>
      <Divider />
      <Typography>{props.salary_volume_ex}</Typography>
      <Typography>{props.directiontitle}</Typography>
      <Typography>{props.clientname}</Typography>
      <Typography>{props.salary_volume_ex}</Typography>
      <Button className={styles.buttons} variant='outlined'>Подробней</Button>
      <Button onClick={openPopup} className={styles.buttons} variant='contained'>Откликнутся!</Button>

      <Dialog open={popup} onClose={closePopup}>
        <div className={styles.popup_container}>
          <Typography>Откликнутся</Typography>
          <form onSubmit={onSubmit}>
            <div><TextField name={'firstName'} onChange={toggleState} className={styles.popup_inputs} variant='outlined' label="Имя" value={state.firstName} /></div>
            <div><TextField name={'lastName'} onChange={toggleState} className={styles.popup_inputs} variant='outlined' label="Фамилия" value={state.lastName} /></div>
            <div><TextField name={'middleName'} onChange={toggleState} className={styles.popup_inputs} variant='outlined' label="Отчество" value={state.middleName} /></div>
            <div><TextField name={'phone'} onChange={toggleState} className={styles.popup_inputs} variant='outlined' label="Телефон" value={state.phone} /></div>
            <div className={styles.popup_inputs}>
              <label> <Checkbox
                name={'acceptPolice'}
                onChange={togglecheckbox}
                checked={state.acceptPolice} />
                Я даю согласие на обработку своих персональных данных в соответсвии с
                <a href={'/police'} style={{ color: 'blue' }} rel="noreferrer" target={'_blank'}>положением об обработке персональных данных</a>
              </label>
            </div>
            <Button disabled={!disabledSubmit()} type='submit' className={styles.buttons} variant='contained'>Откликнутся!</Button>
          </form>
        </div>
      </Dialog>
    </div>
  )
}