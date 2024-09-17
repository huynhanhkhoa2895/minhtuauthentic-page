import { hashVNPAY } from '@/utils/vnpay';

export const getServerSideProps = async ({ req, res, resolvedUrl, query }) => {
  const vnp_Params = query;
  const secureHash = vnp_Params['vnp_SecureHash'];
  if (vnp_Params?.vnp_SecureHashType) {
    delete vnp_Params['vnp_SecureHashType'];
  }
  if (vnp_Params?.vnp_SecureHash) {
    delete vnp_Params['vnp_SecureHash'];
  }
  const signed = hashVNPAY(vnp_Params);
  res.setHeader('Content-Type', 'application/json');
  if (secureHash === signed) {
    res.writeHead(200);
    res.write(JSON.stringify({ RspCode: '00', Message: 'success' }));
  } else {
    res.writeHead(500);
    res.write(JSON.stringify({ RspCode: '97', Message: 'Fail checksum' }));
  }
  res.end();
  return {
    props: {},
  };
};
export default function Ipn() {
  return <></>;
}
