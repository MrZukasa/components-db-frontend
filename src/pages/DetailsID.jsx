import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import Modal from "../Modal";
import axios from "axios";
import Transition from "../Transition";
import { motion } from 'framer-motion';
import { Buffer } from "buffer";
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';

const DetailsID = () => {

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
    const navigate = useHistory();
    const [response,setResponse] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [image,setImage] = useState('');
    const [immagine, setImmagine] = useState('');
    const {ID} = useParams();
    const clearID = ID.split(':');
    const componente = {codice, codiceCostruttore, descrizione, costruttore, quantita, posizione, rivenditore1, rivenditore2, rivenditore3, note, image};

    useEffect(() => {
        async function readData() {
            // return await axios.get('http://localhost:3001/Read/'+ clearID[1])
            return await axios.get('https://components-db-backend.herokuapp.com/Read/'+ clearID[1])
        }
        readData()
        .then((responseData) => {
            if (responseData.length !== 0) {
                responseData.data.map((resultant)=>{
                    setCodice(resultant.codice)
                    setCodiceCostruttre(resultant.cod_costruttore)
                    setDescrizione(resultant.descrizione)
                    setCostruttore(resultant.costruttore)
                    setQuantita(resultant.quantita)
                    setPosizione(resultant.posizione)
                    setRivenditore1(resultant.rivenditore1)
                    setRivenditore2(resultant.rivenditore2)
                    setRivenditore3(resultant.rivenditore3)
                    setNote(resultant.note)
                    setImmagine(Buffer.from(resultant.immagine).toString('base64'))
                })
            } else {
                navigate.push('/NotFound');
            }
        })
    },[clearID[1]]);

    const Remove = ()=> {
        async function deleteData(){
            // return await axios.delete('http://localhost:3001/Delete/'+ clearID[1])
            return await axios.delete('https://components-db-backend.herokuapp.com/Delete/'+ clearID[1])
        }
        deleteData()
            .then(() => setResponse('Deleted Successfully!'))
            .catch(e => setResponse('Error: ' + e.response.data))
        setShowModal(true);
    }

    const Edit = ()=> {
        if ((componente.codice != '')&&(componente.descrizione != '')&&(!isNaN(componente.quantita))&&(componente.quantita != '')){
            async function updateData(componente){
                // return await axios.patch("http://localhost:3001/Update/"+clearID[1],{
                return await axios.patch("https://components-db-backend.herokuapp.com/Update/"+clearID[1],{
                    codice : componente.codice,
                    codiceCostruttore : componente.codiceCostruttore,
                    descrizione : componente.descrizione,
                    costruttore : componente.costruttore,
                    quantita : componente.quantita,
                    posizione : componente.posizione,
                    rivenditore1 : componente.rivenditore1,
                    rivenditore2 : componente.rivenditore2,
                    rivenditore3 : componente.rivenditore3,
                    note : componente.note,
                    immagine : componente.image
                })
            }
            const formData = new FormData();
            formData.append('dropzone-file',image)
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            };
            async function updateIMG(){
                // return await axios.patch("http://localhost:3001/Upload/" + codice, formData, config)
                return await axios.patch("https://components-db-backend.herokuapp.com/Upload/" + codice, formData, config)
            }

        updateData(componente)
            .then(() => {
                setResponse('Updated Successfully!')
                updateIMG()
                .then(() => setResponse('Successfully Updated, also with image!'))
                .catch(e => setResponse('Error: ' + e.response.data))
            })
            .catch(e => setResponse('Error: ' + e.response.data))
            setShowModal(true);
        } else {
            setResponse('Error: Code, Description and Quantity are mandatory.');
            setShowModal(true);
        }
    }

    const Copy = ()=> {
        navigate.push({
            pathname: '/Details',
            state: componente
        })
    }

    const HtmlTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
      ))(({ }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
          maxWidth: 220,
          border: '2px solid #a78bfa',
        },
      }));

    return (
        <motion.div className="content" initial={Transition.initial} animate={Transition.animate} exit={Transition.exit} transition={Transition.transitionEffect}>
            <form autoComplete="off">
                <div className="grid grid-cols-4 gap-6">
                    <div className="relative z-0 w-full mb-6 group col-span-2">
                        <input type="text" name="codice" className="peer" placeholder=" " value={codice} onChange={(e)=>setCodice(e.target.value)} required/>
                        <label htmlFor="codice">Code</label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group col-span-2">
                        <input type="text" name="codiceCostruttore" className="peer" placeholder=" " value={codiceCostruttore} onChange={(e)=>setCodiceCostruttre(e.target.value)} />
                        <label htmlFor="codiceCostruttore">Manufacturer Code</label>
                    </div>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input type="text" name="descrizione" className="peer" placeholder=" " value={descrizione} onChange={(e)=>setDescrizione(e.target.value)} required/>
                    <label htmlFor="descrizione">Description</label>
                </div>
                <div className="grid grid-cols-5 gap-6">
                    <div className="relative z-0 w-full mb-6 group col-span-3">
                        <input type="text" name="costruttore" className="peer" placeholder=" " value={costruttore} onChange={(e)=>setCostruttore(e.target.value)} />
                        <label htmlFor="costruttore">Manufacturer</label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <input type="text" name="quantita" className="peer" required placeholder=" " value={quantita} onChange={(e)=>{
                            if ((!isNaN(e.target.value) && (e.target.value != " "))){
                                setQuantita(e.target.value)
                            }
                        }} />
                        <label htmlFor="quantita">Quantity</label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <input type="text" name="posizione" className="peer" placeholder=" " value={posizione} onChange={(e)=>setPosizione(e.target.value)} />
                        <label htmlFor="posizione">Ubication</label>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                        <input type="text" name="rivenditore1" className="peer" placeholder=" " value={rivenditore1} onChange={(e)=>setRivenditore1(e.target.value)} />
                        <label htmlFor="rivenditore1">First Reseller</label>
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
                    <div className="relative z-0 w-full mb-6 group col-span-2 ">
                        <label htmlFor="dropzone-file" className="flex flex-col justify-center items-center w-full h-52 bg-gray-200 rounded-lg border-2 border-gray-400 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-slate-800 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-violet-400 hover:border-violet-500 dark:hover:bg-slate-700 ml-20">
                            <div className="flex flex-col justify-center items-center pt-5 pb-6 absolute">
                                <svg className="mb-3 w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">All image file (MAX. 64Kib)</p>
                            </div>
                            <input id="dropzone-file" type="file" className="flex w-full h-full opacity-0 cursor-pointer" accept="image/*" name="dropzone-file" onChange={(e)=>{
                                if (e.target.files[0].size <= 64000){
                                    setImage(e.target.files[0]);
                                    window.document.getElementById('labelimage').value = e.target.files[0].name;
                                } else {
                                    window.document.getElementById('labelimage').classList.add('!text-red-500');
                                    window.document.getElementById('labelimage').value = 'File too big!! the previous one gonna be restored!';
                                    setTimeout(()=>{
                                        window.document.getElementById('labelimage').classList.remove('!text-red-500');
                                    },5000);
                                }
                                }}/>
                        </label>
                        <div className="flex justify-center mt-44">
                            {(immagine) ?
                            <HtmlTooltip title={
                                <React.Fragment>
                                    <img src={`data:image/png;base64,${immagine}`}/>
                                </React.Fragment>
                                }>
                                <input type="text" id='labelimage' className="border-0 !text-violet-400 text-sm text-center" disabled value={(image!="") ? image.name:'Stored Image Preview'}/>
                            </HtmlTooltip>
                            // : <input type="text" id='labelimage' className="border-0 !text-violet-400 text-sm text-center" disabled value='No Image available'/>
                            : <input type="text" id='labelimage' className="border-0 !text-violet-400 text-sm text-center" placeholder="No Image Available" disabled/>
                            }
                        </div>
                    </div>
                </div>
                    <Tooltip title="Edit" TransitionComponent={Zoom}>
                        <button type="button" className="bottone" onClick={Edit}>
                            <svg className="w-6 h-6 dark:fill-white fill-gray-900" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
                                <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd"></path>
                            </svg>
                        </button>
                    </Tooltip>
                    <Tooltip title="Remove" TransitionComponent={Zoom}>
                        <button type="button" className="bottone ml-2" onClick={Remove}>
                            <svg className="w-6 h-6 dark:fill-white fill-gray-900" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path>
                            </svg>
                        </button>
                    </Tooltip>
                    <Tooltip title="Copy" TransitionComponent={Zoom}>
                        <button type="button" className="bottone ml-2" onClick={Copy}>
                            <svg className="w-6 h-6 dark:fill-white fill-gray-900" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z"></path>
                                <path d="M3 8a2 2 0 012-2v10h8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"></path>
                            </svg>
                        </button>
                    </Tooltip>
                    <Modal showModal={showModal} onClose={()=> {
                        setShowModal(false);
                        if (!response.includes("Error")){
                            navigate.push('/Search');
                        }
                        }} response={response} />
            </form>
        </motion.div>
    );
}

export default DetailsID;