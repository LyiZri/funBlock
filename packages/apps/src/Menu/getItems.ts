import { useTranslation } from "../translate";

interface IItems {
  alias?: string,
  isRoot?: boolean;
  hasParams?: boolean;
  name: string;
  text: string;
  count?: number;
}
interface IProps {
  bathPath: string,
}
export function getItems(bathPath: string): IItems[] {
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
      return [{
        isRoot: true,
        name: 'overview',
        text: t<string>('My accounts')
      }]
    case 'staking':
      return [
        {
          isRoot: true,
          name: 'overview',
          text: t<string>('Overview')
        },
        {
          name: 'waiting',
          text: t<string>('Waiting')
        },
        {
          name: 'actions',
          text: t<string>('Account actions')
        },
        {
          alias: 'returns',
          name: 'targets',
          text: t<string>('Targets')
        },
        {
          hasParams: true,
          name: 'query',
          text: t<string>('Guardian stats')
        }
      ]
    case 'chainstate':
      return [
        {
          isRoot: true,
          name: 'modules',
          text: t<string>('Storage')
        },
        {
          name: 'constants',
          text: t<string>('Constants')
        },
        {
          name: 'raw',
          text: t<string>('Raw storage')
        }
      ]
    case 'extrinsics':
      return [
        {
          isRoot: true,
          name: 'create',
          text: t<string>('Submission')
        }
      ]
    case 'settings':
      return [
        {
          isRoot: true,
          name: 'general',
          text: t<string>('General')
        }
      ]
    case 'calendar':
      return [
        {
          isRoot: true,
          name: 'view',
          text: t<string>('Upcoming events')
        }
      ]
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