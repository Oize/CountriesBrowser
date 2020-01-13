import React, { useState, useEffect } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    CircularProgress
} from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'

import { Region, CountryBasic } from '../utils/constants'
import { getCountriesByRegion } from '../utils/api'

import FlagCell from './FlagCell'

interface CountryListProps {
    className?: string
    region: Region
    showCountryDetails: (name: string) => void
}

interface HeadCell {
    name: keyof CountryBasic
    label: string
    numeric: boolean
}

function stableSort<T>(array: T[], cmp: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number])
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0])
        if (order !== 0) return order
        return a[1] - b[1]
    })
    return stabilizedThis.map(el => el[0])
}

type Order = 'asc' | 'desc'

function getSorting<K extends keyof any>(
    order: Order,
    orderBy: K
): (a: { [key in K]: number | string | null }, b: { [key in K]: number | string | null }) => number {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy)
}

function desc<T>(a: T, b: T, orderBy: keyof T) {
    const x = a[orderBy] || 0
    const y = b[orderBy] || 0
    if (y < x) {
        return -1
    }
    if (y > x) {
        return 1
    }
    return 0
}

const useStyles = makeStyles(theme =>
    createStyles({
        flagHeader: {
            width: '40px'
        }
    })
)

const CountryList: React.FC<CountryListProps> = ({ className, region, showCountryDetails }) => {
    const styles = useStyles()
    const [countries, setCountries] = useState<CountryBasic[]>()
    const [order, setOrder] = React.useState<Order>('asc')
    const [orderBy, setOrderBy] = React.useState<keyof CountryBasic>('name')

    useEffect(() => {
        async function fetchAPI() {
            let response = await getCountriesByRegion(region)
            setCountries(response)
        }
        fetchAPI()
    }, [region])

    if (!countries) {
        return <CircularProgress />
    }

    const createSortHandler = (property: keyof CountryBasic) => (event: React.MouseEvent<unknown>) => {
        onSortClick(event, property)
    }

    const onSortClick = (_event: React.MouseEvent<unknown>, property: keyof CountryBasic) => {
        const isAsc = orderBy === property && order === 'asc'
        setOrder(isAsc ? 'desc' : 'asc')
        setOrderBy(property)
    }

    const onRowClick = (name: string, _event: React.MouseEvent) => {
        showCountryDetails(name)
    }

    const headCells: HeadCell[] = [
        { name: 'flag', numeric: false, label: 'Flag' },
        { name: 'name', numeric: false, label: 'Name' },
        { name: 'populationDensity', numeric: true, label: 'Density' }
    ]

    return (
        <TableContainer className={className}>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        {headCells.map(headCell => (
                            <TableCell
                                className={headCell.name === 'flag' ? styles.flagHeader : undefined}
                                key={headCell.name}
                                align={headCell.numeric ? 'right' : 'left'}
                                sortDirection={orderBy === headCell.name ? order : false}
                            >
                                {headCell.name === 'flag' ? (
                                    headCell.label
                                ) : (
                                    <TableSortLabel
                                        active={orderBy === headCell.name}
                                        direction={orderBy === headCell.name ? order : 'asc'}
                                        onClick={createSortHandler(headCell.name)}
                                    >
                                        {headCell.label}
                                    </TableSortLabel>
                                )}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {stableSort(countries, getSorting(order, orderBy)).map((row, index) => {
                        return (
                            <TableRow
                                hover
                                onClick={onRowClick.bind(null, row.name)}
                                role="checkbox"
                                tabIndex={-1}
                                key={row.name}
                            >
                                <FlagCell src={row.flag} />
                                <TableCell>{row.name}</TableCell>
                                <TableCell align="right">
                                    {row.populationDensity ? +row.populationDensity.toFixed(2) : 'NDA'}
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default CountryList
