// @flow

export type BankPage = {|
    id?: number,
    bankId: number,
    screenshotId?: number,
    screenshotPath?: string,
    pageUrl: string,
    createdAt?: string,
    linksOnPage: Link[]
|};

export type Link = {|
    id: number,
    url: string,
    linkText: string
|};
