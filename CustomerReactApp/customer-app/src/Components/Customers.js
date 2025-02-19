import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { sortFunctionEmail, sortFunctionName, sortFunctionPhone } from "../SortFunctions/SortFunctions"
import '../Styles/Customers.css'

const Customers = () => {

    // Var Declarations
    const [fetchedData, setFetchedData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [isCustomerMoadalOpen, setIsCustomerModalOpen] = useState(false)
    const [isCustomerAddressMoadalOpen, setIsCustomerAddressModalOpen] = useState(false)

    // Table Columns
    const columns = [
        {
            name: "Name",
            selector: (row) => {
                return row.Name
            },
            sortFunction: sortFunctionName
        },
        {
            name: "Email",
            selector: (row) => {
                return row.Email
            },
            sortFunction: sortFunctionEmail
        },
        {
            name: "Phone",
            selector: (row) => {
                return row.Phone
            },
            sortFunction: sortFunctionPhone
        }
    ]

    // Fetching Functions
    const FetchCustomers = () => {
        // Get Customers
        setFetchedData([])
    }

    // Action Handlers
    const AddCustomerHandler = () => {
        setIsCustomerModalOpen(true)
    }

    const searchbarHandler = (e) => {

        const value = e.target.value

        const filteredArray = fetchedData.filter(item => item.toLowerCase().includes(value.toLowerCase()))

        setFilteredData(filteredArray)
    }

    // Hook to fetch customers
    useEffect(() => {
        FetchCustomers()
    }, [])

    return (
        <div
            id="wrapper">

            <input
                type='text'
                onChange={searchbarHandler}
            />

            <DataTable
                columns={columns}
                data={filteredData.length ? filteredData : fetchedData}
            />

            <button
                id='addBtn'
                onClick={AddCustomerHandler}
            >
                +
            </button>
        </div>
    )
}

export default Customers