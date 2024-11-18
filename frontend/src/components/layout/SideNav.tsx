import { Link } from "react-router-dom";
import { navItems } from "../../constants/navItems";
import { NavItem } from "../../types/NavItem";

const SideNav = () => {
  return (
    <aside className="h-screen w-[15%] bg-gray-300">
      <div className="text-xl font-bold py-[4%]">Opportune</div>
      <nav className="h-full w-full">
        <ul className="h-full w-full">
          {navItems.map((navItem: NavItem, index: number) => {
            return (
              <li
                key={index}
                className="h-[5%] text-lg items-center flex justify-center hover:bg-gray-200"
              >
                <Link to={navItem.url}>{navItem.label}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default SideNav;
