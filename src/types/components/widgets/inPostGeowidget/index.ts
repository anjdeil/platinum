export interface onPointSelectEvent extends Event {
    detail: InPostPointDetail,
};

export type InPostPointDetail = {
    href: string,
    name: string,
    type: string[],
    status: string,
    location: {
        longitude: number,
        latitude: number
    },
    location_type: string,
    location_date: null,
    location_description: string,
    location_description_1: null,
    location_description_2: null,
    distance: number,
    opening_hours: string,
    address: {
        line1: string,
        line2: string
    },
    address_details: {
        city: string,
        province: string,
        post_code: string,
        street: string,
        building_number: string,
        flat_number: null | string
    },
    phone_number: null | string,
    payment_point_descr: string,
    functions: string[],
    partner_id: number,
    is_next: boolean,
    payment_available: boolean,
    payment_type: null,
    virtual: string,
    recommended_low_interest_box_machines_list: string[],
    apm_doubled: null,
    location_247: boolean,
    operating_hours_extended: {
        customer: null
    },
    agency: string,
    image_url: string,
    easy_access_zone: boolean,
    air_index_level: null,
    physical_type_mapped: string,
    physical_type_description: null
};