import getDefaultSeverSide from '@/utils/getDefaultServerSide';
import { ResponseMenuDto } from '@/dtos/responseMenu.dto';
import { ResponseFooterDto } from '@/dtos/responseFooter.dto';
import Header from '@/components/organisms/header';
import CategoryTemplate from '@/components/templates/CategoryTemplate';
import Footer from '@/components/organisms/footer';
import { InferGetServerSidePropsType } from 'next';
import BrandsTemplate from '@/components/templates/BrandsTemplate';
import BreadcrumbComponent from '@/components/molecules/breakcrumb';
import Layout from '@/components/templates/Layout';
import {STATIC_CONTENT_TYPE} from "@/config/enum";
import {ResponseSlugPageDto} from "@/dtos/responseSlugPage.dto";
import {StaticContentsDto} from "@/dtos/StaticContents.dto";
import StaticContentTemplate from "@/components/templates/StaticContentTemplate";

export const getServerSideProps = async () => {
    const res = await fetch(
        process.env.BE_URL +
        '/api/pages/static-contents/'+STATIC_CONTENT_TYPE.FOOTER_PRIVACY_POLICY
    ).catch((error) => {
        return null;
    });
    const { resMenu, resFooter } = await getDefaultSeverSide();
    const dataMenu: { data: ResponseMenuDto } = resMenu
        ? await resMenu.json()
        : null;
    const dataFooter: { data: ResponseFooterDto } = resFooter
        ? await resFooter.json()
        : null;
    const data: { data: StaticContentsDto } = res
        ? await res.json()
        : null;
    return {
        props: {
            menu: dataMenu?.data,
            footerContent: dataFooter?.data,
            data: data?.data || null,
        },
    };
};
export default function PrivacyPolicy({
                                       menu,
                                       footerContent,
                                        data,
                                   }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <>
            <Header menu={menu} />
            <Layout menu={menu}>
                <BreadcrumbComponent
                    label={'Chinh sách bảo mật'}
                    link={'/chinh-sach-bao-mat'}
                />
                <StaticContentTemplate staticContent={data} />
            </Layout>
            <Footer footerContent={footerContent} />
        </>
    );
}
