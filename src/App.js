import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import AuthForm from './components/AuthForm';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import IndexPage from './IndexPage';

function App() {
  return (
    <div>
      <IndexPage />
    </div>
   
  );
}

export default App;
