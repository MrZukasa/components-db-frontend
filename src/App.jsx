import Navbar from './Navbar';
import Footer from './Footer';
import {BrowserRouter as Router} from 'react-router-dom';
import AnimatedRoutes from '../src/AnimatedRoutes';


function App() {

  return (
    <Router>
      <div className="App">
        <Navbar />
          <AnimatedRoutes />
        <Footer />
      </div>
    </Router>
  )
}

export default App;
