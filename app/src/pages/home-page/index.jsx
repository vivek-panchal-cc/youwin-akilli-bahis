import React, { useContext } from 'react'
import TeaserSlider from './components/TeaserSlider';
import { AppContext } from '../../context/AppContext';
import SportsMenu from '../../components/sportsMenu';
import LigSlider from '../../components/ligSlider';
import PopularOdds from './components/PopularOdds';
import { addPopularOddToCollection, addTeaserItemToCollection } from '../../feature/appAction';
import { ReducerContext } from '../../context/ReducerContext';
import { addLigItemToCollection } from '../../feature/appAction';

/**
 * HomePage - component it's first page which is show app started.
 */

const HomePage = () => {
  const {fireBaseTeaserDataBase, fireBaseAllLeaguesDataBase, fireBaseFeaturedDataBase, fireBasePopularOddsDataBase, fireBaseHomePageSliderDataBase} = useContext(AppContext);

  const {tipsCollection, dispatch} = useContext(ReducerContext);

  // @futureUse const selectedMenuTab = fireBaseAllLeaguesDataBase && Object.keys(fireBaseAllLeaguesDataBase)?.[0];

  const handleSelect = (item) => {
    console.log('item: ', item);
  }

  // useEffect(() => {
  //   setSportMenu(dispatch, selectedMenuTab)
  // }, [fireBaseAllLeaguesDataBase])
  
  const handleSelectOdd = (data) => {
    addPopularOddToCollection(dispatch, data);
  }
  
  const handleSelectLigItem = (data) => {
    addLigItemToCollection(dispatch, data);
  }

  const handleSelectTeaserItem = (data) => {
    addTeaserItemToCollection(dispatch, data);
  }
  return (
    <div className='home_page_container'>
      <TeaserSlider data={fireBaseTeaserDataBase} handleSelectTeaser={handleSelectTeaserItem}/>
      <SportsMenu data={fireBaseAllLeaguesDataBase} handleSelect={handleSelect} selectedItem={''} />
      <LigSlider data={fireBaseHomePageSliderDataBase} handleSelectLig={handleSelectLigItem} tipsCollection={tipsCollection}/>
      <PopularOdds data={fireBasePopularOddsDataBase} handleSelectOdd={handleSelectOdd} tipsCollection={tipsCollection}/>
    </div>
  )
}

export default HomePage;