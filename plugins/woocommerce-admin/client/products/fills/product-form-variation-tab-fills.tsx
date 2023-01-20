/**
 * External dependencies
 */
import { registerPlugin } from '@wordpress/plugins';
import {
	__experimentalWooProductTabItem as WooProductTabItem,
	__experimentalWooProductSectionItem as WooProductSectionItem,
	useFormContext,
} from '@woocommerce/components';
import { PartialProduct, Product } from '@woocommerce/data';
import { useMemo } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { AttributesSection } from '../sections/attributes-section';
import { PricingSection } from '../sections/pricing-section';
import { ProductInventorySection } from '../sections/product-inventory-section';
import { ProductShippingSection } from '../sections/product-shipping-section';
import { OptionsSection } from '../sections/options-section';
import { ProductVariationsSection } from '../sections/product-variations-section';
import { TAB_GENERAL_ID } from './constants';
import { ProductVariationDetailsSection } from '../sections/product-variation-details-section';

const tabPropData = {
	general: {
		name: 'general',
		title: 'General',
	},
	pricing: {
		name: 'pricing',
		title: 'Pricing',
	},
	inventory: {
		name: 'inventory',
		title: 'Inventory',
	},
	shipping: {
		name: 'shipping',
		title: 'Shipping',
	},
	options: {
		name: 'options',
		title: 'Options',
	},
};

const Tabs = () => {
	return (
		<>
			<WooProductTabItem
				id={ 'new-tab-id' }
				location="tab/variation"
				pluginId="core"
				order={ 1 }
				tabProps={ tabPropData.general }
			>
				<ProductVariationDetailsSection />
			</WooProductTabItem>
			<WooProductTabItem
				id={ 'tab/pricing' }
				location="tab/variation"
				pluginId="core"
				order={ 3 }
				tabProps={ tabPropData.pricing }
			>
				<PricingSection />
			</WooProductTabItem>
			<WooProductTabItem
				id={ 'tab/inventory' }
				location="tab/variation"
				pluginId="core"
				order={ 5 }
				tabProps={ tabPropData.inventory }
			>
				<ProductInventorySection />
			</WooProductTabItem>
			<WooProductTabItem
				id={ 'tab/shipping' }
				location="tab/variation"
				pluginId="core"
				order={ 7 }
				tabProps={ tabPropData.shipping }
			>
				{ ( product: PartialProduct ) => (
					<ProductShippingSection product={ product } />
				) }
			</WooProductTabItem>
		</>
	);
};

/**
 * Preloading product form data, as product pages are waiting on this to be resolved.
 * The above Form component won't get rendered until the getProductForm is resolved.
 */
registerPlugin( 'wc-admin-product-editor-form-variation-tab-fills', {
	// @ts-expect-error 'scope' does exist. @types/wordpress__plugins is outdated.
	scope: 'woocommerce-product-editor',
	render: () => {
		return <Tabs />;
	},
} );
