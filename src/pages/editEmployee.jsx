import { ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/react";


function EditEmployee({ row, showModal, setShowModal }) {
    return (
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
            <ModalContent>
                <ModalHeader>

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