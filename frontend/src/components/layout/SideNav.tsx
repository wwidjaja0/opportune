import { NavLink } from "react-router-dom";
import { navItems } from "../../constants/navItems";
import { NavItem } from "../../types/NavItem";

const SideNav = () => {
  return (
    <aside className="h-screen w-[15%] bg-gray-300 flex flex-col">
      <div className="text-xl font-bold py-[4%]">Opportune</div>
      <nav className="flex-grow">
        <ul className="h-full w-full">
          {navItems.map((navItem: NavItem, index: number) => {
            return (
              <li key={index} className="h-[5%]">
                <NavLink
                  className={({ isActive }) =>
                    `h-full w-full text-lg items-center flex justify-center ${
                      isActive ? "bg-gray-400 text-white" : "hover:bg-gray-200"
                    }`
                  }
                  to={navItem.url}
                >
                  {navItem.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default SideNav;
