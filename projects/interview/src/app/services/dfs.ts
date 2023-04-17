import { DataResponse } from "../models/ApiResponse.model";

export function traverseData(data: DataResponse, word: string) {

    let results: string[] = [];
    let regexp = new RegExp(word, 'i');

    // flat networks
    const flatNetworks: {[k:string]:string[]} = data.groups.reduce(
      (current, { name, networks }) => {
        current[name] = networks;
        return current;
      },
      Object.create(null)
    );

    for (let prop in data.accountIds) {
      let accountName = prop;
      let accId = data.accountIds[accountName];
      if (regexp.test(accountName) || regexp.test(accId)) {
        results.push(`${accountName}-${accId}`);
        continue;
      } else {
        for (let oneAccount in data.accountGroups) {
          let oneAccountGroups = data.accountGroups[oneAccount];
          if (oneAccountGroups.some((s) => regexp.test(s))) {
            results.push(`${accountName}-${accId}`);
            continue;
          } else {
            for (let group of oneAccountGroups) {
              let networks = flatNetworks[group];
              if (!!networks && networks.some((s) => regexp.test(s))) {
                results.push(`${accountName}-${accId}`);
                continue;
              }
            }
          }
        }
      }
    }
    return results;
  }
