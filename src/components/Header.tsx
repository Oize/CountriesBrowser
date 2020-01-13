import React, { useEffect, useState } from 'react'
import { AppBar, Tabs } from '@material-ui/core'

import { Region, Regions, RegionsShort } from '../utils/constants'

import { getHeaderTab } from './HeaderTab'

interface HeaderProps {
    selectedRegion: Region
    onRegionClick: (region: Region) => void
}

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

const Header: React.FC<HeaderProps> = ({ selectedRegion, onRegionClick }) => {
    const [width, setWidth] = useState<number>(window.innerWidth)
    const onTabClick = (_e: React.ChangeEvent<{}>, region: Region) => {
        onRegionClick(region)
    }

    useEffect(() => {
        function handleResize() {
            setWidth(window.innerWidth)
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <AppBar color="default">
            <Tabs
                value={selectedRegion}
                onChange={onTabClick}
                variant="fullWidth"
                TabIndicatorProps={{
                    style: {
                        backgroundColor: getColor(selectedRegion)
                    }
                }}
            >
                {(width > 700 ? Regions : RegionsShort).map((region, idx) => {
                    const Tab = getHeaderTab(Regions[idx])
                    return <Tab key={region} label={region} value={Regions[idx]} />
                })}
            </Tabs>
        </AppBar>
    )
}

export default Header
