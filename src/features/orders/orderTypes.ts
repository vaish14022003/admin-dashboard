export interface Order {
    _id: string;
    user: {
        _id: string;
        name: string;
        email: string;
    };
    totalAmount: number;
    items: string[]; // Or use a proper item type if needed
    createdAt: string;
    status: string;
}
  