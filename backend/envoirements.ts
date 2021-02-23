interface IEnvoirements {
  development: {
    port: number;
    securityHash: string;
  };
  production: {
    port: number;
    securityHash: string;
  };
}

export const envoirements: IEnvoirements = {
  development: {
    port: 3003,
    securityHash: "bet@123"
  },
  production: {
    port: 8000,
    securityHash: "bet@123"
  }
}