import CoolPrintApp from "./cool-print-app";
import { enableReactTracking } from "@legendapp/state/config/enableReactTracking";

enableReactTracking({
  auto: true,
});

function App() {
  return <CoolPrintApp />;
}

export default App;
