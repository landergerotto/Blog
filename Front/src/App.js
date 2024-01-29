import './App.css';
import NavBar from './components/navbar';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/home';
function App() {
return (
<>
<Routes>
<Route path='/home' element={<HomePage />} />
</Routes>
</>
);
}
export default App;