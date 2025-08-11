import { useRef } from "react";
import { View } from "react-native";
import Signature from 'react-native-signature-canvas';

type Props = {
    onOk: (signatureDataUrl: string) => void;
};

export default function SignatureField({ onOk }: Props) {
    const ref = useRef(null);

    return (
        <View>
            <Signature
                ref={ref}
                onOK={onOk}
                imageType="image/jpeg"
                onEmpty={() => console.log("No signature")}
                descriptionText="Sign above"
                clearText="Clear"
                confirmText="Save"
                penColor="#111"
                backgroundColor="#fff"
                webStyle={`
                        .m-signature-pad { width: 100%; height: 120px; margin: 0; }
                        .m-signature-pad--body { position: relative; border: 1px solid #ccc; border-radius: 8px; }
                        .m-signature-pad--footer { display: flex; gap: 8px; }
                        canvas { position: absolute; inset: 0; width: 100% !important; height: 100% !important; }
                `}
            />
        </View>
        
    );
}