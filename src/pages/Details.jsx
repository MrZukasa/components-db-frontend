import { useState, useEffect} from "react";
import { useHistory, useLocation } from "react-router-dom";
import Modal from "../Modal";
import axios from "axios";
import Transition from "../Transition";
import { motion } from 'framer-motion';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';

const Details = () => {

    const [codice, setCodice] = useState('');
    const [codiceCostruttore, setCodiceCostruttre] = useState('');
    const [descrizione, setDescrizione] = useState('');
    const [costruttore, setCostruttore] = useState('');
    const [quantita,setQuantita] = useState('');
    const [posizione, setPosizione] = useState('');
    const [rivenditore1, setRivenditore1] = useState('');
    const [rivenditore2, setRivenditore2] = useState('');
    const [rivenditore3, setRivenditore3] = useState('');
    const [note,setNote] = useState('');
    const [image,setImage] = useState(null);
    const [response,setResponse] = useState('');
    const [showModal, setShowModal] = useState(false);
    const cloning = useLocation();

    const componente = {codice, codiceCostruttore, descrizione, costruttore, quantita, posizione, rivenditore1, rivenditore2, rivenditore3, note};

    useEffect(() => {
        if (cloning.state != undefined) {
            setCodiceCostruttre(cloning.state.codiceCostruttore);
            setDescrizione(cloning.state.descrizione);
            setCostruttore(cloning.state.costruttore);
            setQuantita(cloning.state.quantita);
            setPosizione(cloning.state.posizione);
            setRivenditore1(cloning.state.rivenditore1);
            setRivenditore2(cloning.state.rivenditore2);
            setRivenditore3(cloning.state.rivenditore3);
            setNote(cloning.state.note);
        }
    },[cloning])

    const insert = (e) => {
        e.preventDefault();
        async function insertData(componente){
            // return await axios.post("http://localhost:3001/Insert",{
            return await axios.post("https://components-db-backend.herokuapp.com/Insert",{
                    codice : componente.codice,
                    codiceCostruttore : componente.codiceCostruttore,
                    descrizione : componente.descrizione,
                    costruttore : componente.costruttore,
                    quantita : componente.quantita,
                    posizione : componente.posizione,
                    rivenditore1 : componente.rivenditore1,
                    rivenditore2 : componente.rivenditore2,
                    rivenditore3 : componente.rivenditore3,
                    note : componente.note
            })
        }

        const formData = new FormData();
        formData.append('dropzone-file',image)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        async function insertIMG(){
            // return await axios.patch("http://localhost:3001/Upload/" + codice, formData, config);
            return await axios.patch("https://components-db-backend.herokuapp.com/Upload/" + codice, formData, config);
        }

        insertData(componente)
        .then(() => {
            setResponse('Successfully Inserted!');
            insertIMG()
            .then(() => setResponse('Successfully Inserted, also with image!'))
            .catch(e => setResponse('Successfully Inserted but the image got an Error: ' + e.response.data))
        })
        .catch(e => setResponse('Error: ' + e.response.data))
        setShowModal(true);
    }

    return (
        <motion.div className="content" initial={Transition.initial} animate={Transition.animate} exit={Transition.exit} transition={Transition.transitionEffect}>
            <form onSubmit={insert} autoComplete="off">
                <div className="grid grid-cols-4 gap-6">
                    <div className="relative z-0 w-full mb-6 group col-span-2">
                        <input type="text" name="codice" className="peer" placeholder=" " value={codice} onChange={(e)=>setCodice(e.target.value)} required/>
                        <label htmlFor="codice">Code</label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group col-span-2">
                        <input type="text" name="codiceCostruttore" className="peer" placeholder=" " value={codiceCostruttore} onChange={(e)=>setCodiceCostruttre(e.target.value)}/>
                        <label htmlFor="codiceCostruttore">Manufacturer Code</label>
                    </div>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input type="text" name="descrizione" className="peer" placeholder=" " value={descrizione} onChange={(e)=>setDescrizione(e.target.value)} required/>
                    <label htmlFor="descrizione">Description</label>
                </div>
                <div className="grid grid-cols-5 gap-6">
                    <div className="relative z-0 w-full mb-6 group col-span-3">
                        <input type="text" name="costruttore" className="peer" placeholder=" " value={costruttore} onChange={(e)=>setCostruttore(e.target.value)}/>
                        <label htmlFor="costruttore">Manufacturer</label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <input type="text" name="quantita" className="peer" required placeholder=" " value={quantita} onChange={(e)=>{
                            if ((!isNaN(e.target.value) && (e.target.value != " "))){
                                setQuantita(e.target.value)
                            }}}/>
                        <label htmlFor="quantita">Quantity</label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <input type="text" name="posizione" className="peer" placeholder=" " value={posizione} onChange={(e)=>setPosizione(e.target.value)}/>
                        <label htmlFor="posizione">Ubication</label>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                        <input type="text" name="rivenditore1" className="peer" placeholder=" " value={rivenditore1} onChange={(e)=>setRivenditore1(e.target.value)}/>
                        <label htmlFor="rivenditore1">Firs Reseller</label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <input type="text" name="rivenditore2" className="peer" placeholder=" " value={rivenditore2} onChange={(e)=>setRivenditore2(e.target.value)}/>
                        <label htmlFor="rivenditore2">Second Reseller</label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <input type="text" name="rivenditore3" className="peer" placeholder=" " value={rivenditore3} onChange={(e)=>setRivenditore3(e.target.value)}/>
                        <label htmlFor="rivenditore3">Third Reseller</label>
                    </div>
                </div>
                <div className="grid grid-cols-5 gap-6">
                    <div className="relative z-0 w-full mb-6 group col-span-3">
                        <textarea rows="7" type="text" name="note" className="peer" placeholder=" " value={note} onChange={(e)=>setNote(e.target.value)}/>
                        <label htmlFor="note">Note</label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group col-span-2">
                        <label htmlFor="dropzone-file" className="flex flex-col justify-center items-center w-full h-52 bg-gray-200 rounded-lg border-2 border-gray-400 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-slate-800 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-violet-400 hover:border-violet-500 dark:hover:bg-slate-700 ml-20">
                            <div className="flex flex-col justify-center items-center pt-5 pb-6 absolute">
                                <svg className="mb-3 w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">All image file (MAX. 64Kib)</p>
                            </div>
                            <input id="dropzone-file" type="file" className="flex w-full h-full opacity-0 cursor-pointer" accept="image/*" name="dropzone-file" onChange={(e)=>{
                                if (e.target.files[0].size <= 64000){
                                    setImage(e.target.files[0]);
                                    window.document.getElementById('labelimage').value = e.target.files[0].name;
                                } else {
                                    window.document.getElementById('labelimage').classList.add('!text-red-500');
                                    window.document.getElementById('labelimage').value = 'File too big!!';
                                    setTimeout(()=>{
                                        window.document.getElementById('labelimage').classList.remove('!text-red-500');
                                    },5000);
                                }
                                }}/>
                        </label>
                        <div className="flex justify-center mt-44">
                            {/* <input type="text" id='labelimage' className="w-80 border-0 !text-violet-400 text-sm text-center" disabled value={(image!=null) ? image.name:'No image selected'}/> */}
                            <input type="text" id='labelimage' className="w-80 border-0 !text-violet-400 text-sm text-center" disabled/>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                        <Tooltip title="Add" TransitionComponent={Zoom}>
                            <button type="submit" className="bottone">
                                <svg className="w-6 h-6 dark:fill-white fill-gray-900" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path>
                                </svg>
                            </button>
                        </Tooltip>
                    </div>
                </div>
                <Modal showModal={showModal} onClose={()=> {
                    setShowModal(false);
                    if (response.includes('Succ')==true) {
                        setCodice('');
                        setCodiceCostruttre('');
                        setDescrizione('');
                        setCostruttore('');
                        setQuantita('');
                        setPosizione('');
                        setRivenditore1('');
                        setRivenditore2('');
                        setRivenditore3('');
                        setNote('');
                        setImage(null);
                    }
                    }} response={response}/>
            </form>
        </motion.div>
    );
}

export default Details;