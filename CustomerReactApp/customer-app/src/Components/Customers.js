import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { sortFunctionEmail, sortFunctionName, sortFunctionPhone } from "../SortFunctions/SortFunctions"
import '../Styles/Customers.css'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, InputGroup } from 'reactstrap';
import { TableStyles } from '../Styles/TableStayle';
import { Edit, Trash, Home, Divide } from 'react-feather';

const Customers = () => {

    // Var Declarations
    const [fetchedData, setFetchedData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [searchBar, setSearchBar] = useState("")
    const [isCustomerMoadalOpen, setIsCustomerModalOpen] = useState(false)
    const [isCustomerAddressMoadalOpen, setIsCustomerAddressModalOpen] = useState(false)
    const [addressCreationModal, setAddressCreationModalOpen] = useState(false)
    const [addresses, setAddresses] = useState([])
    const [inputPhone, setInputPhone] = useState("")
    const [inputEmail, setInputEmail] = useState("")
    const [inputName, setInputName] = useState("")
    const [addInput, setAddInput] = useState("")
    const [cityInput, setCityInput] = useState("")
    const [zipInput, setZipInput] = useState("")
    const [customerId, setCustomerId] = useState()
    const [isEdit, setIsEdit] = useState()

    // Table Columns
    const columns = [
        {
            name: "Name",
            selector: (row) => {
                return row.name
            },
            sortFunction: sortFunctionName
        },
        {
            name: "Email",
            selector: (row) => {
                return row.email
            },
            sortFunction: sortFunctionEmail
        },
        {
            name: "Phone",
            selector: (row) => {
                return row.phone
            },
            sortFunction: sortFunctionPhone
        },
        {
            name: "Actions",
            selector: (row) => {
                return (<div>
                    <Edit color="orange" onClick={() => {
                        EditHandler(row)
                    }} />
                    <Trash color='red' onClick={() => {
                        DeleteHandler(row.customerId)
                    }} />
                </div>)
            }
        }
    ]

    const addresssColumns = [
        {
            name: "Address",
            selector: (row) => {
                return row.address
            }
        },
        {
            name: "City",
            selector: (row) => {
                return row.city
            }
        },
        {
            name: "ZipCode",
            selector: (row) => {
                return row.zipCode
            }
        },
        {
            name: "Actions",
            selector: (row) => {
                return (<div>
                    <Trash color='red' onClick={() => {
                        DeleteAddressHandler(row)
                    }} />
                </div>)
            }
        }
    ]

    // Fetching Functions
    const FetchCustomers = async () => {

        try {
            const response = await fetch('/api/customers');
            if (!response.ok) {
                throw new Error('Failed to fetch customers');
            }
            const respjson = await response.json();
            setFetchedData(respjson)

        } catch (error) {
            console.log(error)
            console.error('Failed to get customers:', error);
            throw error;
        }


    }

    // Save Cusomter
    const SaveCustomer = async () => {
        try {

            if (!inputName.length) {
                console.log("Please insert a valid name...")
            } else if (!inputEmail.length) {
                console.log("Please insert a valid email...")
            } else if (!inputPhone) {
                console.log("Please insert a valid phone...")
            } else {

                const customer = {
                    CustomerId: 0,
                    Name: inputName,
                    Email: inputEmail,
                    Phone: inputPhone,
                    CustomerAddresses: addresses
                }

                const response = await fetch('/api/customers', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(customer),
                });
                if (!response.ok) {
                    throw new Error('Failed to add customer');
                }
                const respJson = await response.json();
                FetchCustomers()
                ClearInputs()
                ToggleCustomerModal()

            }
        } catch (error) {
            console.error('Failed to add customer:', error);
            throw error;
        }
    }

    // Update Customer 
    const UpdateCustomer = async () => {
        try {
            if (customerId > 0) {

                const customer = {
                    CustomerId: customerId,
                    Name: inputName,
                    Email: inputEmail,
                    Phone: inputPhone,
                    CustomerAddresses: addresses
                }

                const response = await fetch(`/api/customers/${customerId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(customer),
                });
                if (!response.ok) {
                    throw new Error(`Failed to update customer with ID ${customerId}`);
                }
                ClearInputs()
                FetchCustomers()
                ToggleCustomerModal()
            }
            else {
                console.log("CustomerId = 0 ")
            }

        } catch (error) {
            console.error(`Failed to update customer with ID ${customerId}:`, error);
            throw error;
        }
    }

    // Action Handlers
    const AddCustomerHandler = () => {
        setIsCustomerModalOpen(true)
    }

    const searchbarHandler = (e) => {
        setSearchBar(e.target.value)

    }

    const EditHandler = (row) => {
        setCustomerId(row.customerId)
        setInputName(row.name)
        setInputEmail(row.email)
        setInputPhone(row.phone)
        setAddresses(row.customerAddresses)
        setIsEdit(true)
        setIsCustomerModalOpen(true)
    }

    const AddressHandler = () => {
        setIsCustomerAddressModalOpen(true)
    }

    const AddAddressHandler = () => {
        setAddressCreationModalOpen(true)
    }

    const DeleteHandler = async (id) => {
        if (id > 0) {
            try {
                const response = await fetch(`/api/customers/${id}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    throw new Error(`Failed to delete customer with ID ${id}`);
                }
                FetchCustomers()
            } catch (error) {
                console.error(`Failed to delete customer with ID ${id}:`, error);
                throw error;
            }
        }
        else {
            console.log("Customer id <= 0")
        }

    }

    const DeleteAddressHandler = (row) => {
        const filteredArray = addresses.filter(item => item.customerAddressId !== row.customerAddressId);
        setAddresses(filteredArray)
    }

    const AddAddress = () => {
        const newAddresses = [...addresses]
        newAddresses.push({
            customerAddressId: 0,
            address: addInput,
            city: cityInput,
            zipCode: zipInput,
            customerId: 0
        })
        setAddresses(newAddresses)
        ToggleAddressCreationModal()
        setAddInput("")
        setCityInput("")
        setZipInput("")
    }

    const ClearInputs = () => {
        setInputName("")
        setInputEmail("")
        setInputPhone("")
        setCustomerId()
        setAddresses([])
    }

    // Toggle Functions
    const ToggleCustomerModal = () => {
        ClearInputs()
        setIsCustomerModalOpen(!isCustomerMoadalOpen)
        setIsEdit(false)
    }

    const ToggleCustomerAddressModal = () => {

        setIsCustomerAddressModalOpen(!isCustomerAddressMoadalOpen)
    }

    const ToggleAddressCreationModal = () => {

        setAddressCreationModalOpen(!addressCreationModal)
    }

    // Hooks
    useEffect(() => {
        FetchCustomers()
    }, [])

    useEffect(() => {

        const filteredArray = []
        fetchedData.map(item => {
            if (item.name.toLowerCase().includes(searchBar.toLowerCase()) ||
                item.email.toLowerCase().includes(searchBar.toLowerCase()) ||
                item.phone.toLowerCase().includes(searchBar.toLowerCase())) {
                filteredArray.push(item)
            }
        })

        setFilteredData(filteredArray)
    }, [searchBar])

    return (
        <div
            id="wrapper">

            <div
                id="searchWrapper">
                <Input
                    id='searchbarInput'
                    type='text'
                    placeholder='Searchbar...'
                    onChange={searchbarHandler}
                />
            </div>

            <div
                id="tableWrapper">
                <DataTable
                    columns={columns}
                    data={searchBar.length ? filteredData : fetchedData}
                    customStyles={TableStyles}
                />
            </div>

            <div
                id="btnWrapper">
                <Button
                    id='addBtn'
                    onClick={AddCustomerHandler}
                >
                    +
                </Button>
            </div>

            <Modal isOpen={isCustomerMoadalOpen} toggle={ToggleCustomerModal}>
                <ModalHeader toggle={ToggleCustomerModal}>Customer</ModalHeader>
                <ModalBody>
                    <Label> Name : </Label>
                    <Input type="text" id="name" placeholder="Insert Name" value={inputName} onChange={(e) => { setInputName(e.target.value) }} />
                    <Label> Email : </Label>
                    <Input type="text" id="email" placeholder="Insert Email" value={inputEmail} onChange={(e) => { setInputEmail(e.target.value) }} />
                    <Label> Phone : </Label>
                    <Input type="text" id="phone" placeholder="Insert Phone" value={inputPhone} onChange={(e) => { setInputPhone(e.target.value) }} />

                    <Label> Addresses : </Label>
                    <br />
                    <Button onClick={AddressHandler}>Addresses <Home color='white' /> </Button>
                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={!isEdit ? SaveCustomer : UpdateCustomer}>
                        {isEdit ? "Update" : "Create"}
                    </Button>
                    <Button color="danger" onClick={ToggleCustomerModal}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={isCustomerAddressMoadalOpen} toggle={ToggleCustomerAddressModal}>
                <ModalHeader toggle={ToggleCustomerAddressModal}>Addresses</ModalHeader>
                <ModalBody>

                    <DataTable
                        columns={addresssColumns}
                        data={addresses}
                        customStyles={TableStyles}
                    />
                    <div
                        id="btnAdressWrapper">
                        <Button
                            id='addAddressBtn'
                            onClick={AddAddressHandler}
                        >
                            +
                        </Button>
                    </div>

                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={ToggleCustomerAddressModal}>
                        Back
                    </Button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={addressCreationModal} toggle={ToggleAddressCreationModal}>
                <ModalHeader toggle={ToggleAddressCreationModal}>Addresses</ModalHeader>
                <ModalBody>

                    <Label> Address : </Label>
                    <Input type="text" id="address" placeholder="Insert Address" value={addInput} onChange={(e) => { setAddInput(e.target.value) }} />
                    <Label> City : </Label>
                    <Input type="text" id="city" placeholder="Insert City" value={cityInput} onChange={(e) => { setCityInput(e.target.value) }} />
                    <Label> Zip Code : </Label>
                    <Input type="text" id="zipCode" placeholder="Insert Zip Code" value={zipInput} onChange={(e) => { setZipInput(e.target.value) }} />

                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={AddAddress}>
                        Save Address
                    </Button>
                    <Button color="danger" onClick={() => {
                        setAddInput("")
                        setCityInput("")
                        setZipInput("")
                        ToggleAddressCreationModal()
                    }}>
                        Back
                    </Button>
                </ModalFooter>
            </Modal>

        </div >
    )
}

export default Customers