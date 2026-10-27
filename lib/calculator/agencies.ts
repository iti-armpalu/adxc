const ADXC_NET_REVENUE = 0.34;
const AGENCY_SHARE_OF_REVENUE = 0.15;

export function agencyAnnualRevenue(clients: number, avgAnnualDataSpend: number) {
    return Math.max(0, clients) * Math.max(0, avgAnnualDataSpend) * ADXC_NET_REVENUE * AGENCY_SHARE_OF_REVENUE;
}