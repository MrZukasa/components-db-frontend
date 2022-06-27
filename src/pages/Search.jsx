import { useState } from "react";
import { useHistory } from "react-router-dom";
import Transition from "../Transition";
import { motion } from 'framer-motion';
import {AnimatePresence} from 'framer-motion';
import axios from "axios";
import Modal from "../Modal";
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';


const Search = () => {
    const [reader, setReader] = useState([]);
    const navigate = useHistory();
    const [codice, setCodice] = useState('');
    const [codiceCostruttore, setCodiceCostruttre] = useState('');
    const [descrizione, setDescrizione] = useState('');
    const [costruttore, setCostruttore] = useState('');
    const [quantita,setQuantita] = useState('');
    const [posizione, setPosizione] = useState('');
    const [rivenditore1, setRivenditore1] = useState('');
    const [rivenditore2, setRivenditore2] = useState('');
    const [rivenditore3, setRivenditore3] = useState('');
    const [hidden, setHidden] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [response,setResponse] = useState('');

    const componente = {codice, codiceCostruttore, descrizione, costruttore, quantita, posizione, rivenditore1, rivenditore2, rivenditore3};

    async function readData(e){
      e.preventDefault();
      let all = true;

      Object.keys(componente).forEach(key =>{
        if (componente[key]!=""){
          all = false;
        }
      })

      if (all == false){
        Object.keys(componente).forEach(key =>{
          if (componente[key]==""){
            componente[key] = "*";
          }
        })
      }

      // return await axios.get('http://localhost:3001/Read/',{
      return await axios.get('https://components-db-backend.herokuapp.com/Read/',{
        params:{
          codice : componente.codice,
          codiceCostruttore : componente.codiceCostruttore,
          descrizione : componente.descrizione,
          costruttore : componente.costruttore,
          quantita : componente.quantita,
          posizione : componente.posizione,
          rivenditore1 : componente.rivenditore1,
          rivenditore2 : componente.rivenditore2,
          rivenditore3 : componente.rivenditore3,
        }
      })
        .then((responseData) => setReader(responseData.data))
        .catch((e) => {
          setResponse('Error: ' + e.response.data)
          setShowModal(true);
        })
    }

    const hide = () => {
      const bottoneShow = document.getElementById('show');
      bottoneShow.classList.add('opacity-0');
      setTimeout(() => setHidden(!hidden),100)
      setTimeout(()=> bottoneShow.classList.remove('opacity-0'),800)
    }

    const clear = () => {
      setCodice("");
      setCodiceCostruttre("");
      setDescrizione("");
      setCostruttore("");
      setQuantita("");
      setPosizione("");
      setRivenditore1("");
      setRivenditore2("");
      setRivenditore3("");
    }

    const refresh = () => {
      window.location.reload(false);
    }

    return (
        <motion.div className="content" initial={Transition.initial} animate={Transition.animate} exit={Transition.exit} transition={Transition.transitionEffect}>
          <div id="show" className="flex justify-end mt-2">
          <Tooltip title="Show / Hide Form" TransitionComponent={Zoom}>
            <button type="button" className="bottone opacity-50 hover:opacity-100" onClick={hide}>
              <svg className="w-4 h-4 dark:fill-white fill-gray-900" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                {hidden ? (<><path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd"></path><path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"></path></>)
                 : (<><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"></path></>)}
                </svg>
            </button>
          </Tooltip>
          </div>
          <form onSubmit={readData} autoComplete="off" className="mt-3" id="searchForm">
            <AnimatePresence exitBeforeEnter>
            {hidden &&
            <motion.div initial={{ y: "10%", opacity: 0, scale: 0.8 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: -20, opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}>
                <div className="grid grid-cols-4 gap-6">
                    <div className="relative z-0 w-full mb-6 group col-span-2">
                        <input type="text" name="codice" className="peer" placeholder=" " value={codice} onChange={(e)=>setCodice(e.target.value)}/>
                        <label htmlFor="codice">Code</label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group col-span-2">
                        <input type="text" name="codiceCostruttore" className="peer" placeholder=" " value={codiceCostruttore} onChange={(e)=>setCodiceCostruttre(e.target.value)}/>
                        <label htmlFor="codiceCostruttore">Manufacturer Code</label>
                    </div>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input type="text" name="descrizione" className="peer" placeholder=" " value={descrizione} onChange={(e)=>setDescrizione(e.target.value)}/>
                    <label htmlFor="descrizione">Description</label>
                </div>
                <div className="grid grid-cols-5 gap-6">
                    <div className="relative z-0 w-full mb-6 group col-span-3">
                        <input type="text" name="costruttore" className="peer" placeholder=" " value={costruttore} onChange={(e)=>setCostruttore(e.target.value)}/>
                        <label htmlFor="costruttore">Manufacturer</label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <input type="text" name="quantita" className="peer" placeholder=" " value={quantita} onChange={(e)=>{
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
                <div className="grid grid-cols-1 gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                      <Tooltip title="Search" TransitionComponent={Zoom}>
                        <button type="submit" className="bottone">
                          <svg className="w-6 h-6 dark:fill-white fill-gray-900" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
                          </svg>
                        </button>
                      </Tooltip>
                      <Tooltip title="Clear" TransitionComponent={Zoom}>
                        <button type="button" className="bottone ml-2" onClick={clear}>
                          <svg className="w-6 h-6 dark:fill-white fill-gray-900" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path>
                          </svg>
                        </button>
                      </Tooltip>
                      <Tooltip title="Reload" TransitionComponent={Zoom}>
                        <button type="button" className="bottone ml-2" onClick={refresh}>
                          <svg className="w-6 h-6 dark:fill-white fill-gray-900" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd"></path>
                          </svg>
                        </button>
                      </Tooltip>
                    </div>
                </div>
            </motion.div>}
            </AnimatePresence>
          </form>

          <Modal showModal={showModal} onClose={()=>setShowModal(false)} response={response}/>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-10">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400" id="searchTable">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" className="px-6 py-3">
                            Code
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Manufacturer Code
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Description
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Ubication
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Quantity
                          </th>
                        </tr>
                    </thead>
                    <tbody>
                        {reader.map((value) =>{
                            return [
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer" key={value} onClick={() => navigate.push('/DetailsID/:'+value.ID)}>
                                    <td hidden className="px-6 py-4">{value.ID}</td>
                                    <td className="px-6 py-4">{value.codice}</td>
                                    <td className="px-6 py-4">{value.cod_costruttore}</td>
                                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                        {value.descrizione}
                                    </td>
                                    <td className="px-6 py-4">{value.posizione}</td>
                                    <td className="px-6 py-4">{value.quantita}</td>
                                </tr>
                                ]
                            })}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
}

export default Search;