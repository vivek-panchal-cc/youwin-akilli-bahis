import React from 'react'

/**
 * 
 * SportsMenu - common component use for menu tabs.
 * 
 */


const SportsMenu = ({ data, handleSelect, selectedItem }) => {
    
    const mergedObj = data && Object.entries(data)?.map(([key, value]) => ({
        key,
        value
    }))
    
    return (
        <div className='league_tabs'>
            <div className='league_tab_slider'>
                <ul data-scrollable="true">
                    {mergedObj?.map((item, index) => (
                        <li className={selectedItem === item?.key ? "selected" : null} key={item?.key + "-"} onClick={() => handleSelect(item?.key)}>{item?.value}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default SportsMenu