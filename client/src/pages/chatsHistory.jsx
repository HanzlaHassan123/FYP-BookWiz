import React, { useState, useEffect } from 'react'

import CTA from '../components/CTA'
import InfoCard from '../Cards/InfoCard'
// import ChartCard from '../components/Chart/ChartCard'
// import { Doughnut, Line } from 'react-chartjs-2'
// import ChartLegend from '../components/Chart/ChartLegend'
import PageTitle from '../Typography/PageTitle'
import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon } from '../icons'
import RoundIcon from '../components/RoundIcon'
import response from '../utils/demo/tableData'
import { Button} from '@windmill/react-ui'
import Modals from './Modals'
import { SearchIcon } from '../icons'


import {
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableFooter,
  Avatar,
  Input,
  Badge,
  Pagination,
} from '@windmill/react-ui'
import axios from 'axios'
import { model } from 'mongoose'
import { render } from 'react-dom'
import CreateFolderModal from '../Modals/CreateFolderModal'
import { Alert } from '@windmill/react-ui'

function chatsHistory() {
  const [page, setPage] = useState(1)
  const [data, setData] = useState([])
  const [folders , setFolders] = useState([]);
  const [spin , setSpin] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false)

  function  openModal() {
    setIsModalOpen(true)
  }

  function  closeModal(newFolder) {
    console.log(newFolder)
    if(newFolder){
      setFolders(prevFolders => [...prevFolders, newFolder]);
    }
    setIsModalOpen(false)
  }

  // pagination setup
  const resultsPerPage = 10
  const totalResults = response.length
  // pagination change control
  function onPageChange(p) {
    setPage(p)
  }

  const fetchFolders = async () => {
    setSpin(true);

    try{
      const res = await axios.get('/api/user/folders' , {
        withCredentials: true
      });

      const dT = res.data.payload;
      setFolders(dT);
      console.log(dT);
      setSpin(false);
    }catch(error){
      console.error(error);
      setSpin(false);
    }
  }

  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
    setData(response.slice((page - 1) * resultsPerPage, page * resultsPerPage));
    console.log("home triggered");
    fetchFolders();
  }, [page])

  return (
    <>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    
        {/* <ul className="flex items-center flex-shrink-0 space-x-6"> */}

      <PageTitle>My Folders</PageTitle>
      
      <CreateFolderModal isModelOpen={isModalOpen} closeModal={closeModal}/>
    
    </div>

      {/* <!-- Cards --> */}
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        {spin ? 'Loading....' : (
          folders.length > 0 ?
          (folders.map((folder) => {
            return (
              <InfoCard _folder={folder}>
                <RoundIcon
                  icon={ChatIcon}
                  iconColorClass="text-teal-500 dark:text-teal-100"
                  bgColorClass="bg-teal-100 dark:bg-teal-500"
                  className="mr-4"
                />
              </InfoCard>
            )
          }))
          : (
            <p className="text-gray-700 dark:text-gray-300">
              No Folders Found
            </p>
          )
        )}
      </div>
    </>
  )
}

export default chatsHistory