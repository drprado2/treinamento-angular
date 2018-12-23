import {ButtonType} from "./buttonType.enum";

export class ModalButton {
  type: ButtonType;
  callAction: Function;
  label: string;
}
