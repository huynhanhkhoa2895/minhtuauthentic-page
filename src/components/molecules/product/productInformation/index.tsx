import { ProductDto } from '@/dtos/Product.dto';
import { SexName } from '@/utils';

type Props = {
  product: ProductDto;
};
export default function ProductInformation({ product }: Props) {
  const fields = [
    {
      label: 'Thương hiệu',
      value: (
        <span className={'text-primary font-bold'}>
          {product?.product_property?.fragrance_level}
        </span>
      ),
    },
    {
      label: 'Giới tính',
      value: (
        <span className={'font-bold'}>
          {SexName(product?.product_property?.sex || 2)}
        </span>
      ),
    },
    {
      label: 'Nhà pha chế',
      value: (
        <span className={'font-bold'}>{product?.product_property?.mixer}</span>
      ),
    },
    {
      label: 'Độ toả hương',
      value: (
        <span className={'font-bold'}>
          {product?.product_property?.fragrance_level}
        </span>
      ),
    },
    {
      label: 'Nồng độ',
      value: (
        <span className={'font-bold'}>
          {product?.concentration_gradient?.name}
        </span>
      ),
    },
    {
      label: 'Năm ra mắt',
      value: (
        <span className={'font-bold'}>{product?.product_property?.year}</span>
      ),
    },
    {
      label: 'Độ tỏa hương',
      value: (
        <span className={'font-bold'}>
          {product?.product_property?.fragrance_level}
        </span>
      ),
    },
    {
      label: 'Phong cách',
      value: (
        <span className={'font-bold'}>{product?.product_property?.style}</span>
      ),
    },
    {
      label: 'Khuyên dùng',
      value: (
        <span className={'font-bold'}>
          {product?.product_property?.recommend}
        </span>
      ),
    },
    {
      label: 'Xuất xứ',
      value: (
        <span className={'font-bold'}>{product?.product_property?.origin}</span>
      ),
    },
  ];

  return (
    <div className={'rounded-[10px] shadow-custom bg-white'}>
      <h3 className={'font-bold text-primary text-[24px] p-3'}>
        Thông tin sản phẩm
      </h3>
      <table className={'w-full'}>
        <tbody>
          {fields.map((item, index) => {
            return (
              <tr
                className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
                key={index}
              >
                <td className={'p-3'}>{item.label}</td>
                <td>{item.value}</td>
              </tr>
            );
          })}
          <tr className={'bg-gray-100'}>
            <td className={'p-3'} colSpan={2}>
              <span>Mùi hương</span>
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <div
                className={'p-3'}
                dangerouslySetInnerHTML={{
                  __html: product?.product_property?.fragrant || '',
                }}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
