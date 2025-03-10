import {createPortal} from "react-dom";
import PaymentButton from "@/components/molecules/paymentButton";
import {isMobile} from "react-device-detect";


type Props = {
    paymentType?: string;
    setValue?: any;
}

export default function FooterCheckout({
    paymentType,
    setValue
}: Props){
    return <>
        {
            isMobile && createPortal(
                <div className={'fixed bottom-0 w-[100dvw] z-10 shadow-custom2 bg-transparent'}>
                    <PaymentButton
                        onClick={() => {
                            setValue('payment_type_id', undefined);
                        }}
                        type={paymentType}
                        htmlType={'submit'}
                        className={'w-full'}
                    />
                </div>, document.body
            )
        }
    </>
}
