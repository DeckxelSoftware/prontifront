export interface ModalComponent {
    enableButton: (value: boolean) => void;
    closeModal: () => void;
    clearForm: () => void;
}