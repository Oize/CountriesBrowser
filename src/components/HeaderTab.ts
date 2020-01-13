import { Tab as MuiTab } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import { Region } from '../utils/constants'

function getColor(region: Region) {
    switch (region) {
        case Region.Africa: {
            return '#000'
        }
        case Region.Americas: {
            return '#DF0024'
        }
        case Region.Asia: {
            return '#F4C300'
        }
        case Region.Europe: {
            return '#0085C7'
        }
        case Region.Oceania: {
            return '#009F3D'
        }
    }
}

const Tab = withStyles(theme => ({
    root: {
        [theme.breakpoints.up('xs')]: {
            minWidth: 0
        }
    },
    textColorInherit: {
        '&$selected': {
            fontWeight: 'bold'
        }
    },
    selected: {}
}))(MuiTab)

export function getHeaderTab(region: Region) {
    return withStyles({
        textColorInherit: {
            '&$selected': {
                color: getColor(region)
            }
        },
        selected: {}
    })(Tab)
}

export default Tab
