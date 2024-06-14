type Thumbnail = {
  thumbnails: {
    url: string;
    width: number;
    height: number;
  }[];
};

type ShortBylineText = unknown;

type Length = unknown;

type VideoItem = {
  id: string;
  type: "video";
  thumbnail: Thumbnail;
  title: string;
  channelTitle: string;
  shortBylineText: ShortBylineText;
  length: Length;
  isLive: boolean;
};

type ChannelItem = {
  id: string;
  type: "channel";
  thumbnail: Thumbnail;
  title: string;
};

type Item = VideoItem | ChannelItem;

type NextPageContext = {
  context: unknown;
  continuation: string;
};

type NextPage = {
  nextPageToken: string;
  nextPageContext: NextPageContext;
};

type Data = {
  items: Item[];
  nextPage: NextPage;
};

declare module "youtube-search-api" {
  export const GetListByKeyword: (keyword: string) => Promise<Data>;
}
