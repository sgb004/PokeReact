import { ScreenActions } from "../../../types";
import ButtonAction from "./ButtonAction";

type ScreenFooterProps = {
    actions: ScreenActions[];
};

const ScreenFooter = ({ actions }: ScreenFooterProps) => (
    <footer>
        {actions.map((action, index) => (
            <ButtonAction key={action.name} action={action} position={index} />
        ))}
    </footer>
);

export default ScreenFooter;
