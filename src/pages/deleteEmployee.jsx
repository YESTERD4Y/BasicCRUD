import { addToast, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/react";
import axios from "axios";
import { useState } from "react";
import { urlEmp } from "../config/urls";


function DeleteEmployee({ row, showModal, setShowModal , fetchDataEmp }) {
    const [loading, setLoading] = useState(false);

    const handleCancel = () => {
        setShowModal(false);
    }
    
    const handleDelete = async () => {
        try {
            setLoading(true);
            const response = await axios.delete(`${urlEmp}/${row.ID}`);
            if (response.status === 200) {
                setShowModal({isOpen: false , row : null});
                addToast({
                    title: "ลบข้อมูลสำเร็จ",
                    description: "ข้อมูลพนักงานถูกลบเรียบร้อยแล้ว",
                    variant: "solid",
                    color: "success"
                });
                fetchDataEmp();
            }
        }catch(err){
            console.log(err);
        }finally{
            setLoading(false);
        }
    }
    return (
        <Modal isOpen={showModal} onClose={() => setShowModal({isOpen: false , row : null})} backdrop="blur" isDismissable={false}>
            <ModalContent>
                <ModalHeader>
                    <p>ยืนยันการลบข้อมูลพนักงาน</p>
                </ModalHeader>
                <ModalBody>
                    <p className="text-danger-600 font-bold text-xl">คุณแน่ใจที่จะลบข้อมูลพนักงานคนนี้หรือไม่ {row.FIRST_NAME} {row.LAST_NAME}</p>
                </ModalBody>
                <ModalFooter>
                    <Button variant="light" color="danger" onPress={handleCancel} isDisabled={loading}>ยกเลิก</Button>
                    <Button variant="solid" color="danger" onPress={handleDelete} isLoading={loading}>ยืนยันการลบข้อมูลพนักงาน</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default DeleteEmployee;
