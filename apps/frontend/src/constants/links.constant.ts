import { IoHome, IoSearch, IoAddCircle } from "react-icons/io5";
import { FaUserFriends, FaChartLine } from "react-icons/fa";

const links = [
  { href: "/", label: "Home", icon: IoHome },
  { href: "/search", label: "Pesqusiar", icon: IoSearch },
  { href: "/create", label: "Novo artigo", icon: IoAddCircle },
  { href: "/friends", label: "Amigos", icon: FaUserFriends },
  { href: "/featured", label: "Destaques", icon: FaChartLine },
];

export { links };
