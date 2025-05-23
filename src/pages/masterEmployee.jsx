import { Button, Card, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";
import axios from "axios";
import { urlEmp } from "../config/urls";
import { useEffect, useState } from "react";
import AddEmployee from "./addEmployee";
import DeleteEmployee from "./deleteEmployee";
import EditEmployee from "./editEmployee";
import moment from "moment";

function MasterEmployee() {

    const [listEmp, setListEmp] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState({isOpen: false , row : null});
    const [showModalEdit , setShowModalEdit] = useState({isOpen: false , row : null});
    const fetchDataEmp = async () => {
        try {
            const response = await axios.get(urlEmp);
            if (response.status === 200) {
                setListEmp(response.data);
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    const handleDelete = (row) => {
        setShowModalDelete({isOpen: true , row : row});
    }

    const handleEdit = (row) => {
        setShowModalEdit({isOpen: true , row : row});
    }

    useEffect(() => {
        fetchDataEmp();
    }, [])



    return (
        <>
            {showModal && <AddEmployee showModal={showModal} setShowModal={setShowModal} fetchData={fetchDataEmp} />}
            {showModalDelete.isOpen && <DeleteEmployee row={showModalDelete.row} showModal={showModalDelete.isOpen} fetchDataEmp={fetchDataEmp} setShowModal={setShowModalDelete} />}
            {showModalEdit.isOpen && <EditEmployee row={showModalEdit.row} showModal={showModalEdit.isOpen} setShowModal={setShowModalEdit} fetchData={fetchDataEmp} />}
            <Card className="w-full h-full container m-auto p-4" shadow="sm">
                <p className="text-lg font-semibold">CRUD Employee</p>
                <div className="flex my-4 w-full justify-end items-center">
                    <Button variant="solid" color="primary" onPress={() => setShowModal(true)}>ADD EMP</Button>
                </div>
                <Table
                    color="primary"
                    selectionMode="single"
                    aria-label="Employee Table"
                    className="w-full"
                    classNames={{
                        th: "bg-primary-500 text-white"
                    }}
                    align="center"
                >
                    <TableHeader>
                        <TableColumn>First Name</TableColumn>
                        <TableColumn>Last Name</TableColumn>
                        <TableColumn>Department</TableColumn>
                        <TableColumn>Date of Birth</TableColumn>
                        <TableColumn></TableColumn>
                    </TableHeader>
                    <TableBody>
                        {listEmp.map((item, index) => {
                            return (
                                <TableRow key={item.ID}>
                                    <TableCell>{item.FIRST_NAME}</TableCell>
                                    <TableCell>{item.LAST_NAME}</TableCell>
                                    <TableCell>{item.DEPARTMENT}</TableCell>
                                    <TableCell>{moment(item.DATE_OF_BIRTH).format("DD/MM/YYYY")}</TableCell>
                                    <TableCell className="space-x-3">
                                        <Button variant="solid" size="sm" color="primary" onPress={() => handleEdit(item)}>Edit</Button>
                                        <Button variant="solid" size="sm" color="danger" onPress={() => handleDelete(item)}>Delete</Button>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </Card>
        </>
    )
}

export default MasterEmployee;
