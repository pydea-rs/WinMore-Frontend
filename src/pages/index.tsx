import Image from "next/image";
import { Inter } from "next/font/google";
import { useDispatch, useSelector } from "@/store/store";
import { example } from "@/store/slices/auth.slice";
import Wallets from "@/components/common/wallets/wallets";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  dispatch(example());

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <ConnectButton />
    </main>
  );
}
