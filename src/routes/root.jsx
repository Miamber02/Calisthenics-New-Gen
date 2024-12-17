import { Outlet, NavLink, useLoaderData, Form, redirect, useNavigation, useSubmit, useNavigate } from "react-router-dom";
import { getContacts, createContact } from "../contacts";
import { useEffect, useState } from "react";

import LogoutButton from "../components/LogOut";

import './root.css';

export async function action() {
  const contact = await createContact();
  return redirect(`/contacts/${contact.id}/edit`);
}

export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");

  const role = localStorage.getItem('role');
  const userId = localStorage.getItem("id");
  let contacts = [];

  try {
    const allContacts = await getContacts(q);

    if (role === "admin") {
      contacts = allContacts;
    } else if (role === "trainer") {
      contacts = allContacts.filter(contact => contact.trainer_id === userId);
    } else {
      contacts = [];
    }

    return { contacts, q };
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return { contacts: [], q: "" };
  }
}


export default function Root() {
  const { contacts, q } = useLoaderData();
  const navigation = useNavigation();
  const submit = useSubmit();
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState(q || "");
  const [filteredUsers, setFilteredUsers] = useState(contacts);

  const searching =
  navigation.location &&
  new URLSearchParams(navigation.location.search).has(
    "q"
  );

  useEffect(() => {
    const filtered = contacts.filter((contact) =>
      contact.name && contact.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchText, contacts]);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const isTrainer = localStorage.getItem('role') === 'trainer';

    return (
      <>
        <div id="sidebar">
          <h1>User list</h1>
          <div>
            <Form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
              value={searchText}
              onChange={handleSearchChange}
            />
              <div
                id="search-spinner"
                aria-hidden
                hidden={!searching}
              />
              <div
                className="sr-only"
                aria-live="polite"
              ></div>
            </Form>
            {!isTrainer && (
              <Form method="post">
                <button type="submit">New</button>
              </Form>
            )}
          </div>
          <nav>
          {contacts.length ? (
            <ul>
              <li id="logout-li"><LogoutButton/></li>
              {filteredUsers.map((contact) => (
                <li key={contact.id}>
                  <NavLink
                    to={`contacts/${contact.id}`}
                    className={({ isActive, isPending }) =>
                      isActive
                        ? "active"
                        : isPending
                        ? "pending"
                        : ""
                    }
                  >
                    {contact.name || contact.id ? (
                      <>
                        {contact.name} {contact.id}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {contact.favorite && <span>★</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
          </nav>
        </div>
        <div
        id="detail"
        className={
          navigation.state === "loading" ? "loading" : ""
        }
      >
          <Outlet />
        </div>
      </>
    );
  }