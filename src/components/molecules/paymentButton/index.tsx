import { twMerge } from 'tailwind-merge';
import { PAYMENT_TYPE_ID } from '@/config/enum';

type Props = {
  onClick: () => void;
  type: number;
  htmlType?: 'submit' | 'button';
}
export default function PaymentButton({onClick, type, htmlType}: Props) {
  const classSubText = 'font-extrabold uppercase text-2xl text-center mx-auto'
  const classText = 'flex-1 flex flex-col gap-1 text-center p-3 text-center rounded-[10px]'
  const renderItem = () => {
    if (type === 2) {
      return (
        <button
          type={htmlType}
          className={
            twMerge(classText, 'bg-[#f1eb1f] text-[#235d97]')
          }
          onClick={onClick}
        >
          <span
            className={classSubText}
          >
            Mua ngay - Trả sau
          </span>
          <span className={'flex items-center justify-center m-auto'}>
            <img src="https://pc.baokim.vn/platform/img/home-paylater-ngang-small.svg" alt="Minh tu authentic" className={'ml-[5px] h-[20px]'} />
            <img src="https://pc.baokim.vn/platform/img/icon-muadee.svg" alt="Minh tu authentic"  className={'ml-[5px] h-[20px]'}  />
          </span>
        </button>
      );
    } else if (type === 3) {
      return <button
        type={htmlType}
        className={
          twMerge(classText, 'bg-[#288ad6] text-white')
        }
        onClick={onClick}
      >
          <span
            className={classSubText}
          >
            Trả góp qua thẻ
          </span>
        <span className={'flex items-center justify-center m-auto'}>
            Visa, MasterCard, JCB
          </span>
      </button>;
    }
    return <button
      type={htmlType}
      className={
        twMerge(classText, 'bg-primary text-white')
      }
      onClick={onClick}
    >
        <span
          className={twMerge(classSubText)}
        >
          Thanh toán
        </span>
      <span className={'mx-auto'}>(Qua ATM, QR Code, Thẻ ngân hàng ...)</span>
    </button>
  }
  return <>
    {renderItem()}
  </>
}