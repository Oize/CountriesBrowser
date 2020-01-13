import React from 'react'

import {
    ExpansionPanel as MuiExpansionPanel,
    ExpansionPanelDetails as MuiExpansionPanelDetails,
    ExpansionPanelSummary as MuiExpansionPanelSummary,
    Typography as MuiTypography
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const ExpansionPanel = withStyles({
    root: {
        borderTop: '1px solid rgba(0, 0, 0, .125)',
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
        borderLeft: 0,
        borderRight: 0,
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0
        },
        '&:before': {
            display: 'none'
        },
        '&$expanded': {
            margin: 0
        }
    },
    expanded: {}
})(MuiExpansionPanel)

const ExpansionPanelDetails = withStyles({
    root: {
        flexDirection: 'column'
    }
})(MuiExpansionPanelDetails)

const ExpansionPanelSummary = withStyles({
    root: {
        '&$expanded': {
            minHeight: '48px'
        }
    },
    content: {
        '&$expanded': {
            margin: 0
        }
    },
    expanded: {}
})(MuiExpansionPanelSummary)

const Typography = withStyles({
    body1: {
        fontWeight: 'bold'
    }
})(MuiTypography)

interface ExpandableProps {
    title: string
    defaultExpanded?: boolean
}

const Expandable: React.FC<ExpandableProps> = ({ title, defaultExpanded, children }) => (
    <ExpansionPanel elevation={0} square defaultExpanded={defaultExpanded}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
            <Typography variant="body1">{title}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>{children}</ExpansionPanelDetails>
    </ExpansionPanel>
)

export default Expandable
