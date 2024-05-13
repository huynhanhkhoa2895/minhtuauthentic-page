import Logo from '@/static/images/logo.png';
import LogoBCT from '@/static/images/icon-bct.png';
import LogoGrn from '@/static/images/DMCA_logo-grn-btn100w.png';
import Image from 'next/image';
import { StaticContentsDto } from '@/dtos/StaticContents.dto';
import { STATIC_CONTENT_TYPE } from '@/config/enum';
import Link from 'next/link';
import { orderBy } from 'lodash';
import { ResponseFooterDto } from '@/dtos/responseFooter.dto';
const Footer = ({ footerContent }: { footerContent: ResponseFooterDto }) => {
  const renderFooter = (item: StaticContentsDto, index: number) => {
    switch (index) {
      case 0:
        return (
          <div key={item.id}>
            <p className={'uppercase font-bold mb-[10px] text-[16px]'}>
              VỀ CHÚNG TÔI
            </p>
            <div
              className={'mt-[12px]'}
              dangerouslySetInnerHTML={{ __html: item.content || '' }}
            />
          </div>
        );
      case 1:
      case 2:
        return (
          <div key={item.id}>
            <h4 className={'uppercase font-semibold text-[16px]'}>
              {item.title}
            </h4>
            <div
              className={'mt-[12px]'}
              dangerouslySetInnerHTML={{ __html: item.content || '' }}
            />
          </div>
        );
      case 3:
        return (
          <div key={item.id}>
            <h4 className={'uppercase font-semibold text-[16px]'}>
              {item.title}
            </h4>
            <div
              className={'mt-[12px]'}
              dangerouslySetInnerHTML={{ __html: item.content || '' }}
            />
          </div>
        );
    }
  };

  return (
    <footer className={'relative z-[3]'}>
      <div className={'bg-primaryGrey '}>
        <div className={'container mx-auto '}>
          <div className={'flex justify-between w-full pt-[35px]'}>
            {orderBy(footerContent?.footer || [], 'sort').map((item, index) => {
              return renderFooter(item, index);
            })}
          </div>
          <div className={'grid grid-cols-3 mt-3'}>
            <Image
              src={Logo}
              priority={true}
              height={54}
              width={288}
              className={'object-contain w-auto h-auto'}
              alt={
                'Minh Tu Authentic, Nước hoa chính hãng Tphcm, Quận Tân Phú, Mỹ phẩm'
              }
            />
            <div>
              <p className={'uppercase font-bold mb-[10px]'}>
                Kết nối với chúng tôi
              </p>
              <div className={'grid grid-cols-4 w-max gap-3'}>
                {footerContent &&
                  footerContent[STATIC_CONTENT_TYPE.FOOTER_LOGO_SOCIAL]?.map(
                    (item: StaticContentsDto, index: number) => {
                      const image = item?.images?.[0]?.image;
                      if (!image) return null;
                      return (
                        <div
                          key={index}
                          className={'w-[42px] h-[42px] overflow-hidden'}
                        >
                          <Link href={item?.title || ''} target={'_blank'}>
                            <Image
                              src={image.url || ''}
                              className={'object-contain w-full'}
                              width={image.width}
                              height={image.height}
                              alt={image?.alt || 'minhtuauthentic'}
                            />
                          </Link>
                        </div>
                      );
                    },
                  )}
              </div>
            </div>
            <div>
              <p className={'uppercase font-bold mb-[10px]'}>
                Hình thức thanh toán
              </p>
              <div className={'grid grid-cols-4 w-max gap-3'}>
                {footerContent &&
                  footerContent[STATIC_CONTENT_TYPE.FOOTER_LOGO_PAYMENT]?.map(
                    (item: StaticContentsDto, index: number) => {
                      const image = item?.images?.[0]?.image;
                      if (!image) return null;
                      return (
                        <div
                          key={index}
                          className={'w-[42px] h-[42px] overflow-hidden'}
                        >
                          <Link href={item?.title || ''} target={'_blank'}>
                            <Image
                              src={image.url || ''}
                              className={'object-contain w-full'}
                              width={image.width}
                              height={image.height}
                              alt={image?.alt || 'minhtuauthentic'}
                            />
                          </Link>
                        </div>
                      );
                    },
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={'bg-[#ededed]'}>
        <div
          className={
            'container mx-auto flex py-[12px] w-full justify-between items-center'
          }
        >
          <p className={'py-2'}>
            Copyright ©2024 <b>MINH TU AUTHENTIC</b> . Phát triển bởi{' '}
            <b>Khoa Huynh</b>
          </p>
          <div className={'flex items-center gap-3'}>
            <Link
              href={'http://online.gov.vn/Home/WebDetails/100324'}
              target={'_blank'}
            >
              <Image
                src={LogoBCT}
                priority={true}
                height={57}
                width={188}
                className={'object-contain w-auto h-auto'}
                alt={
                  'Minh Tu Authentic, Nước hoa chính hãng Tphcm, Quận Tân Phú, Mỹ phẩm'
                }
              />
            </Link>
            <Link
              href={
                'https://www.dmca.com/Protection/Status.aspx?ID=095b6ac8-caa8-43b5-a6d2-4243cecf6d5e&refurl=https://minhtuauthentic.com/'
              }
              target={'_blank'}
            >
              <Image
                src={LogoGrn}
                priority={true}
                height={54}
                width={118}
                className={'object-contain w-[118px] h-[27px]'}
                alt={
                  'Minh Tu Authentic, Nước hoa chính hãng Tphcm, Quận Tân Phú, Mỹ phẩm'
                }
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
