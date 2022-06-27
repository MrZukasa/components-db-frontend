import Transition from '../Transition';
import { motion } from 'framer-motion';

const NotFound = () => {
    return (
        <motion.div className="container content" initial={Transition.initial} animate={Transition.animate} exit={Transition.exit} transition={Transition.transitionEffect}>
            <p className="dark:text-violet-300 text-violet-500 flex justify-start mt-1 p-10 text-9xl">404 :(</p>
            <p className="dark:text-violet-300 text-violet-500 flex justify-start mt-1 p-10 text-7xl">Page. Not. Found.</p>
        </motion.div>
    );
}

export default NotFound;