import { ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/react";


function EditEmployee({ row, showModal, setShowModal }) {
    return (
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
            <ModalContent>
                <ModalHeader>
                    <p>แก้ไขข้อมูลพนักงาน {row.FIRST_NAME} {row.LAST_NAME}</p>
                </ModalHeader>
                <ModalBody>

                </ModalBody>
                <ModalFooter>

                </ModalFooter>
            </ModalContent>

        </Modal>
    )
}

export default EditEmployee;