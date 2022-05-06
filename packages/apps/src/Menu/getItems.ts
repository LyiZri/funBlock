import { useTranslation } from "../translate";

interface IItems {
    isRoot?:boolean;
    hasParams?:boolean;
    name:string;
    text:string;
    count?:number;
}
interface IProps {
    bathPath:string,
}
export function getItems (bathPath:string):IItems[]{
    const { t } = useTranslation();
    switch (bathPath) {
        case 'explorer':
            return [{
                isRoot: true,
                name: "chain",
                text: t<string>("Chain info"),
              },
              {
                hasParams: true,
                name: "query",
                text: t<string>("Block details"),
              },
              {
                name: "forks",
                text: t<string>("Forks"),
              },
              {
                name: "node",
                text: t<string>("Node info"),
              }]
        case 'addresses':
             return [{
                isRoot: true,
                name: 'contacts',
                text: t<string>('My contacts')
              }]
        case 'accounts': 
              return [ {
                isRoot: true,
                name: 'overview',
                text: t<string>('My accounts')
              },
              {
                name: 'vanity',
                text: t<string>('Vanity generator')
              }]
        case 'staking':
            return []
        default:
            return [{
                isRoot: true,
                name: "chain",
                text: t<string>("Chain info"),
              },
              {
                hasParams: true,
                name: "query",
                text: t<string>("Block details"),
              },
              {
                name: "forks",
                text: t<string>("Forks"),
              },
              {
                name: "node",
                text: t<string>("Node info"),
              }]
            
    }
}