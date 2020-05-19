import { Icon } from "../../hooks/useIconManager";

export interface ISelectInput {
  id: string;
  value: string;
  checked?: boolean;
  disabled?: boolean;
  name: string;
  className: string;
  handleChange?: () => void;
  iconType?: Icon;
  labelType?: string;
}
