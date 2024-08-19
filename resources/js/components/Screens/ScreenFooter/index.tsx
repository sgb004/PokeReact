import { ScreenActions } from "../../../types";
import ButtonAction from "./ButtonAction";

type ScreenFooterProps = {
    actions: ScreenActions[];
};

const ScreenFooter = ({ actions }: ScreenFooterProps) => (
    <footer>
        {actions.map((action, index) => (
            <ButtonAction
                key={action.name}
                action={action}
                className={`bottom-[${index * 50 + 10}px]`}
            />
        ))}
    </footer>
);

export default ScreenFooter;
