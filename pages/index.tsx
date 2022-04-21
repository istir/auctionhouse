import { Bid, Token, User } from ".prisma/client";
import { GetServerSideProps, NextApiRequest } from "next";
import { Session } from "next-iron-session";
import Header from "../components/header/header";
import checkIfTokenValidAndRefresh from "../libs/checkIfTokenValidAndRefresh";
import withSession from "../libs/ironSession";
import { useRouter } from "next/router";
import prisma from "../prisma/prisma";
import { Auction } from "@prisma/client";
// import Categories from "../components/mainPage/categories/categories";
import { Box } from "@chakra-ui/layout";
// import { Button } from "@chakra-ui/button";
// import AuctionMoreFromUser from "../components/auction/AuctionBuyWindow.tsx/AuctionMoreFromUser";
import AuctionGetRandomAuctions from "../components/auction/AuctionBuyWindow.tsx/AuctionGetRandomAuctions";
import getRandomAuctions from "../libs/getRandomAuctionsLib";
// import { useDisclosure } from "@chakra-ui/react";

export const getServerSideProps: GetServerSideProps = withSession(
  async function ({ req }: { req: NextApiRequest & { session: Session } }) {
    // return await getUserFromSession(req);

    // const auctions = await prisma.auction.findMany({
    //   where: { dateEnd: "" },
    //   take: 100,
    //   include: { bids: true },
    // });
    const auctions = (await getRandomAuctions(100, 100)) || [];
    // console.log(auctions);
    const token = await checkIfTokenValidAndRefresh(req.session);
    if (token) {
      const user = await prisma.user.findUnique({
        where: { id: token.user.id },
        select: {
          avatar: true,
          firstName: true,
          lastName: true,
          cart: { include: { items: true } },
          id: true,
        },
      });
      if (user) {
        return {
          props: {
            token: token.token,
            user: user,
            auctions: auctions ? auctions : [],
          },
        };
      }
      return {
        props: {
          token: token.token,
          user: token.user,
          auctions: auctions ? auctions : [],
        },
      };
    } else {
      return { props: { token: "", auctions: auctions ? auctions : [] } };
    }
  }
);

export default function Home(
  props: Token & { user?: User } & { auctions: (Auction & { bids: Bid[] })[] }
) {
  const router = useRouter();
  const refreshData = () => {
    router.push(router.asPath);
  };

  return (
    <Box>
      <Header
        user={props.user}
        token={props.token}
        refresh={refreshData}
        // isDrawerOpen={isOpen}
        // onDrawerOpen={onOpen}
        // onDrawerClose={onClose}
      ></Header>
      {/* <Button
        onClick={() => {
          router.push("/auction/krzeslo-komputerowe-2");
        }}
      >
        Testowa aukcja
      </Button> */}
      <AuctionGetRandomAuctions auctions={props.auctions} />
      {/* <PickedForYou width="100%" auctionsToShow={props.auctions} /> */}
      {/* <Categories position="center" /> */}
    </Box>
  );
}
