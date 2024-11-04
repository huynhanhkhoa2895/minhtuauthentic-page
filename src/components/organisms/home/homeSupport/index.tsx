import Image, { StaticImageData } from 'next/image';
import imageQuality from '@/static/images/quality-assurance.png';
import securityInfo from '@/static/images/security-information.png';
import productQuality from '@/static/images/product-quality.png';
import support from '@/static/images/support.png';
export default function HomeSupport() {
  const data: {
    image: {
      url: StaticImageData;
      width: number;
      height: number;
    };
    title: string;
    description: string;
  }[] = [
    {
      title: 'Đảm bảo chất lượng',
      description: 'Cam kết hàng chính hãng Authentic.',
      image: {
        url: imageQuality,
        width: 128,
        height: 128,
      },
    },
    {
      title: 'Chăm sóc khach hàng tốt',
      description: 'Chăm sóc và hỗ trợ khách hàng tận tình.',
      image: {
        url: support,
        width: 128,
        height: 128,
      },
    },
    {
      title: 'Chất lượng thật - Giá trị thật',
      description: 'Giá cả cạnh tranh thị trường.',
      image: {
        url: productQuality,
        width: 128,
        height: 128,
      },
    },
    {
      title: 'Bảo mật thông tin',
      description: 'Giao dịch thông tin khách hàng được bảo mật.',
      image: {
        url: securityInfo,
        width: 128,
        height: 128,
      },
    },
  ];
  return (
    <div
      className={
        'grid grid-cols-2 lg:grid-cols-4 my-20 border border-primary p-10 rounded-[10px] bg-white'
      }
    >
      {data.map((item, index) => {
        return (
          <div key={index} className={'flex gap-3'}>
            <Image
              src={item.image.url || ''}
              className={'object-contain w-[60px] h-auto'}
              width={item.image.width}
              height={item.image.height}
              alt={
                'Minh Tu Authentic, Nước hoa chính hãng Tphcm, Quận Tân Phú, Mỹ phẩm'
              }
            />
            <div>
              <p className={'text-[14px] font-[700] lg:font-bold'}>
                {item.title}
              </p>
              <p className={'mt-1 text-[12px]'}>{item.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
