import React from "react";
import Transition from "./Transition";
import { motion } from 'framer-motion';

const Modal = (modale) => {

    if(!modale.showModal) {
        return null
    }

    if (!modale.response.includes('Error')) {
      return (
              <>
              <motion.div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none" initial={Transition.initial} animate={Transition.animate} exit={Transition.exit} transition={Transition.transitionEffect}>
                  <div className="relative w-auto my-6 mx-auto max-w-md">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full dark:bg-slate-800 bg-gray-200 outline-none focus:outline-none dark:text-gray-300 text-gray-900">
                      {/*header*/}
                      <div className="flex items-start justify-between p-5 border-b border-solid dark:bg-slate-700 bg-gray-300 border-slate-700 dark:border-slate-300 rounded-t">
                        <p className="text-2xl font-semibold">
                          Information
                        </p>
                      </div>
                      {/*body*/}
                      <div className="relative p-3 flex-auto">
                        <p className="my-4 text-green-500 font-semibold text-center pr-10 pl-10">
                          {modale.response}
                        </p>
                      </div>
                      {/*footer*/}
                      <div className="flex items-center justify-end p-4 border-t border-solid dark:bg-slate-700 bg-gray-300 border-slate-700 dark:border-slate-300 rounded-b">
                        <button className="bottone" type="button" onClick={modale.onClose}>
                          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
              </motion.div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
              </>
              )
    } else {
      return (
              <>
              <motion.div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none" initial={Transition.initial} animate={Transition.animate} exit={Transition.exit} transition={Transition.transitionEffect}>
                  <div className="relative w-auto my-6 mx-auto max-w-md">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full dark:bg-slate-800 bg-gray-200 outline-none focus:outline-none dark:text-gray-300 text-gray-900">
                      {/*header*/}
                      <div className="flex items-start justify-between p-5 border-b border-solid dark:bg-slate-700 bg-gray-300 border-slate-700 dark:border-slate-300 rounded-t">
                        <p className="text-2xl font-semibold">
                          Information
                        </p>
                      </div>
                      {/*body*/}
                      <div className="relative p-3 flex-auto">
                        <p className="my-4 text-red-500 font-semibold text-center pr-10 pl-10">
                          {modale.response}
                        </p>
                      </div>
                      {/*footer*/}
                      <div className="flex items-center justify-end p-4 border-t border-solid dark:bg-slate-700 bg-gray-300 border-slate-700 dark:border-slate-300 rounded-b">
                        <button className="bottone" type="button" onClick={modale.onClose} autoFocus>
                          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
              </motion.div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
              </>
      );
    }
}

export default Modal;