import { Link } from 'react-router-dom';
import { ParallaxHover } from 'react-parallax-hover';

const Navbar = () => {
    return (
        <nav className="navbar flex justify-center border-b dark:border-gray-600 border-gray-900 bg-gray-200 dark:bg-slate-800 transition duration-200">
            <div className="NavTitle">
                <ParallaxHover width={485} height={90} borderRadius={0} shadow={0} rotation={5} shine={0} scale={2} className="parallax">
                    <p className="text-center mt-2">Components DB</p>
                </ParallaxHover>
            </div>
            <div className="links m-auto dark:text-gray-300 text-gray-900 dark:font-normal font-semibold">
                <Link to="/"><div className="inline-flex pr-5 cursor-pointer transform dark:hover:text-violet-400 hover:text-violet-500 hover:scale-110 transition ease-in-out duration-300">Home</div></Link>
                <Link to="/Details"><div className="inline-flex pr-5 cursor-pointer transform dark:hover:text-violet-400 hover:text-violet-500 hover:scale-110 transition ease-in-out duration-300">Insert</div></Link>
                <Link to="/Search"><div className="inline-flex pr-5 cursor-pointer transform dark:hover:text-violet-400 hover:text-violet-500 hover:scale-110 transition ease-in-out duration-300">Search</div></Link>
            </div>
        </nav>
    );
}

export default Navbar;