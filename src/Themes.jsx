import { useState, useEffect } from "react";

const changeTheme = () => {

    const [theme, setTheme] = useState(localStorage.getItem('Tema'));
    const colorTheme = theme =='dark'?'light':'dark';
    localStorage.setItem('Tema',theme);

    useEffect(() =>{
        const root = document.getElementById('root');
        root.classList.remove(colorTheme);
        root.classList.add(theme);
    },[theme])

    return[colorTheme, setTheme];
}

export default changeTheme;