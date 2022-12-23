import './App.css';
import { MultiStepForm } from './components/MultiStepForm/MultiStepForm';
import { SuccessPage } from './components/SuccessPage/SuccessPage';
import { UserDataProvider } from './context/UserDataProvider';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div className="page-background"></div>
      <UserDataProvider>
        <Router>
          <main className="main-container">
            <Routes>
              <Route
                path="/"
                exact
                element = {<MultiStepForm />}
              />
              <Route
                  path="/success"
                  exact
                  element = {<SuccessPage />}
                />
              </Routes>
          </main>
        </Router> 
      </UserDataProvider>
    </div>
  );
}

export default App;
