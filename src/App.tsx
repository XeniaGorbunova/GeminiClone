import { ErrorToaster } from "./components/ErrorToaster/ErrorToaster";
import { Main } from "./components/Main/Main";
import { Sidebar } from "./components/Sidebar/sidebar";


function App() {

  return (
      <>
      <ErrorToaster />
      <Sidebar />
      <Main />
      </>
  )
}

export default App
