import React from 'react'
import { Avatar, TableCell as MuiTableCell } from '@material-ui/core'
import { createStyles, makeStyles, withStyles } from '@material-ui/core/styles'

interface FlagCellProps {
    src: string
}

const TableCell = withStyles({
    root: {}
})(MuiTableCell)

const useStyles = makeStyles(theme =>
    createStyles({
        avatar: {
            width: 'auto',
            justifyContent: 'center'
        },
        image: {
            maxHeight: 'auto',
            maxWidth: '40px',
            border: '1px solid lightgrey'
        }
    })
)

const FlagCell: React.FC<FlagCellProps> = ({ src }) => {
    const styles = useStyles()
    return (
        <TableCell>
            <Avatar className={styles.avatar} imgProps={{ className: styles.image }} variant={'square'} src={src} />
        </TableCell>
    )
}

export default FlagCell
