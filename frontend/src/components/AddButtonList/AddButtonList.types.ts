type ButtonItem = {
    id: string;
    title: string;
    iconName: {
        active: string;
        inactive: string;
    };
    onPress: () => void;
    color: string;
    activeColor: string;
};

type AddButtonListProps = {
    buttons: ButtonItem[];
    focusedId?: string;
};

export default AddButtonListProps;