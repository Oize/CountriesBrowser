import React, { useEffect, useState } from 'react'
import { Drawer } from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { Country } from '../utils/constants'
import { getCountryByName } from '../utils/api'

import CountryInfo from './CountryInfo'

interface CountryDrawerProps {
    name: string
    open: boolean
    handleClose: () => void
}

const useStyles = makeStyles(theme =>
    createStyles({
        paper: {
            maxWidth: '80vw',
            overflow: 'scroll'
        }
    })
)

const CountryDrawer: React.FC<CountryDrawerProps> = ({ name, open, handleClose }) => {
    const styles = useStyles()
    const [country, setCountry] = useState<Country>()

    useEffect(() => {
        async function fetchAPI() {
            let response = await getCountryByName(name)
            setCountry(response)
        }
        fetchAPI()
    }, [name])

    return (
        <Drawer PaperProps={{ className: styles.paper }} anchor="right" open={open} onClose={handleClose}>
            <CountryInfo name={name} country={country} />
        </Drawer>
    )
}

export default CountryDrawer
