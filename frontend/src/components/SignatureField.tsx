import { useRef } from "react";
import { View } from "react-native";
import Signature from 'react-native-signature-canvas';

type Props = {
    onOk: (signatureDataUrl: string) => void;
};

export default function SignatureField({ onOk }: Props) {
    const ref = useRef(null);

    return (
        <View style={{ height: 200, width: "100%" }}>
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
                style={{ height: "100%", width: "100%" }}
                webStyle={`
                    html, body { height: 100%; margin: 0; padding: 0; }
                    .m-signature-pad {
                        width: 90%;
                        height: 80%;
                        margin: 0;
                        display: flex;
                        flex-direction: column;
                        margin: 0 auto;
                    }
                    .m-signature-pad--body {
                        position: relative;
                        flex: 1; /* canvas grows to fill */
                        border: 1px solid #ccc;
                        border-radius: 8px;
                        overflow: hidden;
                    }
                    .m-signature-pad--footer {
                        display: flex;
                        align-items: center;
                        flex-direction: row;
                        justify-content: space-around;
                    }
                    .m-signature-pad--footer .button {
                        padding: 8px 12px;
                        border-radius: 6px;
                        font-size: 14px;
                        line-height: 18px;
                    }
                    .m-signature-pad--footer .button.save {
                        background: #8ecae6;
                        color: #fff;
                    }
                    .m-signature-pad--footer .button.clear {
                        background: transparent;
                        color: #111;
                        border: 1px solid #8ecae6;
                    }
                    canvas {
                        position: absolute;
                        inset: 0;
                        width: 100% !important;
                        height: 100% !important;
                    }
                `}
            />
        </View>
        
    );
}