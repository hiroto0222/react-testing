import "./App.css";
import { Application } from "./components/application/Application";
import { CounterTwo } from "./components/counter-two/CounterTwo";
import { Counter } from "./components/counter/Counter";
import { MuiMode } from "./components/mui/MuiMode";
import { AppProviders } from "./components/providers/AppProviders";
import { Skills } from "./components/skills/Skills";

function App() {
  return (
    <AppProviders>
      <div className="App">
        <Application />
        <Skills skills={["HTML", "CSS"]} />
        <Counter />
        <MuiMode />
        <CounterTwo count={1} />
      </div>
    </AppProviders>
  );
}

export default App;
