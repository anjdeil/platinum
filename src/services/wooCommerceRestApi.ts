import WooCommerceRestApi, {
  WooCommerceRestApiVersion,
} from '@woocommerce/woocommerce-rest-api';

const wooCommerceRestApi = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WP_URL || '',
  consumerKey: process.env.WOO_CONSUMER_KEY || '',
  consumerSecret: process.env.WOO_CONSUMER_SECRET || '',
  version:
    (process.env.WOO_REST_API_VERSION as WooCommerceRestApiVersion) ||
    ('wc/v3' as WooCommerceRestApiVersion),
});
export default wooCommerceRestApi;
