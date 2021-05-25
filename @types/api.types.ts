export type PaymentMethod = 'Card' | 'Cheque' | 'Cash';
export type OrderStatus =
  | 'Pending'
  | 'Confirmed'
  | 'Photos Taken'
  | 'Published'
  | 'Collected'
  | 'Done'
  | 'Cancelled'
  | 'Waiting Payment';
export type Tables = 'Links' | 'Clients' | 'Orders' | 'Reps' | 'Featured';
export type Products = 'CLASSIC' | 'SPECIAL';
export type Language = 'EN' | 'FR';
export interface Fields {
  Links: {
    Name: number;
    Order: string[];
    Photos: string;
    Client: string;
    Status: 'Pending' | 'Sent';
  };
  Clients: {
    Client: string;
    Decider: string;
    Address: string;
    'Primary Contact': string;
    'Secondary Contact': string;
    Email: string;
    Order: string[];
    Time: string;
    Language: Language;
    Featured: string[];
  };
  Orders: {
    'Order Number': string;
    Date: string;
    Time: string;
    'Payment Method': PaymentMethod;
    'Product Name': string;
    'Rep ID': string[];
    Clients: string[];
    'Additional Info': string;
    Status: OrderStatus;
    Deposit: boolean;
    Paid: boolean;
    Timestamp: string;
    'Rep Pay': boolean;
    'Photographer Pay': boolean;
    Links: string[];
  };
  Reps: {
    RepID: string;
    'Primary Contact': string;
    Email: string;
    Name: string;
    Orders: string[];
  };
  Featured: {
    Name: string;
    Client: string[];
    Category: string;
    Created: string;
    Address: string;
    Cover: {
      id: string;
      url: string;
      filename: string;
      size: string;
      type: string;
      thumbnails: {
        [Property in keyof Thumbnails]: {
          url: string;
          width: number;
          height: number;
        };
      };
    }[];
  };
}

export type Thumbnails = {
  small: string;
  large: string;
  full: string;
};

export interface Order {
  businessName: string;
  decisionMaker: string;
  address: string;
  email: string;
  primaryNumber: string;
  secondaryNumber: string;
  product: Products;
  addInfo?: string;
  lang: 'en' | 'fr';
  date: string;
  time: string;
  paid: boolean;
  repId: string;
  orderNumber?: string;
  humanTime?: string;
}
