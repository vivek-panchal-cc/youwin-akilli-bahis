import React, { useRef, useEffect } from "react";
import Skeleton from "react-loading-skeleton";

/**
 *
 * SportsMenu - common component use for menu tabs.
 *
 */

const SportsMenu = ({ data, handleSelect, selectedItem, isLoading }) => {
  const mergedObj = data
    ? Object.keys(data).sort((a, b) => {
        const numA = parseInt(a.match(/\d+/)[0]); // extract the numeric part from the key
        const numB = parseInt(b.match(/\d+/)[0]);
        return numA - numB; // numerical comparison
      })
    : [];

  const containerRef = useRef(null);
  const selectedRef = useRef(null);

  // hooks create for scroll selected element to left
  useEffect(() => {
    if (containerRef.current && selectedRef.current) {
      const container = containerRef.current;
      const selected = selectedRef.current;

      const containerRect = container.getBoundingClientRect();
      const selectedRect = selected.getBoundingClientRect();

      const scrollOffset = selectedRect.left - containerRect.left - 14;
      container.scrollTo({
        behavior: "smooth",
        left: container.scrollLeft + scrollOffset,
      });
    }
  }, [selectedItem]);

  return (
    <div className="league_tabs">
      <div
        className={
          isLoading ? "league_tab_slider loading" : "league_tab_slider"
        }
      >
        <ul ref={containerRef} data-scrollable="true">
          {isLoading
            ? Array.from({ length: mergedObj?.length || 5 }).map((_, index) => (
                <li key={index} className="league_tab_slider_item">
                  <Skeleton height={100} />
                </li>
              ))
            : mergedObj?.map((key) => (
                <li
                  key={key}
                  ref={selectedItem === key ? selectedRef : null}
                  className={selectedItem === key ? "selected" : null}
                  onClick={() => handleSelect(key)}
                >
                  {data[key]}
                </li>
              ))}
        </ul>
      </div>
    </div>
  );
};

export default SportsMenu;
