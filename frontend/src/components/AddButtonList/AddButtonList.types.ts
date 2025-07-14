type ButtonItem = {
    id: string;
    title: string;
    iconName: string;
    onPress: () => void;
};

type AddButtonListProps = {
    buttons: ButtonItem[];
};

export default AddButtonListProps;