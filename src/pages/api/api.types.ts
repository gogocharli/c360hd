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
    Language: 'EN' | 'FR';
    Featured: string[];
  };
  Orders: {
    'Order Number': string;
    Date: string;
    Time: string;
    'Payment Method': PaymentMethod;
    'Product Name': string;
    'Rep ID': string[];
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
    };
  };
}

type Thumbnails = {
  small: string;
  large: string;
  full: string;
};
export type Tables = 'Links' | 'Clients' | 'Orders' | 'Reps' | 'Featured';
