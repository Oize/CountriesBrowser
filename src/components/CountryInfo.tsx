import React from 'react'
import { TextField, Typography, CircularProgress } from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { Country } from '../utils/constants'

import Expandable from './Expandable'

interface CountryInfoProps {
    country?: Country
    name: string
}

const useStyles = makeStyles(theme =>
    createStyles({
        loaderContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        header: {
            padding: theme.spacing(2, 2, 0, 2)
        },
        headerSingle: {
            padding: theme.spacing(2)
        },
        subheader: {
            padding: theme.spacing(0, 2, 2, 2)
        },
        ul: {
            margin: 0
        },
        li: {
            '&:not(:last-child)': {
                marginBottom: '5px'
            }
        },
        row: {
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'space-between'
        },
        flexRow: {
            display: 'flex',
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'space-between'
        },
        column: {
            flexDirection: 'column'
        },
        flagContainer: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: theme.spacing(1)
        },
        flag: {
            border: '1px solid lightgrey',
            maxHeight: 80,
            maxWidth: '20vw'
        },
        textField: {
            flex: 1
        }
    })
)

const CountryInfo: React.FC<CountryInfoProps> = ({ country, name }) => {
    const styles = useStyles()

    if (!country) {
        return (
            <div>
                <Typography className={styles.headerSingle} id="simple-modal-title" variant="h4">
                    {name}
                </Typography>
                <div className={styles.loaderContainer}>
                    <CircularProgress />
                </div>
            </div>
        )
    }

    const singleHeader = country.nativeName === country.name

    const headerClassName = singleHeader ? styles.headerSingle : styles.header

    return (
        <div>
            <div className={styles.flexRow}>
                <div className={styles.column}>
                    <Typography className={headerClassName} id="simple-modal-title" variant="h5">
                        {country.name}
                    </Typography>
                    {!singleHeader && (
                        <Typography className={styles.subheader} variant="subtitle1" gutterBottom>
                            {country.nativeName}
                        </Typography>
                    )}
                </div>
                <div className={styles.flagContainer}>
                    <img className={styles.flag} src={country.flag} alt={`Flag of ${country.name}`}></img>
                </div>
            </div>
            <Expandable title="General" defaultExpanded>
                <TextField
                    className={styles.textField}
                    InputProps={{ disableUnderline: true, readOnly: true }}
                    label="Alternative spellings"
                    multiline
                    value={country.altSpellings.join(', ')}
                />
                <div className={styles.row}>
                    <TextField
                        className={styles.textField}
                        InputProps={{ disableUnderline: true, readOnly: true }}
                        label="Region"
                        value={country.region}
                    />
                    <TextField
                        className={styles.textField}
                        InputProps={{ disableUnderline: true, readOnly: true }}
                        label="Subregion"
                        value={country.subregion}
                    />
                </div>
                <div className={styles.row}>
                    <TextField
                        className={styles.textField}
                        InputProps={{ disableUnderline: true, readOnly: true }}
                        label="Latitude"
                        value={country.latlng[0]}
                    />
                    <TextField
                        className={styles.textField}
                        InputProps={{ disableUnderline: true, readOnly: true }}
                        label="Longitude"
                        value={country.latlng[1]}
                    />
                </div>
                <TextField
                    className={styles.textField}
                    InputProps={{ disableUnderline: true, readOnly: true }}
                    label="Capital"
                    value={country.capital}
                />
            </Expandable>
            <Expandable title="Territory">
                <TextField
                    className={styles.textField}
                    InputProps={{
                        disableUnderline: true,
                        readOnly: true
                    }}
                    label="Area (km²)"
                    value={country.area || 'NDA'}
                />
                <TextField
                    className={styles.textField}
                    multiline
                    InputProps={{ disableUnderline: true, readOnly: true }}
                    label="Borders"
                    value={country.borders.join(', ') || 'None'}
                />
                <TextField
                    className={styles.textField}
                    InputProps={{ disableUnderline: true, readOnly: true }}
                    label="Time zone"
                    multiline
                    value={country.timezones.join(', ')}
                />
            </Expandable>
            <Expandable title="People">
                <TextField
                    className={styles.textField}
                    InputProps={{ disableUnderline: true, readOnly: true }}
                    label="Demonym"
                    value={country.demonym}
                />
                <TextField
                    className={styles.textField}
                    InputProps={{ disableUnderline: true, readOnly: true }}
                    label="Population"
                    value={country.population || 'NDA'}
                />
                <TextField
                    className={styles.textField}
                    InputProps={{ disableUnderline: true, readOnly: true }}
                    label="Density"
                    value={country.populationDensity ? +country.populationDensity.toFixed(2) : 'NDA'}
                />
            </Expandable>
            <Expandable title="Languages">
                <ul className={styles.ul}>
                    {country.languages.map(({ name, nativeName }, idx) => (
                        <li key={idx} className={styles.li}>
                            {name === nativeName ? name : `${name} (${nativeName})`}
                        </li>
                    ))}
                </ul>
            </Expandable>
            <Expandable title="Economics">
                <TextField
                    className={styles.textField}
                    InputProps={{ disableUnderline: true, readOnly: true }}
                    label="Currency"
                    multiline
                    value={country.currencies
                        .map(({ name, code, symbol }) => `${name} (${symbol}) (${code})`)
                        .join('\n')}
                />
                <TextField
                    className={styles.textField}
                    InputProps={{ disableUnderline: true, readOnly: true }}
                    label="Gini"
                    value={country.gini || 'NDA'}
                />
            </Expandable>
            <Expandable title="Regional Blocks">
                {country.regionalBlocs.length ? (
                    country.regionalBlocs.map(({ name, acronym }, idx) => (
                        <li key={idx} className={styles.li}>
                            {`${name} (${acronym})`}
                        </li>
                    ))
                ) : (
                    <TextField
                        className={styles.textField}
                        InputProps={{ disableUnderline: true, readOnly: true }}
                        value={'NDA'}
                    />
                )}
            </Expandable>
            <Expandable title="Name translations">
                {Object.entries(country.translations).map((record, idx) => (
                    <TextField
                        key={idx}
                        multiline
                        className={styles.textField}
                        InputProps={{ disableUnderline: true, readOnly: true }}
                        label={record[0]}
                        value={record[1]}
                    />
                ))}
            </Expandable>
            <Expandable title="Codes">
                <div className={styles.row}>
                    <TextField
                        className={styles.textField}
                        InputProps={{ disableUnderline: true, readOnly: true }}
                        label="Alpha-2"
                        value={country.alpha2Code}
                    />
                    <TextField
                        className={styles.textField}
                        InputProps={{ disableUnderline: true, readOnly: true }}
                        label="Alpha-3"
                        value={country.alpha3Code}
                    />
                    <TextField
                        className={styles.textField}
                        InputProps={{ disableUnderline: true, readOnly: true }}
                        label="Numeric"
                        value={country.numericCode}
                    />
                </div>
                <TextField
                    className={styles.textField}
                    InputProps={{ disableUnderline: true, readOnly: true }}
                    label="Olympic code"
                    value={country.cioc || 'NDA'}
                />
                <TextField
                    className={styles.textField}
                    InputProps={{ disableUnderline: true, readOnly: true }}
                    label="Calling codes"
                    value={country.callingCodes.join(', ')}
                />
                <TextField
                    className={styles.textField}
                    InputProps={{ disableUnderline: true, readOnly: true }}
                    label="Internet TLD"
                    value={country.topLevelDomain.join(', ')}
                />
            </Expandable>
        </div>
    )
}

export default CountryInfo
