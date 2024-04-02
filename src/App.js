import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./css/developer.css";
import FireBaseForm from "./form/FireBaseForm";
import AppComponent from "./app/index";
import FireBaseList from "./form/FireBaseList";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
        <FireBaseForm />
      </header>
      <FireBaseList />
      <AppComponent.Footer />
    </div>
  );
}

export default App;
