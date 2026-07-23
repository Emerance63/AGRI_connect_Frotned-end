import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ibyerekeye Twe",
  description: "Menya ibyerekeye AgriConnect Rwanda — intego yacu, icyerekezo, n'uburyo duhuzwa abahinzi n'ibigo by'imikoranire n'abaguzi hirya no hino mu Rwanda.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
