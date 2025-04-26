import { addToast, Button, DatePicker, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner } from "@heroui/react";
import axios from "axios";
import { useState } from "react";
import { urlEmp } from "../config/urls";


function AddEmployee({ showModal, setShowModal , fetchData }) {
    const [f_name, setF_name] = useState("");
    const [l_name, setL_name] = useState("");
    const [department, setDepartment] = useState("");
    const [birthday, setBirthday] = useState("");

    const [loading, setLoading] = useState(false);

    const handleCancel = () => {
        setShowModal(false);
        setF_name("");
        setL_name("");
        setDepartment("");
        setBirthday("");
    }

    const handleSave = async () => {
        try {
            setLoading(true);

            if (f_name.trim() === "" || l_name.trim() === "" || department.trim() === "" || birthday === "") {
                addToast({
                    title: "ไม่สามารถบันทึกข้อมูลได้",
                    description: "กรุณากรอกข้อมูลให้ครบถ้วน และ ไม่เป็นค่าว่าง",
                    variant: "solid",
                    color: "warning"
                });
                return;
            }

            const newEmp = {
                FIRST_NAME: f_name,
                LAST_NAME: l_name,
                DEPARTMENT: department,
                DATE_OF_BIRTH: new Date(birthday).toISOString()
            }
            const respone = await axios.post(urlEmp, newEmp);
            if (respone.status === 201) {
                addToast({
                    title: "เพิ่มข้อมูลสำเร็จ",
                    description: "ข้อมูลพนักงานถูกเพิ่มเรียบร้อยแล้ว",
                    variant: "solid",
                    color: "success"
                });
                setShowModal(false);
                setF_name("");
                setL_name("");
                setDepartment("");
                setBirthday("");
                fetchData();
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Modal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            size="2xl"
            isDismissable={false}
            classNames={{
                closeButton: "hidden"
            }}
            backdrop="blur"
        >
            <ModalContent>
                <ModalHeader>
                    <p className="font-semibold text-md">เพิ่มข้อมูลพนักงาน</p>
                </ModalHeader>
                <ModalBody>
                    {loading ? <div className="w-full h-full"> <Spinner size="lg" color="primary" /></div> :
                        <div className="w-full p-4 space-y-4 text-nowrap">
                            <div className="flex flex-row items-center gap-2">
                                <Input
                                    placeholder="ชื่อพนักงาน"
                                    aria-label="ชื่อพนักงาน"
                                    className="w-[300px]"
                                    label="ชื่อพนักงาน"
                                    labelPlacement="inside"
                                    variant="underlined"
                                    color="primary"
                                    onChange={(e) => setF_name(e.target.value)}
                                />
                                <Input
                                    placeholder="นามสกุล"
                                    aria-label="นามสกุล"
                                    className="w-[300px]"
                                    label="นามสกุล"
                                    labelPlacement="inside"
                                    variant="underlined"
                                    color="primary"
                                    onChange={(e) => setL_name(e.target.value)}
                                />
                            </div>

                            <div className="flex flex-row items-center gap-2">
                                <Input
                                    placeholder="แผนก"
                                    aria-label="แผนก"
                                    className="w-[300px]"
                                    label="แผนก"
                                    labelPlacement="inside"
                                    variant="underlined"
                                    color="primary"
                                    onChange={(e) => setDepartment(e.target.value)}
                                />

                                <DatePicker
                                    aria-label="วันเกิด"
                                    className="w-[300px]"
                                    variant="underlined"
                                    label="วันเกิด"
                                    labelPlacement="inside"
                                    onChange={(e) => setBirthday(e.toString())}
                                />
                            </div>
                        </div>
                    }
                </ModalBody>
                <ModalFooter>
                    <Button
                        variant="light"
                        color="danger"
                        onPress={handleCancel}
                        isDisabled={loading}
                    >
                        ยกเลิก
                    </Button>
                    <Button
                        variant="solid"
                        color="primary"
                        onPress={handleSave}
                        isLoading={loading}
                    >
                        บันทึกข้อมูล
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default AddEmployee;