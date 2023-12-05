export class PayedBills {
  totalValue: number;
  monthDate: number;
  productName: string;
  personInfos: personInfos[];
}

export class personInfos {
  id: number;
  neighborhood: string;
  gender: string;
  birthDate: string;
}
