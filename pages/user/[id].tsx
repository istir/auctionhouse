import { Auction, Bid, Cart, Category, Token, User } from ".prisma/client";
import { Box, Checkbox, Flex, Text } from "@chakra-ui/react";
import { GetServerSideProps, NextApiRequest } from "next";
import { Session } from "next-iron-session";
import { useRouter } from "next/router";
import React from "react";
import AuctionsGrid from "../../components/auction/AuctionsGrid";
import Header from "../../components/header/header";
import TitleHolder from "../../components/TitleHolder";
import checkIfTokenValidAndRefresh from "../../libs/checkIfTokenValidAndRefresh";
import withSession from "../../libs/ironSession";
import prisma from "../../prisma/prisma";
interface UserAuctionPageProps {
  token?: Token & {
    user: User & {
      cart: Cart & {
        items: Auction[];
      };
    };
  };
  user?: User & {
    cart: Cart & {
      items: Auction[];
    };
  };

  auctions?: (Auction & {
    category: Category;
    seller: User;
    buyer: User | null;
    bids: Bid[];
  })[];
}
// test
// export async function getStaticPaths() {
//   const auctions = await prisma.auction.findMany({
//     where: { url: { not: null } },
//   });
//   const paths = auctions.map((a) => ({
//     params: { url: a.url },
//   }));
//   return { paths, fallback: false };
// }

export const getServerSideProps: GetServerSideProps = withSession(
  async function ({
    req,
    params,
  }: {
    req: NextApiRequest & { session: Session };
    params: { id: string };
  }) {
    // let auction = await prisma.auction.findUnique({
    //   where: { url: params.url },
    //   include: {
    //     category: true,
    //     seller: { select: { firstName: true, lastName: true, avatar: true } },
    //     buyer: { select: { firstName: true, lastName: true, avatar: true } },
    //   },
    // });
    const id = parseInt(params.id);
    const token = await checkIfTokenValidAndRefresh(req.session);
    // console.log("token", token);
    let user: {
      firstName: string;
      lastName: string;
      avatar: string | null;
      id: number;
      cart: (Cart & { items: Auction[] }) | null;
    } | null = null;
    if (token) {
      user = await prisma.user.findUnique({
        where: { id: token.user.id },
        select: {
          avatar: true,
          firstName: true,
          lastName: true,
          cart: { include: { items: { where: { buyerId: null } } } },
          id: true,
        },
      });
    }
    if (!id) return { props: { auctions: [], user } };

    const auctions = await prisma.auction.findMany({
      where: { sellerId: id },
      include: {
        category: true,
        seller: { select: { firstName: true, lastName: true, avatar: true } },
        buyer: { select: { firstName: true, lastName: true, avatar: true } },
        bids: { select: { userId: true, offer: true } },
      },
    });
    // console.log(auction);
    return { props: { auctions, user } };
    // return { props: { auctions, token } };
  }
);

// export async function getStaticProps(context: { params: { url: string } }) {
//   //   console.log(context.params);
//   let auction = await prisma.auction.findUnique({
//     where: { url: context.params.url },
//     include: {
//       category: true,
//       seller: { select: { firstName: true, lastName: true, avatar: true } },
//       buyer: { select: { firstName: true, lastName: true, avatar: true } },
//     },
//     // select:{name:true,category:true,seller:{select:{firstName:true,}}}
//   });

//   return { props: { auction } };
// }

export default function UserAuctionPage(
  props: UserAuctionPageProps
): JSX.Element {
  const router = useRouter();
  // console.log(props.token?.user, props.user);
  const [hideEnded, setHideEnded] = React.useState<boolean>(false);
  if (!props.auctions || props.auctions.length === 0)
    return (
      <Box>
        <Header refresh={router.reload} user={props.user} />
        <Text fontSize={"2xl"}>Nie znaleziono aukcji</Text>
      </Box>
    );
  return (
    <Box>
      <Header refresh={router.reload} user={props.user} />
      <TitleHolder
        title={`Aukcje użytkownika ${props.auctions[0].seller.firstName} ${props.auctions[0].seller.lastName}`}
      >
        <Flex gap="1">
          <Checkbox
            //   value={hideEnded}
            checked={hideEnded}
            onChange={() => {
              setHideEnded(!hideEnded);
            }}
          />
          <Text>Ukryj zakończone</Text>
        </Flex>
        <AuctionsGrid auctions={props.auctions} hideEnded={hideEnded} />
      </TitleHolder>
    </Box>
  );
}
