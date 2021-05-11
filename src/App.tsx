import React from 'react';
import { useSelector } from 'react-redux';
import Forecast from './components/forecast';
import Loading from './components/loading';
import { getLoadingStatus } from './store/store';


const App = (props: {

}) => {
  const loadingStatus = useSelector(getLoadingStatus);
  const isLoaded = loadingStatus === "succeeded";

  return (
    isLoaded ? <Forecast /> : <Loading />
  );
}

export default App;
