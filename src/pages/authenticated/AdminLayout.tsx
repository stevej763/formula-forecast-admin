import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../api/authenticationApiClient";
import { clearAccount, useAccount } from "../../store/accountSlice";
import EnvironmentStrip from "../../shared/components/EnvironmentStrip";

// Listed in the order data has to be set up: a season, then the teams,
// then the drivers who race for them, then the weekends they race in.
const sections = [
  { to: "/season", label: "Seasons" },
  { to: "/constructors", label: "Constructors" },
  { to: "/drivers", label: "Drivers" },
  { to: "/weekends", label: "Race weekends" },
];

const AdminLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const account = useAccount();

  const handleSignOut = () => {
    logout()
      .catch((err) => console.error("Sign out failed:", err))
      .finally(() => {
        dispatch(clearAccount());
        navigate("/");
      });
  };

  return (
    <div className="flex min-h-dvh flex-col lg:h-dvh lg:overflow-hidden">
      <EnvironmentStrip />
      <div className="flex flex-1 flex-col lg:flex-row">
        <aside className="flex shrink-0 flex-col border-b border-graphite bg-carbon lg:w-60 lg:border-r lg:border-b-0">
          <div className="px-6 py-5">
            <p className="text-sm text-ash">Formula Forecast</p>
            <p className="font-heading text-lg">Race control</p>
          </div>

          <nav aria-label="Sections" className="ff-scrollbar overflow-x-auto px-3 pb-3 lg:flex-1 lg:pb-0">
            <ul className="flex gap-1 lg:flex-col">
              {sections.map((section) => (
                <li key={section.to}>
                  <NavLink
                    to={section.to}
                    className={({ isActive }) =>
                      `relative flex h-10 items-center rounded-md px-3 text-sm font-medium whitespace-nowrap transition-colors ${
                        isActive
                          ? "bg-graphite text-chalk"
                          : "text-ash hover:bg-graphite/60 hover:text-chalk"
                      }`
                    }
                  >
                    {section.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden border-t border-graphite px-6 py-5 lg:block">
            <p className="truncate text-sm font-medium">
              {account.firstName} {account.lastName}
            </p>
            <p className="truncate text-sm text-ash">{account.email}</p>
            <button
              type="button"
              onClick={handleSignOut}
              className="mt-3 -ml-2 rounded-md px-2 py-1 text-sm text-ash hover:bg-graphite hover:text-chalk"
            >
              Sign out
            </button>
          </div>
        </aside>

        <main className="ff-scrollbar min-w-0 flex-1 lg:overflow-y-auto">
          <Outlet />
          <div className="border-t border-graphite px-6 py-5 lg:hidden">
            <p className="text-sm text-ash">Signed in as {account.email}</p>
            <button
              type="button"
              onClick={handleSignOut}
              className="mt-2 -ml-2 rounded-md px-2 py-1 text-sm text-chalk hover:bg-graphite"
            >
              Sign out
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
