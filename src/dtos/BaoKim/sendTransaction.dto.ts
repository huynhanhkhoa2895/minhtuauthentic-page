export default class SendTransactionBaoKimDto {
  mrc_order_id?: string;
  total_amount?: number;
  description?: string;
  url_success?: string;
  merchant_id?: number;
  url_detail?: string;
  webhooks?: string;

  constructor(init?: Partial<SendTransactionBaoKimDto>) {
    Object.assign(this, init);
  }
}
