import React, { useState } from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'

import CountryList from './components/CountryList'
import CountryDrawer from './components/CountryDrawer'
import Header from './components/Header'

import { Region } from './utils/constants'

const useStyles = makeStyles(theme =>
    createStyles({
        appContainer: {
            height: '100%',
            width: '100%',
            minWidth: 0
        },
        list: {
            height: 'calc(100vh - 48px)'
        }
    })
)

const App: React.FC = () => {
    const [region, setRegion] = useState<Region>(Region.Africa)
    const [selectedCountry, setSelectedCountry] = useState<string>()
    const onPopupClose = () => setSelectedCountry(undefined)
    const styles = useStyles()
    return (
        <div className={styles.appContainer}>
            <Header selectedRegion={region} onRegionClick={setRegion} />
            <CountryList className={styles.list} region={region} showCountryDetails={setSelectedCountry} />
            {selectedCountry && (
                <CountryDrawer name={selectedCountry} open={!!selectedCountry} handleClose={onPopupClose} />
            )}
        </div>
    )
}

export default App
