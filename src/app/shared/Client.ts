export class Client {
  _id: string;
  pid: string;
  firstName: string;
  lastName: string;
  gender: 'M' | 'F';
  phoneNumber: string;
  pictureFileId: string;
  address: {
    legal: {
      country: string;
      city: string,
      address: string
    },
    physical: {
      country: string,
      city: string,
      address: string
    }
  };
  deletedAt: string;

  constructor(init?: Partial<Client>) {
    Object.assign(this, init);
  }
}
