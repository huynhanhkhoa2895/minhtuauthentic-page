import Link from 'next/link';

export default function AccountTemplate(){
  return (
    <>
      <h1 className={'text-3xl text-primary font-bold my-6'}>Tài khoản</h1>
      <div className={'w-full grid grid-cols-1 lg:grid-cols-4 gap-3'}>
        <ul>
          <li className={'border border-gray-200 p-3 transition-colors duration-500 font-semibold hover:bg-primary hover:text-white'}>
            <Link className={'text-lg'} href={'/tai-khoan/lich-su'}>Lịch sử mua hàng</Link>
          </li>
        </ul>
        <div className={'col-span-3'}>Content</div>
      </div>
    </>

  )
}