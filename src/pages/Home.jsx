import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Transition from '../Transition';
import Carousel from '../Carousel';

const Home = () => {
    return (
        <motion.div className="m-auto" initial={Transition.initial} animate={Transition.animate} exit={Transition.exit} transition={Transition.transitionEffect}>
            <Carousel />
            <div className="absolute top-40 left-10">
                <div className="card">
                    <Link to="/Details" className="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-4xl hover:bg-gray-100 hover:scale-105 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-slate-700 transition ease-in-out mb-3">
                        <img className="object-cover w-full h-96 rounded-t-lg md:h-full md:w-48 md:rounded-none md:rounded-l-lg" src='../Images/deskimg.jpg' alt=""/>
                            <div className="flex flex-col justify-between p-4 leading-normal">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-stone-300">Wellcome</h5>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                Hey Everyones! 👋 Im Francesco and this is my real first project made with ReactJS as frontend and Node.js as backend. The whole project base the DB structure on a MySQL Database.
                                This App was made for a friend of mine and i took the opportunity to learn something about React and the Node workflows on a small single page Web App.
                                In order to make it accessible like a proper inventory stand-alone offline program, i decided to wrap it in the Electron framework.
                                Please, enojy your time while using this app!! 🤗
                                </p>
                        </div>
                    </Link>
                </div>
            </div>
            <div className="end">
                <p className="quote">'Mama always said life was like a box of chocolates. You never know what you're gonna get.'</p>
                <p className="signature">Forrest Gump</p>
            </div>
        </motion.div>
    );
}
export default Home;