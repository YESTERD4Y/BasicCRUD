import { addToast, Alert, Button, DatePicker, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/react";
import { parseAbsoluteToLocal, parseDate } from "@internationalized/date";
import axios from "axios";
import moment from "moment";
import { useState } from "react";
import { urlEmp } from "../config/urls";

function EditEmployee({ row, showModal, setShowModal, fetchData }) {
    const [loading, setLoading] = useState(false);
    const [f_name, setF_name] = useState(row.FIRST_NAME);
    const [l_name, setL_name] = useState(row.LAST_NAME);
    const [department, setDepartment] = useState(row.DEPARTMENT);
    const [date_of_birth, setDate_of_birth] = useState(row.DATE_OF_BIRTH);

    const handleCancel = () => {
        setShowModal({ isOpen: false, row: null });
    }

    const handleSave = async () => {
        try {
            setLoading(true);
            if (f_name.trim() === "" || l_name.trim() === "" || department.trim() === "" || date_of_birth === "") {
                addToast({
                    title: "ไม่สามารถบันทึกข้อมูลได้",
                    description: "กรุณากรอกข้อมูลให้ครบถ้วน และ ไม่เป็นค่าว่าง",
                    variant: "solid",
                    color: "warning",
                });
                return;
            }

            const updateEmp = {
                FIRST_NAME: f_name,
                LAST_NAME: l_name,
                DEPARTMENT: department,
                DATE_OF_BIRTH: new Date(date_of_birth.split("T")[0]).toISOString()
            }

            const response = await axios.put(`${urlEmp}/${row.ID}`, updateEmp)
            if (response.status === 200) {
                addToast({
                    title: "บันทึกข้อมูลสำเร็จ",
                    description: "ข้อมูลพนักงานถูกบันทึกเรียบร้อยแล้ว",
                    variant: "solid",
                    color: "success"
                });
                setShowModal({ isOpen: false, row: null });
                setF_name("");
                setL_name("");
                setDepartment("");
                setDate_of_birth("");
                fetchData();
            }


        } catch (error) {
            console.log(error);
            addToast({
                title: "เกิดข้อผิดพลาด",
                description: "ไม่สามารถบันทึกข้อมูลได้ กรุณาลองใหม่อีกครั้ง",
                variant: "solid",
                color: "danger"
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Modal isOpen={showModal} onClose={handleCancel}
                isDismissable={false}
                classNames={{
                    closeButton: "hidden"
                }}
            >
                <ModalContent>
                    <ModalHeader>
                        <p>แก้ไขข้อมูลพนักงาน {row.FIRST_NAME} {row.LAST_NAME}</p>
                    </ModalHeader>
                    <ModalBody>
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-row gap-2">
                                <Input
                                    label="ชื่อพนักงาน"
                                    size="sm"
                                    labelPlacement="inside"
                                    aria-label="ชื่อพนักงาน"
                                    placeholder={row.FIRST_NAME}
                                    variant="bordered"
                                    value={f_name}
                                    onChange={(e) => setF_name(e.target.value)}
                                />

                                <Input
                                    label="นามสกุลพนักงาน"
                                    size="sm"
                                    labelPlacement="inside"
                                    aria-label="นามสกุลพนักงาน"
                                    placeholder={row.LAST_NAME}
                                    variant="bordered"
                                    value={l_name}
                                    onChange={(e) => setL_name(e.target.value)}
                                />
                            </div>

                            <div className="flex flex-row gap-2">
                                <Input
                                    label="แผนก"
                                    size="sm"
                                    labelPlacement="inside"
                                    aria-label="แผนก"
                                    placeholder={row.DEPARTMENT}
                                    variant="bordered"
                                    value={department}
                                    onChange={(e) => setDepartment(e.target.value)}
                                />

                                <DatePicker
                                    className="max-w-[284px]"
                                    label="Birth date"
                                    defaultValue={parseAbsoluteToLocal(row.DATE_OF_BIRTH)}
                                    variant="bordered"
                                    granularity="day"
                                    showMonthAndYearPickers
                                    onChange={(e) => setDate_of_birth(e.toString())}
                                />
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant="light" color="danger" onPress={handleCancel}>ยกเลิก</Button>
                        <Button variant="solid" color="primary" onPress={handleSave} isLoading={loading}>บันทึกข้อมูล</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default EditEmployee;