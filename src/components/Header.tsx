import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MenuIcon, UserIcon, XIcon } from "@heroicons/react/outline";
import { Button } from "components";
import { Fragment } from "react";
import { NavLink } from "react-router-dom";
import useStore from "store/AppStore";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Trade", href: "trade" },
];

export default function MainHeader() {
  let [isAutheticated, setShowLogin, signout] = useStore((state) => [
    state.isAuthenticated,
    state.setShowLogin,
    state.signout,
  ]);
  return (
    <Disclosure as="nav" className="bg-primary">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="hidden sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.href}
                        className={({ isActive }) =>
                          "px-3 py-2 rounded-md text-sm font-medium " +
                          (isActive
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white")
                        }
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {isAutheticated ? (
                  <Menu as="div" className="ml-3 relative">
                    <div>
                      <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                        <UserIcon className="h-8 w-8 text-gray-400 hover:text-white" />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none block">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => signout()}
                              className={`
                                "block px-4 py-2 text-sm text-gray-700" + ${
                                  active ? "bg-gray-100" : ""
                                }`}
                            >
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                ) : (
                  <Button
                    type="button"
                    theme="secondary"
                    onClick={() => setShowLogin(true)}
                  >
                    Login
                  </Button>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button key={item.name} as={Fragment}>
                  <NavLink
                    to={item.href}
                    className={({ isActive }) =>
                      "block px-3 py-2 rounded-md text-base font-medium " +
                      (isActive
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white")
                    }
                  >
                    {item.name}
                  </NavLink>
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
