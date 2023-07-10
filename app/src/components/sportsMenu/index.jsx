import React, { useRef, useEffect } from 'react';

/**
 * 
 * SportsMenu - common component use for menu tabs.
 * 
 */


const SportsMenu = ({ data, handleSelect, selectedItem }) => {
    console.log('selectedItem: ', selectedItem);
    
    const mergedObj = data && Object.entries(data)?.map(([key, value]) => ({
        key,
        value
    }))

    const containerRef = useRef(null);
    const selectedRef = useRef(null);
  
    // hooks create for scroll selected element to left
    useEffect(() => {
        if (containerRef.current && selectedRef.current) {

        const container = containerRef.current;
        const selected = selectedRef.current;
  
        const containerRect = container.getBoundingClientRect();
        const selectedRect = selected.getBoundingClientRect();
  
        const scrollOffset = (selectedRect.left - containerRect.left ) - 14;
        container.scrollTo({
          behavior: 'smooth',
          left: container.scrollLeft + scrollOffset,
        });
      }
    }, [selectedItem]);
    
    return (
        <div className='league_tabs'>
            <div className='league_tab_slider'>
                <ul ref={containerRef} data-scrollable="true">
                    {mergedObj?.map((item, index) => (
                        <li ref={selectedItem === item?.key ? selectedRef : null} className={selectedItem === item?.key ? "selected" : null} key={item?.key + "-"} onClick={() => handleSelect(item?.key)}>{item?.value}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default SportsMenu