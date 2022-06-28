import React, { useState, useEffect, useRef } from "react";

const images = [
    "../Images/background.jpg",
    "../Images/background1.jpg",
    "../Images/background2.jpg",
];

let count = 0;

const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const animate = useRef();

    const removeAnimation = () => {
        animate.current.classList.remove("fade-anim");
    }

    useEffect(() => {
        setInterval(() => {
            handleNextClick()
            animate.current.addEventListener('animationend', removeAnimation)
        }, 50000);
    },[])

    const handlePrevClick= () => {
        const imageLength = images.length;
        count = (currentIndex + imageLength - 1) % imageLength;
        setCurrentIndex(count);
        animate.current.classList.add('fade-anim');
    }

    const handleNextClick= () => {
        count = (count + 1) % images.length;
        setCurrentIndex(count);
        animate.current.classList.add('fade-anim');
    }

    return (
        <div ref={animate} className="select-none flex">
            <div className="flex justify-center">
                <img src={images[currentIndex]} className="object-cover w-screen h-[78vh]" alt=""/>
            </div>
            {/* <div className="absolute w-full top-1/2 transform -translate-y-1/2 px-3 flex justify-between items-center">
                <button onClick={handlePrevClick}>
                    <svg class="w-6 h-6 dark:fill-gray-400 fill-gray-900 hover:scale-150 transition ease-in-out" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd"></path>
                    </svg>
                </button>
                <button onClick={handleNextClick}>
                    <svg class="w-6 h-6 dark:fill-gray-400 fill-gray-900 hover:scale-150 transition ease-in-out" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clip-rule="evenodd"></path><path fill-rule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                    </svg>
                </button>
            </div> */}
        </div>
    );
}

export default Carousel;