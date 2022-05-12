import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import './asserts/styles/App.scss';
import Garage from './components/Garage/Garage';
import MyContainer from './components/Container/MyContainer';
import Winners from './components/Winners/Winners';
import Footer from './components/Footer/Footer';
import Helper from './components/Helper/Helper';

// const persistor = persistStore(store);

const App = function () {
  return (
    <Router>
      <Provider store={store}>
        <div className="App">
          <Helper />
          <Routes>
            <Route
              path="/"
              element={(
                <MyContainer>
                  <Garage />
                </MyContainer>
              )}
            />
          </Routes>
          <Routes>
            <Route
              path="/winners"
              element={(
                <MyContainer>
                  <Winners />
                </MyContainer>
              )}
            />
          </Routes>
          <Footer />
        </div>
      </Provider>
    </Router>
  );
};
export default App;
