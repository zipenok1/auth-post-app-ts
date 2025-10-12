import AppRouter from "./components/AppRouter"
import { observer } from "mobx-react-lite"

const App = observer(() => {

  return (
    <>
      <AppRouter/>
    </>
  )
})

export default App
