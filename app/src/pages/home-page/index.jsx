import React, { useContext } from 'react'
import TeaserSlider from './components/TeaserSlider';
import { AppContext } from '../../context/AppContext';
import SportsMenu from '../../components/sportsMenu';
import LigSlider from '../../components/ligSlider';
import PopularOdds from './components/PopularOdds';
import { addPopularOddToCollection } from '../../feature/appAction';

/**
 * HomePage - component it's first page which is show app started.
 */

const HomePage = () => {
  const {dispatch, fireBaseTeaserDataBase, fireBaseAllLeaguesDataBase, fireBaseFeaturedDataBase, fireBasePopularOddsDataBase, reducerState} = useContext(AppContext);

  // const selectedMenuTab = fireBaseAllLeaguesDataBase && Object.keys(fireBaseAllLeaguesDataBase)?.[0];

  const handleSelect = (item) => {
    console.log('item: ', item);
  }

  // useEffect(() => {
  //   setSportMenu(dispatch, selectedMenuTab)
  // }, [fireBaseAllLeaguesDataBase])
  
  const handleSelectOdd = (data) => {
    addPopularOddToCollection(dispatch, data)
  }

  return (
    <div className='home_page_container'>
      <TeaserSlider data={fireBaseTeaserDataBase} />
      <SportsMenu data={fireBaseAllLeaguesDataBase} handleSelect={handleSelect} selectedItem={''} />
      <LigSlider data={fireBaseFeaturedDataBase}/>
      <PopularOdds data={fireBasePopularOddsDataBase} handleSelectOdd={handleSelectOdd} tipsCollection={reducerState?.tipsCollection}/>
    </div>
  )
}

export default HomePage;